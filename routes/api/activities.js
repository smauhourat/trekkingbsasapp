const moment = require('moment');
const express = require('express');
const router = express.Router();
//const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2
const Activity = require('../../models/Activity');
const Account = require('../../models/Account');
const Customer = require('../../models/Customer');
const logger = require('../../utils/logger')
const getBookCode = require('../../utils/getBookCode')
const { convertToSlug } = require('../../utils/convertToSlug')
const { getBaseUrl } = require('../../config/config')
const { sendReservationCustomerMail } = require('../../utils/customerHelper')

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
        authAdmin,
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

// @route   PUT api/activities/:id
// @desc    Update Activity
// @access  Private
router.put('/:id',
    checkObjectId('id'),
    [
        authAdmin,
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
            const activity = await Activity.findByIdAndUpdate(req.params.id, { title, subtitle, category, description, itinerary, suggested_equipment, included_services, duration, price, booking_price, location, grading, quota, published, training_level }, { new: true })
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

const validateDateRange = (req, res, next) => {
    const { dateFrom, dateTo } = req.body;

    // Check if dateFrom and dateTo are provided
    if (!dateFrom || !dateTo) {
        return res.status(400).json({ message: 'Las fechas de inicio y fin son requeridas' });
    }

    // Convert dateFrom and dateTo to Date objects
    const start = new Date(dateFrom);
    const end = new Date(dateTo);

    // Validate that dateFrom and dateTo are valid Date objects
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ message: 'Las fechas proporcionadas no son válidas' });
    }

    // Ensure dateFrom is before dateTo
    if (start >= end) {
        return res.status(400).json({ message: 'La fecha de inicio debe ser anterior a la fecha de fin' });
    }

    // Attach the parsed dates to the request object
    req.dateFrom = start;
    req.dateTo = end;

    next();
};

const addRangeDatesToCalendar = async (activity, startDate, endDate, availableSpots, daysOfWeekExcluded) => {
    const dates = []
    const excludedDays = daysOfWeekExcluded ? daysOfWeekExcluded : []

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.getDay() == 6 ? 0 : date.getDay() + 1
        console.log(`date: ${date.toISOString()} - dayOfWeek: ${dayOfWeek}`)
        if ((activity.calendar.find(e => e.date.getTime() === date.getTime()) === undefined) && (!excludedDays.includes(dayOfWeek)))
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

const deleteRangeDatesToCalendar = async (activity, startDate, endDate) => {

    //Check if exists reservations in any date


    // Filter out the dates that fall within the range [startDate, endDate)
    activity.calendar = activity.calendar.filter(e => {
        const entryDate = new Date(e.date);
        return entryDate.getTime() < startDate.getTime() || entryDate.getTime() > endDate.getTime();
    });

    return await activity.save();
}

// @route   POST api/activities
// @desc    Add Calendar by Month
// @access  Private
router.post('/:id/add-month',
    [authAdmin],
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
    [authAdmin],
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

// @route   POST api/activities/:id/add-range
// @desc    Add Calendar by range of dates
// @access  Private
router.post('/:id/add-range',
    [authAdmin, validateDateRange, checkObjectId('id')],
    async (req, res) => {

        //daysOfWeekExcluded is array from 0 to 6 or Monday to Saturday
        const { id } = req.params
        const { dateFrom, dateTo, daysOfWeekExcluded } = req.body

        try {
            const startDate = new Date(dateFrom)
            const endDate = new Date(dateTo)

            const activity = await Activity.findById(id);
            if (!activity) {
                return res.status(404).json({ message: 'Actividad no encontrada' });
            }

            const availableSpots = 10 //TODO esto esta harcodeado
            const updatedActivity = await addRangeDatesToCalendar(activity, startDate, endDate, availableSpots, daysOfWeekExcluded)

            res.status(200).json(updatedActivity);
        } catch (err) {
            console.error(err)
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            res.status(500).send(err)
        }
    });

// @route   DELETE api/activities/:id/del-range
// @desc    Delete Calendar by Date Range
// @access  Private
router.delete('/:id/del-range',
    [authAdmin, validateDateRange, checkObjectId('id')],
    async (req, res) => {

        const { id } = req.params;
        const { dateFrom, dateTo } = req.body;

        try {
            const startDate = new Date(dateFrom)
            const endDate = new Date(dateTo)

            const activity = await Activity.findById(id);
            if (!activity) {
                return res.status(404).json({ message: 'Actividad no encontrada' });
            }

            // Check for reservations within the date range
            const hasReservations = activity.calendar.some(e => {
                const entryDate = new Date(e.date);
                return entryDate >= startDate && entryDate < endDate && e.reservations.length > 0;
            });

            if (hasReservations) {
                //throw new Error('No se pueden eliminar fechas con reservas existentes');
                return res.status(400).json({ message: 'No se pueden eliminar fechas con reservas existentes' });
            }

            const updatedActivity = await deleteRangeDatesToCalendar(activity, startDate, endDate);

            res.status(200).json(updatedActivity);
        } catch (err) {
            console.error(err);
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send(err);
        }
    });

// @route   POST api/activities/:id/add-reservation
// @desc    Add Reservation to Calendar
// @access  Private
router.post('/:id/add-reservation',
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
            const code = await getBookCode()
            const description = `reserva-${convertToSlug(activity.title)}-${calendarEntry.date.toISOString().substring(0, 10)}`
            const accounts = await Account.find({ active: true }).select(['-_id', '-createdAt', '-updatedAt', '-__v', '-active'])

            // Crear una nueva reserva
            const newReservation = {
                code: code,
                description: description,
                customer: customer,
                numberOfPlaces: numberOfPlaces,
                reservationDate: new Date(),
                price: numberOfPlaces * activity.booking_price,
                accounts: accounts
            };

            // Agregar la reserva al calendario
            calendarEntry.reservations.push(newReservation);

            // Actualizar los lugares disponibles
            calendarEntry.availableSpots -= numberOfPlaces;

            // Guardar la actividad actualizada
            const updatedActivity = await activity.save();

            const customerObj = await Customer.findById(customer)
            newReservation.customer = customerObj

            await sendReservationCustomerMail(await getBaseUrl(req), newReservation)

            res.status(200).json(updatedActivity);
        } catch (err) {
            console.error(err);
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send(err);
        }
    }
);

