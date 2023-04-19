const express = require('express');
const nodemailer = require('nodemailer');
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
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { title, email, subject, message } = req.body;

        const transporter = nodemailer.createTransport({
          host: config.get('contact_host'), //replace with your email provider
          port: config.get('contact_port'), //replace with your
          auth: {
            user: config.get('contact_user'), //process.env.EMAIL,
            pass: config.get("contact_pwd") //process.env.PASSWORD
          }
        });
      
      // verify connection configuration
      transporter.verify(function(error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log("Server is ready to take our contact messages");
          }
        });  

        var mail = {
            from: email,
            to: config.get('contact_to'),
            subject: subject,
            text: 'De: ' + email + '\nMensaje: ' + message
          }        
        
        transporter.sendMail(mail, (err, data) => {
            if (err) {
              res.json({
                status: 'fail'
              })
            } else {
              res.json({
               status: 'success'
              })
            }
          });

        //res.json(req.body);

    }
)

module.exports = router;