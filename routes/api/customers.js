const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const checkObjectId = require('../../middleware/checkObjectId')
const Customer = require('../../models/Customer')
const User = require('../../models/User')
const Token = require('../../models/Token')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const sendEmail = require("../../utils/sendEmail")
const { linkSync } = require('fs')

// @route   POST api/customers
// @desc    Add Customer
// @access  Private
router.post('/',
  [
    [
      check('first_name', 'Nombre es requerido').not().isEmpty(),
      check('last_name', 'Apellido es requerido').not().isEmpty(),
      check('email', 'Email es requerido').not().isEmpty(),
      check('password', 'Por favor ingrese la contraseña con 6 o mas caracteres').isLength({ min: 8 }),
      check('dni', 'DNI es requerido').not().isEmpty(),
      check('phone', 'Celular es requerido').not().isEmpty(),
      check('birth_date', 'Fecha Nac. es requerido').not().isEmpty(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, password, dni, phone, birth_date, medical_status } = req.body;

    try {
      // Verificamos que no exista el mail
      const userByEmail = await User.findOne({ email });

      if (userByEmail) {
        return res.status(400).json({ errors: [{ msg: 'El email ya existe' }] })
      }

      // Creamos el Usuario
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const user = await new User({
        name: first_name + ' ' + last_name, email, password: hashedPassword, super_admin: false
      }).save()

      // Creamos el Customer
      const customer = await new Customer({
        _id: user._id,
        first_name, last_name, dni, phone, birth_date, medical_status
      }).save()

      // Generamos el token para la verificacion del mail del usuario
      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex')
      }).save()

      //TODO: OJOOO Comentado porq no anda en AADI
      // Enviamos el mail con el link para la verficacion de mail del customer
      // const subject = global.env.verifyEmailSubject
      // const link = `${req.protocol}://${req.get('host')}/verify-email/${user._id}/${token.token}`
      // const text = link
      // const html = `<p>Hola ${customer.first_name} gracias por elegirnos!!</p><br><p>Recibimos tu datos de registro correctamente, por favor confirma el email hacieindo click en el siguiente </p><p><a href="${link}">LINK</a></p>`

      //await sendEmail(user.email, subject, text, html)

      res.json({ customer, user, token });

    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }

  }
);

// @route    DELETE api/customers/:id
// @desc     Delete a Customer
// @access   Private
router.delete('/:id',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);

      if (!customer) {
        return res.status(404).json({ msg: 'Miembro no encontrado' });
      }

      await customer.remove();

      res.json({ msg: 'Miembro eliminado' });
    } catch (err) {
      console.error(err.message);

      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route   PUT api/customers/:id
// @desc    Update Customer
// @access  Private
router.put('/:id',
  checkObjectId('id'),
  [
    auth,
    [
      check('first_name', 'Nombre es requerido').not().isEmpty(),
      check('last_name', 'Apellido es requerido').not().isEmpty(),
      check('dni', 'DNI es requerido').not().isEmpty(),
      check('phone', 'Celular es requerido').not().isEmpty(),
      check('birth_date', 'Fecha Nac. es requerido').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, dni, phone, birth_date, medical_status } = req.body;

    try {
      const customer = await Customer.findByIdAndUpdate(req.params.id, { first_name, last_name, dni, phone, birth_date, medical_status }, { new: true });
      res.json(customer);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }

  }
);

// @route    GET api/customers/auth
// @desc     Get customer user logged
// @access   Public
router.get('/auth/',
  auth,
  async (req, res) => {
    try {
      //console.log(req?.user)
      const customer = await Customer.findById(req.user.id);

      if (!customer) {
        return res.status(404).json({ msg: 'Miembro no encontrado' });
      }

      res.json(customer);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/customers/:id
// @desc     Get customer by id
// @access   Public
router.get('/:id',
  checkObjectId('id'),
  async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);

      if (!customer) {
        return res.status(404).json({ msg: 'Miembro no encontrado' });
      }

      res.json(customer);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);


// @route   GET api/customers
// @desc    Get all customers
// @access  Private
router.get('/',
  auth,
  async (req, res) => {
    try {
      const query = req.query.q ? req.query.q : "";
      const limit = req.query.limit && !isNaN(req.query.limit) ? parseInt(req.query.limit) : 100;
      let page = 1;
      if (req.query.page && !isNaN(req.query.page) && parseInt(req.query.page) > 0)
        page = parseInt(req.query.page);
      const sort = req.query.sort ? req.query.sort : "date";
      const order = req.query.order ? req.query.order : "-1";

      let db_query = {
        $or: [
          { first_name: { $regex: query, '$options': 'i' } },
          { last_name: { $regex: query, '$options': 'i' } },
          { phone: { $regex: query, '$options': 'i' } },
          { dni: { $regex: query, '$options': 'i' } },
          { medical_status: { $regex: query, '$options': 'i' } },
          { email: { $regex: query, '$options': 'i' } },
        ]
      };

      const totalItems = await Customer
        .find(db_query)
        .countDocuments();

      const customers = await Customer
        .find(db_query)
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({ [sort]: order });

      res.json({
        "metadata": {
          "query": query,
          "total": totalItems,
          "count": customers.length,
          "limit": limit,
          "page": page
        },
        "data": customers
      });

      if (!customers) {
        return res.status(404).json({ msg: 'Miembros no encontrados' });
      }
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  });

module.exports = router;    