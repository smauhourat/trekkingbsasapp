const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../../middleware/auth');

const cloudinary = require("cloudinary").v2;

const Trip = require('../../models/Trip');
//  https://www.youtube.com/watch?v=Rw_QeJLnCK4

cloudinary.config({
  cloud_name: global.env.cloudName,
  api_key: global.env.apiKey,
  api_secret: global.env.apiSecret
});


// @route    GET api/trips/:id/images
// @desc     Get images trip by TripId
// @access   Public
router.get('/',
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

// @route    GET api/trips/:id/images/:id_image
// @desc     Get image by ID trip by ID
// @access   Public
router.get('/:id_image',
  async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
      const id_image = req.params.id_image;

      if (!trip) {
        return res.status(404).json({ msg: 'Trip not found' });
      }

      cloudinary.api.resource(id_image, function (_err, result) {
        res.json(result);
      });

    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  });

// @route    POST api/trips/:id/images
// @desc     Add Trip Image
// @access   Private
router.post('/',
  auth,
  async (req, res) => {

    try {
      // Get the trip
      const trip = await Trip.findById(req.params.id);

      if (!trip) {
        return res.status(404).json({ msg: 'Evento no encontrado' });
      }

      const data = {
        image: req.body.data,
      };

      // upload image here
      cloudinary.uploader
        .upload(data.image)
        .then((result) => {
          const tripImage = {
            url: result.url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            resource_type: result.resource_type,
            created_at: result.created_at,
            bytes: result.bytes
          }

          trip.images?.unshift(tripImage);
          trip.save();

          res.json(trip);
        })
        .catch((error) => {
          res.status(500).send({
            msg: "failure",
            err: error.message,
          });
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/trips/:id/images/:id_image
// @desc    Delete trip image from
// @access  Private
router.delete('/:id_image',
  auth,
  async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
      const id_image = req.params.id_image;

      if (!trip) {
        return res.status(404).json({ msg: 'Evento no encontrado' });
      }

      // delete image here
      cloudinary.uploader.destroy(id_image, function (err, _result) {
        if (!err) {
          trip.images = trip.images.filter(
            (img) => img.public_id.toString() !== id_image
          );

          trip.save();
        } else {
          res.status(500).send(res);
        }

        res.json(trip);
      });
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  });

module.exports = router;