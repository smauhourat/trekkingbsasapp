const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');
const mercadopage = require("mercadopago");
const Book = require('../../models/Book');
const Trip = require('../../models/Trip');
const Customer = require('../../models/Customer');
const transporter = require('../../config/mailer');

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

    try {
      let newBook = new Book({
        trip: trip,
        customer: customer,
        price,
        description,
      });

      const book = await newBook.save();
      res.json(book);
    }
    catch (err) {
      console.error(err);
      res.status(500).send(err);
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
      console.error(err.message);

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
      console.error(err.message);

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

      if (currentBook.status === "approved" && req.body.status === "pending")
        return res.status(404).json({ msg: 'La Reserva no puede pasar a estado pendiente' });

      const book = await Book.updateOne({ _id: req.params.id }, { $set: { status: status } });

      res.json(book);
    } catch (err) {
      console.error(err.message);

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
      console.error(err.message);

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
      console.error(err.message);

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
      console.error(err.message);

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

      const bookBefore = await Book.findById(req.params.id)

      if (bookBefore.status !== "pending")
        return res.status(404).json({ message: 'La Reserva no puede modificarse' });

      const book = await Book.findByIdAndUpdate({ _id: req.params.id }, { $set: { transaction_number, status: 'paid' } }, { new: true });

      res.json(book);

    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error: error });
    }
  })

// @route    POST api/books/create-order
// @desc     Create Payment Order for Book
// @access   Private  
router.post('/create-order', [
  check('title', 'title es requerido').not().isEmpty(),
  check('item_id', 'item_id es requerido').not().isEmpty(),
  check('description', 'description es requerido').not().isEmpty(),
  check('unit_price', 'unit_price es requerido').not().isEmpty(),
  check('currency_id', 'currency_id es requerido').not().isEmpty(),
  check('quantity', 'quantity es requerido').not().isEmpty(),
  check('bookId', 'bookId es requerido').not().isEmpty(),
], async (req, res) => {
  mercadopage.configure({
    access_token: global.env.mp_api_key,
    client_secret: global.env.mp_client_id,
    client_id: global.env.mp_client_secret
  });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { item_id, title, description, unit_price, currency_id, quantity, bookId } = req.body;

  try {
    const result = await mercadopage.preferences.create({
      items: [
        {
          id: item_id,
          title: description,
          description: description,
          unit_price: unit_price,
          currency_id: currency_id,
          quantity: quantity,
          picture_url: 'http://www.trekkingbuenosaires.com/static/media/logo.dea47b25aa3249587ec6.svg'
        },
      ],
      statement_descriptor: "TrekkingBuenosAires.com",
      payment_methods: {
        installments: 1
      },
      external_reference: bookId,
      auto_return: "approved",
      //notification_url: `https://trekkingbsastest.adhentux.com/api/webhook/webhook`,
      notification_url: `https://95a7-200-127-254-34.ngrok-free.app/api/books/process-order`,
      back_urls: {
        success: `https://95a7-200-127-254-34.ngrok-free.app/booking-success`,
        failure: `https://95a7-200-127-254-34.ngrok-free.app/booking-failure`
        // success: `https://trekkingbsastest.adhentux.com/booking-success`,
        // failure: `https://trekkingbsastest.adhentux.com/booking-failure`
      },
    });

    res.status(200).send({ url_redirect: result.body.init_point });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something goes wrong" });
  }
});

const updateOrder = async (data) => {
  const {
    external_reference: bookId,
    id: _merchant_order_id,
    order_status: merchant_order_status,
    total_amount: merchant_order_total_amount,
    payer,
    payments,
  } = data;
  const payment = payments[0];
  const updatedBook = {
    bookId,
    _merchant_order_id,
    merchant_order_status,
    merchant_order_total_amount,
    _payer_id: payer?.id,
    _payment_id: payment?.id,
    payment_date_approved: payment?.date_approved,
    payment_status: payment?.status,
    payment_status_detail: payment?.status_detail,
    payment_operation_type: payment?.operation_type,
    payment_transaction_amount: payment?.transaction_amount
  };

  if ((updatedBook.merchant_order_total_amount === updatedBook.payment_transaction_amount) &&
    (updatedBook.merchant_order_status === 'paid') &&
    (updatedBook.payment_status === 'approved')
  ) {
    updatedBook['status'] = 'paid';
  }

  console.log('updateOrder: ', updatedBook);
  const book = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true });
  return book;
}

const updatePayment = async (data) => {
  const {
    external_reference: bookId,
    money_release_date: payment_money_release_date,
    payment_type,
    transaction_details: { net_received_amount }
  } = data;
  console.log(net_received_amount)
  const updatedBook = {
    bookId,
    payment_money_release_date,
    payment_type,
    payment_net_received_amount: net_received_amount
  }

  console.log('updatePayment: ', updatedBook);
  const book = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true });
  return book;
}

const incrementReservationTrip = async (id) => {
  const trip = await Trip.findByIdAndUpdate(id, { $inc: { reservations: 1 } }, { new: true });
  return trip;
}

const sendMailBookingCustomer = async (data) => {

  // esto tiene q ir contra la tabla de Customer
  const customer = await Customer.findById(data.customer);

  const link = `http://localhost:4000/customer/book-detail/${data._id}`;
  const mail = {
    from: global.env.contact_user,
    to: 'santiagomauhourat@hotmail.com',//customer.email,
    subject: `Reserva - ${data.description}`,
    text: link,
    html: `<p>Hola ${customer.first_name} gracias por elegirnos!!</p><br><p>Recibimos tu RESERVA correctamente, COD: ${data._id}</p><p><a href="${link}">Ver Detalle</a></p>`
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
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
  });

}

// @route    POST api/books/process-order
// @desc     Process Payment Order for Book
// @access   Private  
router.post('/process-order', async (req, res) => {
  // Si el pago fue exitoso, guardamos la orden de compra con el pago correspondiente asociado al usuario.
  // Decrementamos en 1 la disponibilidad del Evento
  mercadopage.configure({
    access_token: global.env.mp_api_key,
    client_secret: global.env.mp_client_id,
    client_id: global.env.mp_client_secret
  });

  const { query } = req;
  console.log('query:', query);

  const topic = query.topic || query.type;

  try {
    if (topic === "merchant_order") {
      const merchantOrderId = query.id;
      const merchantOrder = await mercadopage.merchant_orders.findById(Number(merchantOrderId));

      console.log('---------------- COMIENZO RECEPCION ORDER ----------------');
      console.log(merchantOrder);
      console.log('---------------- FIN RECEPCION ORDER ----------------');
      const book = await updateOrder(merchantOrder.body);
      if (book.status === 'paid') {
        //increment reservations
        incrementReservationTrip(book.trip);
        //send mail to customer with booking data
        sendMailBookingCustomer(book);
      }
    }
    if (topic === "payment") {
      const paymentId = query.id || query["data.id"];
      const payment = await mercadopage.payment.findById(Number(paymentId));

      console.log('---------------- COMIENZO RECEPCION PAYMENT ----------------');
      console.log(payment);
      console.log('---------------- FIN RECEPCION PAYMENT ----------------');
      await updatePayment(payment.body);
    }

    res.status(204).json({ message: "callback succefully processed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
});



module.exports = router;