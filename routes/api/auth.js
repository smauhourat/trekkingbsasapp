const express = require('express')
const transporter = require('../../config/mailer')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const logger = require('../../utils/logger')

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    //console.log(req.user)
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err)
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    res.status(500).send('Server error')
  }
})

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Por favor ingrese un mail valido').isEmail(),
    check('password', 'Password es requerido').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Credenciales Invalidas' }] })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Credenciales Invalidas' }] })
      }

      // log last access
      await User.updateOne({ _id: user._id }, { $set: { last_access: Date.now() } })

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          admin: user.super_admin
        }
      }

      jwt.sign(
        payload,
        global.env.jwtSecret,
        { expiresIn: '2h' }, // 360000
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
      logger.info(`User <${email}> logged`)
    } catch (err) {
      console.error(err)
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send(err)
    }
  }
)

// @route   POST api/auth/forgot-password
// @desc    Forgot Password, send restore link by mail
// @access  Public
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body
  try {
    const oldUser = await User.findOne({ email })
    if (oldUser == null) {
      return res.json({
        status: 'fail',
        message: 'Usuario no existe!!'
      })
    }
    const secret = global.env.jwtSecret + oldUser.password
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: '10m'
    })
    const subject = global.env.resetPasswordSubject
    const requestedUrl = req.headers['client-base-url']
    const link = `${requestedUrl}/reset-password/${oldUser._id}/${token}`
    const text = ""
    const html = `<!DOCTYPE html>
    <html lang="es">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    </head>

    <body>

      <table width="600" style="border:'1px'; text-align:'center;'" align="center" cellpadding="0" cellspacing="0"
        style="font-family: Raleway, Helvetica, sans-serif;">
        <tr>
          <td bgcolor="#FAFAFA" width="650"
            style="color:#666; text-align:center; font-size:13px;font-family:Raleway, Helvetica, sans-serif; padding:30px 50px 20px 50px;line-height:14px; border-radius:0 0 0 0 ;">
            <img src="https://argentinoscaminando.com/static/media/logo.dea47b25aa3249587ec6.svg" />
            <p style="font-size:16px; font-weight:600; color:#78777a; line-height: 1.6;">Hola hemos recibido tu pedido para reestablecer la contraseña!!</p>
            <p style="font-size:14px; font-weight:550; color:#78777a;line-height: 1.6;">Por favor hace click en el siguiente enlace </p>
            <p><a href="${link}">RECUPERAR CONTRASEÑA</a></p>
          </td>
        </tr>
      </table>
    </body>
    </html>`


    const mail = {
      from: global.env.contact_user,
      to: email,
      subject: subject,
      text: link,
      html: html
    }

    // html: `<p>Para cambiar su contraseña por favor haga click <a href="${link}">aquí.</a></p>`

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        proxy
        res.json({
          status: 'fail',
          message: 'Error enviando el mail'
        })
      } else {
        res.json({
          status: 'success',
          message: 'El mail ha sido enviado con exito'
        })
      }
    })
  } catch (err) {
    console.error(err)
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    res.status(500).send(err)
  }
})

// @route   GET api/auth/reset-password/:id/:token
// @desc    Forgot Password, send restore link by mail
// @access  Public
router.get('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params
  const oldUser = await User.findOne({ _id: id })
  if (!oldUser) {
    return res.json({ status: 'Usuario no existe!!' })
  }
  const secret = global.env.jwtSecret + oldUser.password
  try {
    const verify = jwt.verify(token, secret)
    res.json({ email: verify.email, status: 'No verificado' })
  } catch (err) {
    console.error(err)
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    res.json({ status: 'fail', message: 'No verificado, el token ha expirado' })
  }
})

// @route   POST api/auth/reset-password/:id/:token
// @desc    Reset Password, send new password
// @access  Public
router.post('/reset-password/:id/:token', async (req, res) => {
  const { id } = req.params
  const { password } = req.body
  const oldUser = await User.findOne({ _id: id })
  if (!oldUser) {
    return res.json({ status: 'Usuario no existe!!' })
  }
  try {
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)
    await User.updateOne(
      {
        _id: id
      },
      {
        $set: {
          password: encryptedPassword
        }
      }
    )

    // res.json({ email: verify.email, status: "verificado" });
    res.json({
      status: 'success',
      message: 'La contraseña se ha cambiado con exito'
    })
  } catch (err) {
    console.error(err)
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    res.json({ status: 'Ocurrio un error inesperado', error })
  }
})

module.exports = router
