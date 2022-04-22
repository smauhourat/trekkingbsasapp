const moment = require('moment');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
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
      const page = req.query.page && !isNaN(req.query.page) ? (parseInt(req.query.page) <= 0 ? 1 : parseInt(req.query.page) ) : 1;

      const db_query = {
          date:{ $gte: new Date(dateFrom), $lt: new Date(dateTo)},
          $or: [
            { title: { $regex: query, '$options' : 'i' }},
            { subtitle: { $regex: query, '$options' : 'i' }},
            { description: { $regex: query, '$options' : 'i' }},
            { location: { $regex: query, '$options' : 'i' }},
          ]
      };

      const totalItems = await Trip
        .find(db_query)
        .countDocuments();

      const trips = await Trip
        .find(db_query)
        .sort({ created: 'asc' })
        .limit(limit)
        .skip(limit*(page-1));
        
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
// @desc     Delete a Trip
// @access   Private
router.delete('/:id', 
  auth,  
  checkObjectId('id'),
  async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
  
      if (!trip) {
        return res.status(404).json({ msg: 'Trip not found' });
      }

      const images = trip.images.map(function(item) {
        return item["public_id"];
      })

      cloudinary.api.delete_resources(images, function(err, result){
        if (err) {
          res.status(500).send(res);
        }           
      })

      await trip.remove();
  
      res.json({ msg: 'Evento eliminado' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
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

// @route    PUT api/trips/:id/images
// @desc     Add Trip Image
// @access   Private
// router.put('/:id/images',
//   auth,
//   async (req, res) => {

//     try {
//         // Get the trip
//         const trip = await Trip.findById(req.params.id);

//         const data = {
//           image: req.body.image,
//         };        

//         // upload image here
//         cloudinary.uploader
//           .upload(data.image)
//           .then((result) => {

//             const tripImage = {
//               url: result.url,
//               public_id: result.public_id
//             }
            
//             trip.images.unshift(tripImage);
//             trip.save();

//             res.json(trip);
//           })
//           .catch((error) => {
//             res.status(500).send({
//               message: "failure",
//               error,
//             });
//           });          
//      } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//      }
//   }
// );

// // @route   DELETE api/trips/:id/images/:id_image
// // @desc    Delete trip image from
// // @access  Private
// router.delete(':id/images/:id_image', 
//   auth, 
//   async (req, res) => {
//     try {
//       const trip = await Trip.findById(req.params.id);
  
//       if (!trip) {
//         return res.status(404).json({ msg: 'Trip not found' });
//       }
      
//       // delete image here
//       cloudinary.uploader.destroy(req.params.id_image, function(err, res) {
//         if (!err) {
//           trip.images = trip.images.filter(
//             (img) => img.public_id.toString() !== req.params.id_image
//           );

//           trip.save();

//           res.json(trip);
//         } 
//         res.status(500).send(res);
//       });
//     }catch(err) {
//       console.error(err.message);
    
//       res.status(500).send('Server Error');
//     }
// });

// @route    POST api/trips/images/:id
// @desc     Add trip image
// @access   Private
// router.post('/images/:id',
//   auth,
//   async (req, res) => {

//     try {
//         // Get the trip
//         const trip = await Trip.findById(req.params.id);

//         const data = {
//           image: req.body.image,
//         };        

//         // upload image here
//         cloudinary.uploader
//           .upload(data.image)
//           .then((result) => {

//             const tripImage = {
//               url: result.url,
//               public_id: result.public_id
//             }
            
//             trip.images.unshift(tripImage);
//             trip.save();

//             res.json(trip);
//           })
//           .catch((error) => {
//             res.status(500).send({
//               message: "failure",
//               error,
//             });
//           });          
//      } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//      }
//   }
// );

module.exports = router;