// @route   GET api/activities
// @desc    Get all activities
// @access  Private
router.get('/',
    //[authAdmin],
    async (req, res) => {
        try {
            const query = req.query.q ? req.query.q : ''

            const published = req.query.published ? (req.query.published === '1') : ''
            const dbQuery = published != '' ? { published: true } : {}
            console.log(dbQuery)
            const activities = await Activity
                .find(dbQuery)
                .sort({ createdAt: 'asc' })

            res.json({
                metadata: {
                    count: activities.length
                },
                data: activities
            })

            if (!activities) {
                return res.status(404).json({ msg: 'Actividades no encontradas' })
            }
        } catch (err) {
            console.error(err.message)
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            res.status(500).send('Server Error')
        }
    })

// @route    GET api/activities/:id
// @desc     Get Activity by Id
// @access   Private
router.get('/:id',
    [
        checkObjectId('id')
    ],
    async (req, res) => {
        const { id } = req.params;

        try {
            const activity = await Activity.findById(id)
                .populate('calendar.reservations.customer', 'last_name first_name email') // Popula los detalles del cliente

            if (!activity) {
                return res.status(404).json({ message: 'Actividad no encontrada' });
            }

            res.json(activity);
        } catch (err) {
            console.error(err);
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send(err);
        }
    }
)

// @route   GET api/activities/:id/reservations
// @desc    Get all reservations for an activity with customer details
// @access  Private
router.get('/:id/reservations',
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

        // Add one day to endDate
        endDate.setDate(endDate.getDate() + 1);

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
                    calendarDate: entry.date,
                    activity: {
                        _id: activity._id,
                        title: activity.title,
                        subtitle: activity.subtitle,
                        category: activity.category,
                        description: activity.description,
                        itinerary: activity.itinerary,
                        suggested_equipment: activity.suggested_equipment,
                        included_services: activity.included_services,
                        duration: activity.duration,
                        price: activity.price,
                        booking_price: activity.booking_price,
                        location: activity.location,
                        grading: activity.grading,
                        quota: activity.quota,
                        published: activity.published,
                        training_level: activity.training_level
                    }
                }));
            });

            // Filtrar las reservas por fecha del CalendarEntry
            const filteredReservations = reservations.filter(reservation => {
                const calendarDate = new Date(reservation.calendarDate);
                return calendarDate >= startDate && calendarDate < endDate;
            });

            // const matchesCustomerId = customerId ? reservation.customer._id.toString() === customerId : true;
            // return calendarDate >= startDate && calendarDate <= endDate && matchesCustomerId;

            res.status(200).json({
                metadata: {
                    total: filteredReservations.length,
                    dateFrom,
                    dateTo
                }, data: filteredReservations
            });
        } catch (err) {
            console.error(err);
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send(err);
        }
    }
);

module.exports = router;