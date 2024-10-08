const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');
const Book = require('../../models/Book');
const Trip = require('../../models/Trip');
const Customer = require('../../models/Customer');
const User = require('../../models/User');
const Account = require('../../models/Account');
const transporter = require('../../config/mailer');
const { getBaseUrl } = require('../../config/config')
const getBookCode = require('../../utils/getBookCode')
const logger = require('../../utils/logger')

// @route   POST api/books
// @desc    Add Book
// @access  Private
router.post('/',
  [auth],
  [
    checkObjectId('trip', true),
    checkObjectId('customer', true),
    check('price', 'Debe ingresar el precio').not().isEmpty(),
    check('price', 'El precio debe ser numerico positivo').isCurrency({ require_symbol: false, allow_negatives: false }),
    check('description', 'Debe ingresar la descripcion').not().isEmpty(),
  ]
  ,
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customer, trip, price, description } = req.body;

    const book = await Book.findOne({
      trip: trip,
      customer: customer
    })

    if (book) return res.status(400).send({ message: "Ya tiene una reserva", data: { "bookId": book._id } })

    const currentDate = new Date()
    const tripDb = await Trip.findOne({
      _id: trip,
      date: { $gte: currentDate }
    })

    if (!tripDb) return res.status(400).send({ message: "El evento expiro" })

    const accounts = await Account.find({ active: true }).select(['-_id', '-createdAt', '-updatedAt', '-__v', '-active'])

    const code = await getBookCode()
    try {
      const book = await new Book({
        code: code,
        trip: trip,
        customer: customer,
        price,
        description,
        accounts
      }).save()

      await incrementReservationTrip(trip)
      await sendBookingCustomerMail(await getBaseUrl(req), book)
      res.json(book)
    }
    catch (err) {
      console.error(err)
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send(err)
    }

  }
);

