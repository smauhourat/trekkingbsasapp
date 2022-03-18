const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

//const User = require('../../models/User');
const Trip = require('../../models/Trip');

// @route   GET api/trips
// @desc    Get all trips
// @access  Public
// router.get('/', async (req,res) => {
//     try {
//         const trips = await Trip.find().sort({ created: -1 });
//         res.json(trips);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send(err);
//     }
// });

// @route    GET api/trips/?q
// @desc     Get trips by query
// @access   Public
router.get('/', async (req, res) => {
    try {
      const query = req.query.q;
      const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
      const page = req.query.page;
        
      const trips = await Trip.find().or([
          { title: { $regex: query, '$options' : 'i' }},
          { subtitle: { $regex: query, '$options' : 'i' }},
          { description: { $regex: query, '$options' : 'i' }},
          { location: { $regex: query, '$options' : 'i' }},
        ]).sort({ created: 'asc' }).limit(limit).skip(limit*page);
        
      res.json(trips);
  
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

        const { title, subtitle, description, location } = req.body;

        try {
            let newTrip = new Trip({
                title,
                subtitle,
                description,
                location,
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


module.exports = router;