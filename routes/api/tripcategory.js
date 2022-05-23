const moment = require('moment');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const config = require('config');

const TripCategory = require('../../models/TripCategory');

// @route   POST api/tripcategory
// @desc    Add TripCategory
// @access  Private
router.post('/', 
    [
        auth,
        [
            check('name', 'Nombre es requerido').not().isEmpty()
        ]
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.body;

        try {
            let newTripCategory = new TripCategory({
                name
            });

            const tripcategory = await newTripCategory.save();
            res.json(tripcategory);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
        
    }
);


module.exports = router;