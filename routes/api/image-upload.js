//https://dev.to/ebereplenty/image-upload-to-cloudinary-with-nodejs-and-dotenv-4fen
//https://github.com/EBEREGIT/server-tutorial/blob/master/routes/controllers/imageUpload.js

const express = require('express');
const router = express.Router();

//const config = require('config');
//const environment = require('./environment');
const cloudinary = require("cloudinary").v2;

// cloudinary configuration
// cloudinary.config({
//     cloud_name: config.get('cloud_name'),
//     api_key: config.get('api_key'),
//     api_secret: config.get('api_secret'),
//   });

cloudinary.config({
  cloud_name: global.env.cloudName,
  api_key: global.env.apiKey,
  api_secret: global.env.apiSecret,
});


router.post("/", (req, res) => {
  // collected image from a user
  const data = {
    image: req.body.image,
  };

  // upload image here
  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      res.status(200).send({
        message: "success",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "failure",
        error,
      });
    });
});

module.exports = router;