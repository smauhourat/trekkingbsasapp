const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');
const Customer = require('../../models/Customer');
const crypto = require('crypto');

const createEmailVerificationCode = () => {
  const verificationCode = crypto.randomBytes(32).toString('hex');

  const hashedVerificationCode = crypto
    .createHash('sha256')
    .update(verificationCode)
    .digest('hex');

  return { verificationCode, hashedVerificationCode };
}

// @route   POST api/customers
// @desc    Add Customer
// @access  Private
router.post('/',
  [
    [
      check('first_name', 'Nombre es requerido').not().isEmpty(),
      check('last_name', 'Apellido es requerido').not().isEmpty(),
      check('dni', 'DNI es requerido').not().isEmpty(),
      check('phone', 'Celular es requerido').not().isEmpty(),
      check('birth_date', 'Fecha Nac. es requerido').not().isEmpty(),
      check('email', 'Email es requerido').not().isEmpty(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, dni, phone, birth_date, medical_status } = req.body;

    try {

      let customerByEmail = await Customer.findOne({ email: email });

      if (customerByEmail) {
        return res.status(400).json({ errors: [{ msg: 'El email ya existe' }] })
      }
      const { verificationCode, hashedVerificationCode } = createEmailVerificationCode();
      let newCustomer = new Customer({
        first_name, last_name, email, dni, phone, birth_date, medical_status, email_verification_code: hashedVerificationCode
      });

      const customer = await newCustomer.save();

      // TODO : enviar por mail el link con el codigo para validar el email, el codigo es verificationCode
      res.json({ code: verificationCode });
      res.json(customer);
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
      check('birth_date', 'Fecha Nac. es requerido').not().isEmpty(),
      check('email', 'Email es requerido').not().isEmpty(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(customer);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
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