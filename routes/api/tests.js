const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const hostname = req.headers.host; // Get the hostname
  const origin = req.headers; // Get the origin
  const protocol = req.headers['x-forwarded-proto']
  const host = req.headers['x-forwarded-host']

  // console.log(req)

  res.json({
    hostname: hostname,
    origin: origin,
    protocol: protocol,
    host: host
  })
}) 

module.exports = router