const moment = require('moment');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2
const Trip = require('../../models/Trip');
const Book = require('../../models/Book');
const logger = require('../../utils/logger')

cloudinary.config({
  cloud_name: global.env.cloudName,
  api_key: global.env.apiKey,
  api_secret: global.env.apiSecret
})

// @route    GET api/trips/:id
// @desc     Get trip by ID
// @access   Public
router.get('/:id',
  checkObjectId('id'),
  async (req, res) => {
    // console.log('call gettrip endpoint')
    try {
      const trip = await Trip.findById(req.params.id)

      if (!trip) {
        return res.status(404).json({ msg: 'Evento no encontrado' })
      }

      res.json(trip)
    } catch (err) {
      console.error(err)
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send('Server Error')
    }
  })

// @route    GET api/trips/?q&df=&dt&limit&page
// @desc     Get Trips by query
// @access   Public
router.get('/',
  async (req, res) => {
    try {
      const currentDate = new Date()
      //console.log(req.query)
      const query = req.query.q ? req.query.q : ''
      const dateFrom = req.query.df ? req.query.df : '1900-01-01'
      const dateTo = req.query.dt ? req.query.dt : moment(currentDate).add(5, 'year').format('YYYY-MM-DD')
      const limit = req.query.limit && !isNaN(req.query.limit) ? parseInt(req.query.limit) : 100
      let page = 1
      if (req.query.page && !isNaN(req.query.page) && parseInt(req.query.page) > 0) { page = parseInt(req.query.page) }

      const sort = req.query.sort ? req.query.sort : 'date'
      const order = req.query.order ? req.query.order : '-1'
      const category = req.query.category ? req.query.category : ''
      const published = req.query.published ? (req.query.published === '1') : ''

      let dbQuery = {
        date: { $gte: new Date(dateFrom), $lt: new Date(dateTo) },
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { subtitle: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { location: { $regex: query, $options: 'i' } }
        ]
      }

      if (category !== '') { dbQuery = { ...dbQuery, category } }
      if (published !== '') { dbQuery = { ...dbQuery, published } }

      const totalItems = await Trip
        .find(dbQuery)
        .countDocuments()

      const trips = await Trip
        .find(dbQuery)
        .collation({ locale: "en" })
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({ [sort]: order })

      res.json({
        metadata: {
          query,
          total: totalItems,
          count: trips.length,
          limit,
          page,
          dateFrom,
          dateTo
        },
        data: trips
      })

      if (!trips) {
        return res.status(404).json({ msg: 'Evento no encontrado' })
      }
    } catch (err) {
      console.error(err)
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send('Server Error')
    }
  })

// @route   POST api/trips
// @desc    Add Trip
// @access  Private
router.post('/',
  [
    auth,
    [
      check('title', 'Titulo es requerido').not().isEmpty(),
      check('subtitle', 'Subtitulo es requerido').not().isEmpty(),
      check('description', 'Descripcion es requerido').not().isEmpty(),
      check('location', 'Lugar es requerido').not().isEmpty(),
      check('date', 'Fecha es requerido').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, subtitle, category, description, itinerary, suggested_equipment, included_services, date, departure, arrival, duration, price, booking_price, location, grading, quota, reservations, published, training_level, payment_link } = req.body

    try {
      const newTrip = new Trip({
        title,
        subtitle,
        category,
        description,
        itinerary,
        suggested_equipment,
        included_services,
        date,
        departure,
        arrival,
        duration,
        price,
        booking_price,
        location,
        grading,
        quota: quota == null || quota == '' ? 0 : quota,
        reservations: reservations == null || reservations == '' ? 0 : reservations,
        published,
        user: req.user.id,
        training_level,
        payment_link
      })

      const trip = await newTrip.save()
      res.json(trip)
    } catch (err) {
      console.error(err)
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send(err)
    }

  });

// @route    DELETE api/trips/:id
// @desc     Delete a Trip
// @access   Private
router.delete('/:id',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
      if (!trip) {
        return res.status(404).json({ msg: 'Evento no encontrado' });
      }

      const book = await Book.find({ trip: mongoose.Types.ObjectId(trip.id) });
      if (book && book.length > 0) {
        return res.status(404).json({ msg: 'El Evento tiene reservas' });
      }

      if (trip.images.length > 0) {
        const images = trip.images.map(function (item) {
          return item.public_id
        })

        cloudinary.api.delete_resources(images, function (err, _result) {
          if (err) {
            res.status(500).send(res)
          }
        })
      }

      await trip.remove()

      res.json({ msg: 'Evento eliminado' })
    } catch (err) {
      console.error(err)
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      return res.status(500).json({ msg: 'Server error' })
    }
  })

// @route   PUT api/trips/:id
// @desc    Update Trip
// @access  Private
router.put('/:id',
  checkObjectId('id'),
  [
    auth,
    [
      check('title', 'Titulo es requerido').not().isEmpty(),
      check('subtitle', 'Subtitulo es requerido').not().isEmpty(),
      check('description', 'Descripcion es requerido').not().isEmpty(),
      check('location', 'Lugar es requerido').not().isEmpty(),
      check('date', 'Fecha es requerido').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.json(trip)
    } catch (err) {
      console.error(err)
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send(err)
    }
  });

module.exports = router
