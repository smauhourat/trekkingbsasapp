const moment = require('moment');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const config = require('config');
const cloudinary = require("cloudinary").v2;

const Trip = require('../../models/Trip');

// cloudinary configuration
cloudinary.config({
  cloud_name: config.get('cloud_name'),
  api_key: config.get('api_key'),
  api_secret: config.get('api_secret'),
});


// @route    GET api/trips/:id
// @desc     Get trip by ID
// @access   Public
router.get('/:id', 
    checkObjectId('id'),
    async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
  
      if (!trip) {
        return res.status(404).json({ msg: 'Evento no encontrado' });
      }
  
      res.json(trip);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/trips/?q&df=&dt&limit&page
// @desc     Get Trips by query
// @access   Public
router.get('/', 
    async (req, res) => {
    try {
      const currentDate = new Date();

      const query = req.query.q ? req.query.q :  "";
      const dateFrom = req.query.df ? req.query.df : "1900-01-01";
      const dateTo = req.query.dt ? req.query.dt : moment(currentDate).add(5, 'year').format('YYYY-MM-DD');
      const limit = req.query.limit && !isNaN(req.query.limit) ? parseInt(req.query.limit) : 100;
      let page = 1;
      if (req.query.page && !isNaN(req.query.page) && parseInt(req.query.page) > 0)
          page = parseInt(req.query.page);

      const sort = req.query.sort ? req.query.sort : "date";
      const order = req.query.order ? req.query.order : "-1";
      const category = req.query.category ? req.query.category :  "";

      let db_query = {
          date:{ $gte: new Date(dateFrom), $lt: new Date(dateTo)},
          $or: [
            { title: { $regex: query, '$options' : 'i' }},
            { subtitle: { $regex: query, '$options' : 'i' }},
            { description: { $regex: query, '$options' : 'i' }},
            { location: { $regex: query, '$options' : 'i' }},
          ]
      };

      if (category !== "")
        db_query = {...db_query, category: category}

      const totalItems = await Trip
        .find(db_query)
        .countDocuments();

      const trips = await Trip
        .find(db_query)
        .limit(limit)
        .skip(limit*(page-1))
        .sort({[sort]: order});
        
      res.json({ 
        "metadata": {
          "query": query,
          "total": totalItems,
          "count": trips.length,
          "limit": limit,
          "page": page,
          "dateFrom": dateFrom,
          "dateTo": dateTo
        },          
        "data": trips
      });
  
      if (!trips) {
        return res.status(404).json({ msg: 'Evento no encontrado' });
      }
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

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
        ]
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { title, subtitle, category, description, itinerary, date, duration, price, location, grading, quota, reservations, suggested_equipment } = req.body;

        try {
            let newTrip = new Trip({
                title,
                subtitle,
                category,
                description,
                itinerary,
                date,
                duration,
                price,
                location,
                grading,
                quota,
                reservations,
                suggested_equipment,
                user: req.user.id
            });

            const trip = await newTrip.save();
            res.json(trip);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
        
    }
);

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
      
      if (trip.images.length > 0) {
        const images = trip.images.map(function(item) {
          return item["public_id"];
        })
  
        cloudinary.api.delete_resources(images, function(err, _result){
          if (err) {
            res.status(500).send(res);
          }           
        })
      }

      await trip.remove();
  
      res.json({ msg: 'Evento eliminado' });
    } catch (err) {
      console.error(err.message);
  
      return res.status(500).json({ msg: 'Server error' });
    }
  });

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
        ]
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
            const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.json(trip);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
        
    }
);

module.exports = router;