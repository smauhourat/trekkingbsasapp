const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const checkObjectId = require('../../middleware/checkObjectId')
const Token = require('../../models/Token')
const User = require('../../models/User')
const logger = require('../../utils/logger')

// TODO: Ojo, no deberia ser publico
// @route   POST api/users
// @desc    Add user
// @access  Public
router.post(
  '/',
  auth,
  [
    check('name', 'Nombre es requerido').not().isEmpty(),
    check('email', 'Por favor incluya el mail').isEmail(),
    check('password', 'Por favor ingrese la contraseña con 6 o mas caracteres.').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'El Usuario ya existe' }] })
      }

      user = new User({
        name,
        email,
        password,
        super_admin: true
      })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()
      logger.info(`User <${email}> added`)

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        // config.get('jwtSecret'),
        global.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err)
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send(err)
    }
  }
)

// @route   PUT api/users/:id
// @desc    Update user
// @access  Private
router.put(
  '/:id',
  checkObjectId('id'),
  auth,
  [
    check('name', 'Nombre es requerido').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

      res.json(user)
    } catch (err) {
      console.error(err)
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send(err)
    }
  }
)

// @route    GET api/users/:id
// @desc     Get user by ID
// @access   Public
router.get('/:id',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id)

      if (!user) {
        return res.status(404).json({ msg: 'User not found' })
      }

      res.json(user)
    } catch (err) {
      console.error(err)
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send('Server Error')
    }
  })

// @route    DELETE api/users/:id
// @desc     Delete a user
// @access   Private
router.delete('/:id',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {
      if (req.user.id === req.params.id) {
        return res.status(400).json({ msg: 'El usuario es el mismo al logueado' })
        // return res.status(400).json({ errors: [{ msg: 'El usuario es el mismo al logueado' }] });
      }

      const user = await User.findById(req.params.id)

      if (!user) {
        return res.status(404).json({ msg: 'Usuario no encontrado' })
      }

      if (user.super_admin) {
        return res.status(400).json({ msg: 'El Usuario no puede ser eliminado' })
      }

      await user.remove()
      logger.info(`User <${user.email}> deleted`)
      res.json({ msg: 'Usuario eliminado' })
    } catch (err) {
      console.error(err)
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send('Server Error')
    }
  })

// @route   GET api/users
// @desc    Get all users (por defecto solo devuelve los usuarios administradores)
// @access  Private
router.get('/',
  auth,
  async (_req, res) => {
    try {
      const users = await User
        .find({ super_admin: true })
        .sort({ createdAt: 'asc' })

      res.json({
        metadata: {
          count: users.length
        },
        data: users
      })

      if (!users) {
        return res.status(404).json({ msg: 'Usuario no encontrado' })
      }
    } catch (err) {
      console.error(err)
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send('Server Error')
    }
  })


// @route   POST api/users/verify-email/:id/:token
// @dest    Verify email es valid
// @access  Public
router.post('/verify-email/:id/:token',
  async (req, res) => {
    try {
      const { id, token } = req.params
      const user = await User.findOne({ _id: id });
      if (!user) {
        logger.error(`VerifyEmail (${id}-${token}) link not valid`)
        return res.status(400).send({ message: "Link invalido" });
      }

      const tokendb = await Token.findOne({
        userId: user._id,
        token: token,
        tokenType: "email-verification"
      }, {}, { sort: { createdAt: -1 } });
      if (!tokendb) {
        logger.error(`VerifyEmail (${id}-${token}) token expired`)
        return res.status(400).send({ message: "Link invalido" });
      }

      await User.updateOne({ _id: id }, { $set: { email_verified: true } })
      await tokendb.remove();
      logger.error(`Verify Email (${id}-${token}) correctly`)
      res.status(200).send({ message: "Email verificado correctamente" });
    } catch (err) {
      console.error(err)
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send({ message: "Internal Server Error", error: err });
    }
  })


module.exports = router
