const moment = require('moment');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2
const Activity = require('../../models/Activity');
const CalendarEntry = require('../../models/CalendarEntry');
const logger = require('../../utils/logger')

cloudinary.config({
    cloud_name: global.env.cloudName,
    api_key: global.env.apiKey,
    api_secret: global.env.apiSecret
})

// @route   POST api/activities
// @desc    Add Activity
// @access  Private
router.post('/',
    [
        auth,
        [
            check('title', 'Titulo es requerido').not().isEmpty(),
            check('subtitle', 'Subtitulo es requerido').not().isEmpty(),
            check('description', 'Descripcion es requerido').not().isEmpty(),
            check('location', 'Lugar es requerido').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { title, subtitle, category, description, itinerary, suggested_equipment, included_services, duration, price, booking_price, location, grading, quota, published, training_level } = req.body

        try {
            const newActivity = new Activity({
                title,
                subtitle,
                category,
                description,
                itinerary,
                suggested_equipment,
                included_services,
                duration,
                price,
                booking_price,
                location,
                grading,
                quota: quota == null || quota == '' ? 0 : quota,
                published,
                user: req.user.id,
                training_level
            })

            const activity = await newActivity.save()
            res.json(activity)
        } catch (err) {
            console.error(err)
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            res.status(500).send(err)
        }
    });

const addMonthToCalendar = async (activity, year, month, availableSpots, daysOfWeekExcluded) => {
    // Crear un array de fechas para el mes completo
    const dates = [];
    const startDate = new Date(year, month - 1, 1); // Meses en JavaScript son 0-indexed
    const endDate = new Date(year, month, 0);

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        if (activity.calendar.find(e => e.date.getTime() === date.getTime()) === undefined)
            dates.push(new Date(date));
    }

    // Crear nuevas entradas de calendario para cada fecha
    const newCalendarEntries = dates.map(date => ({
        date: date,
        availableSpots: availableSpots,
        reservations: []
    }))

    // Agregar las nuevas entradas al calendario de la actividad
    activity.calendar.push(...newCalendarEntries);

    return await activity.save();
}


// @route   POST api/activities
// @desc    Add Calendar by Month
// @access  Private
router.post('/:id/add-month',
    //[auth],
    async (req, res) => {

        const { id } = req.params;
        const { year, month, availableSpots, daysOfWeekExcluded } = req.body;

        // TODO : considerar el siguiente parametro
        // daysOfWeekExcluded es un arreglo del tipo ['Monday', 'Twesday', 'Wedensay', ...]
        try {
            const activity = await Activity.findById(id);
            if (!activity) {
                return res.status(404).json({ message: 'Actividad no encontrada' });
            }

            const updatedActivity = await addMonthToCalendar(activity, year, month, availableSpots, daysOfWeekExcluded)

            res.status(200).json(updatedActivity);
        } catch (err) {
            console.error(err)
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            res.status(500).send(err)
        }
    });

// @route   POST api/activities
// @desc    Add Calendar by Year
// @access  Private
router.post('/:id/add-year',
    //[auth],
    async (req, res) => {

        const { id } = req.params;
        const { year, availableSpots, daysOfWeekExcluded } = req.body;

        // TODO : considerar el siguiente parametro
        // daysOfWeek es un arreglo del tipo ['Monday', 'Twesday', 'Wedensay', ...]
        try {
            const activity = await Activity.findById(id);
            if (!activity) {
                return res.status(404).json({ message: 'Actividad no encontrada' });
            }

            let updatedActivity
            for (let i = 1; i <= 12; i++)
                updatedActivity = await addMonthToCalendar(activity, year, i, availableSpots, daysOfWeekExcluded)

            res.status(200).json(updatedActivity);
        } catch (err) {
            console.error(err)
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            res.status(500).send(err)
        }
    });


// @route   POST api/activities/:id/add-reservation
// @desc    Add Reservation to Calendar
// @access  Private
router.post(
    '/:id/add-reservation',
    [
        //auth,
        [
            check('date', 'Fecha es requerida').not().isEmpty(),
            check('numberOfPlaces', 'Número de lugares es requerido').isInt({ min: 1 }),
            check('customer', 'Cliente es requerido').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { date, numberOfPlaces, customer } = req.body;

        try {
            const activity = await Activity.findById(id);
            if (!activity) {
                return res.status(404).json({ message: 'Actividad no encontrada' });
            }

            // Convertir la fecha a un objeto Date
            const reservationDate = new Date(date);

            // Buscar la entrada de calendario correspondiente a la fecha
            const calendarEntry = activity.calendar.find(entry => entry.date.toISOString().split('T')[0] === reservationDate.toISOString().split('T')[0]);

            if (!calendarEntry) {
                return res.status(404).json({ message: 'Fecha no encontrada en el calendario' });
            }

            // Verificar si hay suficientes lugares disponibles
            if (calendarEntry.availableSpots < numberOfPlaces) {
                return res.status(400).json({ message: 'No hay suficientes lugares disponibles' });
            }

            // Crear una nueva reserva
            const newReservation = {
                customer: customer,
                numberOfPlaces: numberOfPlaces,
                reservationDate: new Date(),
                price: numberOfPlaces * activity.booking_price
            };

            // Agregar la reserva al calendario
            calendarEntry.reservations.push(newReservation);

            // Actualizar los lugares disponibles
            calendarEntry.availableSpots -= numberOfPlaces;

            // Guardar la actividad actualizada
            const updatedActivity = await activity.save();

            res.status(200).json(updatedActivity);
        } catch (err) {
            console.error(err);
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send(err);
        }
    }
);

// @route   GET api/activities/:id/reservations
// @desc    Get all reservations for an activity with customer details
// @access  Private
router.get(
    '/:id/reservations',
    [
        //auth, 
        checkObjectId('id')],
    async (req, res) => {
        const { id } = req.params;
        const { dateFrom, dateTo } = req.query;

        // Establecer valores por defecto si no se proporcionan
        const defaultDateFrom = new Date();
        const defaultDateTo = new Date();
        defaultDateTo.setFullYear(defaultDateTo.getFullYear() + 1);

        const startDate = dateFrom ? new Date(dateFrom) : defaultDateFrom;
        const endDate = dateTo ? new Date(dateTo) : defaultDateTo;

        try {
            const activity = await Activity.findById(id)
                .populate('calendar.reservations.customer', 'last_name first_name email') // Popula los detalles del cliente

            if (!activity) {
                return res.status(404).json({ message: 'Actividad no encontrada' });
            }
            // Extraer todas las reservas del calendario
            const reservations = activity.calendar.flatMap(entry => {
                return entry.reservations.map(reservation => ({
                    ...reservation.toObject(),
                    calendarDate: entry.date
                }));
            });

            console.log('startDate =>', startDate)
            console.log('endDate =>', endDate)
            // Filtrar las reservas por fecha del CalendarEntry
            const filteredReservations = reservations.filter(reservation => {
                const calendarDate = new Date(reservation.calendarDate);
                return calendarDate >= startDate && calendarDate <= endDate;
            });

            res.status(200).json(filteredReservations);
        } catch (err) {
            console.error(err);
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send(err);
        }
    }
);

module.exports = router;