// @route    GET api/books/?q&limit&page&sort
// @desc     Get Books by query
// @access   Private
router.get('/',
  [authAdmin],
  async (req, res) => {
    try {
      const query = req.query.q ? req.query.q : "";
      const limit = req.query.limit && !isNaN(req.query.limit) ? parseInt(req.query.limit) : 100;
      let page = 1;
      if (req.query.page && !isNaN(req.query.page) && parseInt(req.query.page) > 0)
        page = parseInt(req.query.page);

      const sort = req.query.sort ? req.query.sort : "date";
      const order = req.query.order ? req.query.order : "-1";

      const trip = req.query.trip ? req.query.trip : "";
      const customer = req.query.customer ? req.query.customer : "";


      let db_query = {};
      if (trip !== "")
        db_query = { ...db_query, trip: mongoose.Types.ObjectId(trip) }
      if (customer !== "")
        db_query = { ...db_query, customer: mongoose.Types.ObjectId(customer) }

      // console.log(db_query)
      const totalItems = await Book
        .find(db_query)
        .countDocuments();

      const books = await Book
        .find(db_query)
        .populate('trip')
        .populate({ path: 'customer', select: '-password' })
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({ [sort]: order });

      res.json({
        "metadata": {
          "query": query,
          "total": totalItems,
          "count": books.length,
          "limit": limit,
          "page": page
        },
        "data": books
      });

      if (!books) {
        return res.status(404).json({ msg: 'Reservas no encontrado' });
      }
    } catch (err) {
      console.error(err);
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/books/:id
// @desc     Get book by Id
// @access   Private
router.get('/:id',
  [auth],
  checkObjectId('id'),
  async (req, res) => {

    try {
      const book = await Book.findById(req.params.id)
        .populate('trip')
        .populate({ path: 'customer', select: '-password' });

      if (!book) {
        return res.status(404).json({ msg: 'Reserva no encontrada' });
      }

      res.json(book);
    } catch (err) {
      console.error(err);
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send('Server Error');
    }
  });

// @route    PATCH api/books/:id
// @desc     Update status Book
// @access   Private
router.patch('/:id',
  [auth],
  checkObjectId('id'),
  async (req, res) => {

    const { status } = req.body;

    try {
      const currentBook = await Book.findById(req.params.id);

      if (currentBook.status === "approved" && req.body.status === "pendiente")
        return res.status(404).json({ msg: 'La Reserva no puede pasar a estado pendiente' });

      const book = await Book.updateOne({ _id: req.params.id }, { $set: { status: status } });

      res.json(book);
    } catch (err) {
      console.error(err);
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send('Server Error');
    }
  });

// @route    DELETE api/books/:id
// @desc     Delete a Book
// @access   Private
router.delete('/:id',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {

      const book = await Book.findById(req.params.id);

      if (!book) {
        return res.status(404).json({ msg: 'Reserva no encontrada' });
      }

      // if (book.status !== "pending") {
      //   return res.status(400).json({ msg: 'La Reserva no puede ser eliminada' });
      // }

      await book.remove();

      res.json({ msg: 'Reserva eliminada' });
    } catch (err) {
      console.error(err);
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/books/by-customer
// @desc     Get Book by Customer (for Administrators)
// @access   Private  
router.get('/by-customer/:id',
  [checkObjectId('id'), auth],
  async (req, res) => {
    try {
      const id = req.params.id;

      console.log(req.user)
      if (!req.user.admin && req.user.id !== id)
        return res.status(404).json({ msg: 'Usted no tiene permisos para ver las Reservas' });

      const limit = req.query.limit && !isNaN(req.query.limit) ? parseInt(req.query.limit) : 100;
      let page = 1;
      if (req.query.page && !isNaN(req.query.page) && parseInt(req.query.page) > 0)
        page = parseInt(req.query.page);

      const sort = req.query.sort ? req.query.sort : "date";
      const order = req.query.order ? req.query.order : "-1";

      let db_query = {};
      db_query = { ...db_query, customer: mongoose.Types.ObjectId(id) }

      // console.log(db_query)

      const totalItems = await Book
        .find(db_query)
        .countDocuments();

      const books = await Book
        .find(db_query)
        .populate('trip')
        .populate({ path: 'customer', select: '-password' })
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({ [sort]: order });

      res.json({
        "metadata": {
          "query": id,
          "total": totalItems,
          "count": books.length,
          "limit": limit,
          "page": page
        },
        "data": books
      });

      if (!books) {
        return res.status(404).json({ msg: 'Reservas no encontrado' });
      }
    } catch (err) {
      console.error(err);
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/books/by-trip
// @desc     Get Book by Trip (for Administrators)
// @access   Private  
router.get('/by-trip/:id',
  [checkObjectId('id'), authAdmin],
  async (req, res) => {
    try {
      const id = req.params.id;
      const limit = req.query.limit && !isNaN(req.query.limit) ? parseInt(req.query.limit) : 100;
      let page = 1;
      if (req.query.page && !isNaN(req.query.page) && parseInt(req.query.page) > 0)
        page = parseInt(req.query.page);

      const sort = req.query.sort ? req.query.sort : "date";
      const order = req.query.order ? req.query.order : "-1";

      let db_query = {};
      db_query = { ...db_query, trip: mongoose.Types.ObjectId(id) }

      const totalItems = await Book
        .find(db_query)
        .countDocuments();

      const books = await Book
        .find(db_query)
        .populate('trip')
        .populate({ path: 'customer', select: '-password' })
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({ [sort]: order });

      res.json({
        "metadata": {
          "query": id,
          "total": totalItems,
          "count": books.length,
          "limit": limit,
          "page": page
        },
        "data": books
      });

      if (!books) {
        return res.status(404).json({ msg: 'Reservas no encontrado' });
      }
    } catch (err) {
      console.error(err);
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send('Server Error');
    }
  });

// @route    POST api/:id/payment
// @desc     Update payment and change status (for Customer)
// @access   Public
router.post('/:id/payment',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {
      const { transaction_number } = req.body;

      // const bookBefore = await Book.findById(req.params.id)

      // if (bookBefore.status !== "pendiente")
      //   return res.status(404).json({ message: 'La Reserva no puede modificarse' });
      const status = transaction_number !== "" ? "procesando" : "pendiente"

      const book = await Book.findByIdAndUpdate({ _id: req.params.id }, { $set: { transaction_number, status: status } }, { new: true })
        .populate('trip')
        .populate({ path: 'customer', select: '-password' })

      // console.log(book)

      res.json(book);

    } catch (err) {
      console.error(err);
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      res.status(500).send({ message: "Internal Server Error", error: error });
    }
  })

const incrementReservationTrip = async (id) => {
  const trip = await Trip.findByIdAndUpdate(id, { $inc: { reservations: 1 } }, { new: true });
  return trip;
}

const sendBookingCustomerMail = async (baseUrl, book) => {
  const customer = await Customer.findById(book.customer)
  const user = await User.findById(book.customer)

  //const boolDetailslink = `${baseUrl}/book-details/${book._id}`
  const boolDetailslink = `${baseUrl}/booking-success/${book._id}`
  const accountsHtml = book.accounts.map((account) => {
    console.log('account.account_alias', account.account_alias === undefined)
    return (
      "<p><strong>" + account.bank + "</strong></p>" +
      "<p>" + account.account_type + " - " + account.currency + " Nro " + account.account_number + "</p>" +
      "<p>CBU: <strong>" + account.account_cbu + "</strong></p>" +
      "<p>Alias: <strong>" + (account.account_alias !== undefined ? account.account_alias : "-") + "</strong></p>" +
      "<br>"
    )
  })

  const subject = `${global.env.bookSubject} - ${book.code}  - ${book.description}`
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
        <img src="https://trekkingbuenosaires.adhentux.com/logo_mail.svg" />
        <p style="font-size:16px; font-weight:600; color:#78777a; line-height: 1.6;">Hola <b>${customer.first_name}</b> gracias
          por elegirnos!!</p>
        <p style="font-size:14px; font-weight:550; color:#78777a;line-height: 1.6;">Recibimos tu RESERVA correctamente
        </p>
        <p><a href="${boolDetailslink}">Ver Detalle</a></p>
        <p>Para completar el proceso, realizá la Transferencia o Depósito en alguna de las siguientes cuentas</p>
        <br>
        ${accountsHtml}
        <br>
        <p>Por favor ingresá el nro de transaccion <a href="${boolDetailslink}">aqui</a> o bien envianos un mail con el
          comprobante a ventas@trekkingbuenosaires.com.ar</p>
        <br>
        <p>Muchas Gracias</p>
      </td>
    </tr>
  </table>
</body>
</html>`

  const mail = {
    from: global.env.contact_user,
    to: user.email,
    subject: subject,
    text: boolDetailslink,
    html: html
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
  })
}

module.exports = router;