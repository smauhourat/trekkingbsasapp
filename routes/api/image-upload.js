// https://dev.to/ebereplenty/image-upload-to-cloudinary-with-nodejs-and-dotenv-4fen
// https://github.com/EBEREGIT/server-tutorial/blob/master/routes/controllers/imageUpload.js

const express = require('express')
const router = express.Router()

const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: global.env.cloudName,
  api_key: global.env.apiKey,
  api_secret: global.env.apiSecret
})

router.post('/', (req, res) => {
  // collected image from a user
  const data = {
    image: req.body.image
  }

  // upload image here
  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      res.status(200).send({
        message: 'success',
        result
      })
    })
    .catch((error) => {
      res.status(500).send({
        message: 'failure',
        error
      })
    })
})

module.exports = router
