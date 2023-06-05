const moment = require('moment');
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
  [
    auth,
  ],
  async (req, res) => {

    const { userId, tripId, price } = req.body;

    try {
      let newBook = new Book({
        trip: tripId,
        user: userId,
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

module.exports = router;