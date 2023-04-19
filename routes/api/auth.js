const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const JWT_SECRET = config.get('jwtSecret');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/', 
    [
        check('email', 'Por favor ingrese un mail valido').isEmail(),
        check('password', 'Password es requerido').exists()
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email: email });

            if (!user) {
                return res.status(400).json({ errors: [{msg: 'Credenciales Invalidas'}] })
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({ errors: [{msg: 'Credenciales Invalidas'}] })
            }

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload, 
                JWT_SECRET,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

        } catch(err) {
            console.error(err);
            res.status(500).send(err);
        }
    }
);

// @route   POST api/auth/forgot-password
// @desc    Forgot Password, send restore link by mail
// @access  Public
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "Usuario no existe!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `api/auth/reset-password/${oldUser._id}/${token}`;

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
          console.log("Server is ready to take our email messages");
        }
      });

    var mail = {
        from: config.get('contact_user'),
        to: email,
        subject: 'Reestablecer Contraseña',
        text: link
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
    //console.log(link);
    //res.json(link);
  } catch (error) { }
});

// @route   GET api/auth/reset-password/:id/:token
// @desc    Forgot Password, send restore link by mail
// @access  Public
router.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "Usuario no existe!!" });
    }
    //console.log(oldUser);
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      res.json({ email: verify.email, status: "No verificado" });
    } catch (error) {
      console.log(error);
      res.send("No verificado");
    }
  });

// @route   POST api/auth/reset-password/:id/:token
// @desc    Reset Password, send new password
// @access  Public
router.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "Usuario no existe!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      var salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
  
      res.json({ email: verify.email, status: "verificado" });
    } catch (error) {
      console.log(error);
      res.json({ status: "Ocurrio un error inesperado", error: error });
    }
  });

module.exports = router;