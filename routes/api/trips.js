const moment = require('moment');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

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
router.get('/:id', async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
  
      if (!trip) {
        return res.status(404).json({ msg: 'Trip not found' });
      }
  
      res.json(post);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });


// @route    GET api/trips/?q
// @desc     Get trips by query
// @access   Public
router.get('/', async (req, res) => {
    try {
      const currentDate = new Date();

      const query = req.query.q ? req.query.q :  "";
      const dateFrom = req.query.df ? req.query.df : "1900-01-01";
      const dateTo = req.query.dt ? req.query.dt : moment(currentDate).add(5, 'year').format('YYYY-MM-DD');
      const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
      const page = req.query.page;
        
      const trips = await Trip
        .find()
        .or([
            { title: { $regex: query, '$options' : 'i' }},
            { subtitle: { $regex: query, '$options' : 'i' }},
            { description: { $regex: query, '$options' : 'i' }},
            { location: { $regex: query, '$options' : 'i' }},
          ])
        .and({ date:{ $gte: new Date(dateFrom)}})
        .and({ date:{ $lt: new Date(dateTo)}})
        .sort({ created: 'asc' })
        .limit(limit)
        .skip(limit*page);
        
      res.json({ 
        "metadata": {
          "query": query,
          "count": trips.length,
          "limit": limit,
          "page": page,
          "dateFrom": dateFrom,
          "dateTo": dateTo
        },          
        "data": trips
      });
  
      if (!trips) {
        return res.status(404).json({ msg: 'Trips not found' });
      }
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

// @route   GET api/trips
// @desc    Add Trip
// @access  Private
router.post(
    '/', 
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('subtitle', 'Subtitle is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty(),
            check('location', 'Location is required').not().isEmpty(),
        ]
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { title, subtitle, description, date, duration, price, location, grading, quota, reservations } = req.body;

        try {
            let newTrip = new Trip({
                title,
                subtitle,
                description,
                date,
                duration,
                price,
                location,
                grading,
                quota,
                reservations,
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
// @desc     Delete a trip
// @access   Private
router.delete('/:id', auth,  async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
  
      if (!trip) {
        return res.status(404).json({ msg: 'Trip not found' });
      }
  
      await trip.remove();
  
      res.json({ msg: 'Trip removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

// @route   PUT api/trips/:id
// @desc    Update Trip
// @access  Private
router.put(
    '/:id', 
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('subtitle', 'Subtitle is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty(),
            check('location', 'Location is required').not().isEmpty(),
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


// @route    PUT api/trips/:id/images
// @desc     Add trip image
// @access   Private
router.put(
  '/:id/images',
  auth,
  async (req, res) => {

    try {
        // Get the trip
        const trip = await Trip.findById(req.params.id);

        const data = {
          image: req.body.image,
        };        

        // upload image here
        cloudinary.uploader
          .upload(data.image)
          .then((result) => {

            const tripImage = {
              url: result.url,
              public_id: result.public_id
            }
            
            trip.images.unshift(tripImage);
            trip.save();

            res.json(trip);
          })
          .catch((error) => {
            res.status(500).send({
              message: "failure",
              error,
            });
          });          
     } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
     }
  }
);

// @route    POST api/trips/images/:id
// @desc     Add trip image
// @access   Private
router.post(
  '/images/:id',
  auth,
  async (req, res) => {

    try {
        // Get the trip
        const trip = await Trip.findById(req.params.id);

        const data = {
          image: req.body.image,
        };        

        // upload image here
        cloudinary.uploader
          .upload(data.image)
          .then((result) => {

            const tripImage = {
              url: result.url,
              public_id: result.public_id
            }
            
            trip.images.unshift(tripImage);
            trip.save();

            res.json(trip);
          })
          .catch((error) => {
            res.status(500).send({
              message: "failure",
              error,
            });
          });          
     } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
     }
  }
);


module.exports = router;