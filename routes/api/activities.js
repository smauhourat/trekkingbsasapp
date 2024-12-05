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

const addMonthToCalendar = async (activity, year, month, availableSpots) => {
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
        const { year, month, availableSpots, daysOfWeek } = req.body;

        // TODO : considerar el siguiente parametro
        // daysOfWeek es un arreglo del tipo ['Monday', 'Twesday', 'Wedensay', ...]
        try {
            const activity = await Activity.findById(id);
            if (!activity) {
                return res.status(404).json({ message: 'Actividad no encontrada' });
            }

            const updatedActivity = await addMonthToCalendar(activity, year, month, availableSpots)

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
        const { year, availableSpots, daysOfWeek } = req.body;

        // TODO : considerar el siguiente parametro
        // daysOfWeek es un arreglo del tipo ['Monday', 'Twesday', 'Wedensay', ...]
        try {
            const activity = await Activity.findById(id);
            if (!activity) {
                return res.status(404).json({ message: 'Actividad no encontrada' });
            }

            let updatedActivity
            for (let i = 0; i < 12; i++)
                updatedActivity = await addMonthToCalendar(activity, year, i, availableSpots)

            res.status(200).json(updatedActivity);
        } catch (err) {
            console.error(err)
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            res.status(500).send(err)
        }
    });

module.exports = router;