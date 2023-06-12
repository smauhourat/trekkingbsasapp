const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Add user
// @access  Public
router.post(
  '/',
  auth,
  [
    check('name', 'Nombre es requerido').not().isEmpty(),
    check('email', 'Por favor incluya el mail').isEmail(),
    check('password', 'Por favor ingrese la contraseña con 6 o mas caracteres').isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'El Usuario ya existe' }] })
      }

      user = new User({
        name,
        email,
        password
      });

      var salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        //config.get('jwtSecret'),
        global.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

// @route    GET api/users/:id
// @desc     Get user by ID
// @access   Public
router.get('/:id',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      res.json(user);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  });

// @route    DELETE api/users/:id
// @desc     Delete a user
// @access   Private
router.delete('/:id',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {

      if (req.user.id === req.params.id) {
        return res.status(400).json({ msg: 'El usuario es el mismo al logueado' });
        //return res.status(400).json({ errors: [{ msg: 'El usuario es el mismo al logueado' }] });
      }

      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }

      if (user.super_admin) {
        return res.status(400).json({ msg: 'El Usuario no puede ser eliminado' });
      }

      await user.remove();

      res.json({ msg: 'Usuario eliminado' });
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  });

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/',
  auth,
  async (_req, res) => {
    try {
      const users = await User
        .find()
        .sort({ date: 'asc' });

      res.json({
        "metadata": {
          "count": users.length
        },
        "data": users
      });

      if (!users) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  });

module.exports = router;