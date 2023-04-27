const express = require('express');
const transporter = require('../../config/mailer');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { getMaxListeners } = require('../../models/User');

const config = require('config');

// @route    GET api/contact
// @desc     Send Contact Info
// @access   Public
router.post('/',
  [
    check('title', 'Titulo es requerido').not().isEmpty(),
    check('email', 'Email es requerido').not().isEmpty(),
    check('subject', 'Asunto es requerido').not().isEmpty(),
    check('message', 'Mensaje es requerido').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, email, subject, message } = req.body;

    var mail = {
      from: email,
      to: config.get('contact_to'),
      subject: subject,
      text: 'De: ' + email + '\nMensaje: ' + message
    }

    //var requestedUrl = req.protocol + '://' + req.get('Host') + req.url;
    //console.log('requestedUrl: ', requestedUrl);

    // transporter.sendMail(mail, (err, data) => {
    //   if (err) {
    //     res.json({
    //       status: 'fail'
    //     })
    //   } else {
    //     res.json({
    //       status: 'success'
    //     })
    //   }
    // });

    //res.json(req.body);

  }
)

module.exports = router;