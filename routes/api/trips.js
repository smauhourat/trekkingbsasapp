const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

//const User = require('../../models/User');
const Trip = require('../../models/Trip');

// @route   GET api/trips
// @desc    Test route
// @access  Public
router.get('/', (req,res) => res.send('Trips router'));

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