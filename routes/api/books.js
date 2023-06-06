const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');
const Book = require('../../models/Book');

// @route   POST api/books
// @desc    Add Book
// @access  Private
router.post('/',
  [auth],
  async (req, res) => {

    const { user, trip, price } = req.body;

    try {
      let newBook = new Book({
        trip: trip,
        user: user,
        price,
      });

      const book = await newBook.save();
      res.json(book);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }

  }
);

// @route    GET api/books/?q&limit&page&sort
// @desc     Get Books by query
// @access   Private
router.get('/',
  [auth],
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
      const user = req.query.user ? req.query.user : "";


      let db_query = {};
      if (trip !== "")
        db_query = { ...db_query, trip: mongoose.Types.ObjectId(trip) }
      if (user !== "")
        db_query = { ...db_query, user: mongoose.Types.ObjectId(user) }

      const totalItems = await Book
        .find(db_query)
        .countDocuments();

      const books = await Book
        .find(db_query)
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
// @desc     Get book by ID
// @access   Private
router.get('/:id',
  [auth],
  checkObjectId('id'),
  async (req, res) => {

    try {
      const book = await Book.findById(req.params.id);

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
// @desc     Update status book
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
// @desc     Delete a book
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

      if (book.status !== "pending") {
        return res.status(400).json({ msg: 'La Reserva no puede ser eliminada' });
      }

      await book.remove();

      res.json({ msg: 'Reserva eliminada' });
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  });

module.exports = router;