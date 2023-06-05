const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');

const {
    createOrder,
    receiveWebhook,
    successWebhook,
    failureWebhook,
} = require("../../controllers/payment.controllers");

router.post('/create-order', [
    check('title', 'title es requerido').not().isEmpty(),
    check('item_id', 'item_id es requerido').not().isEmpty(),
    check('description', 'description es requerido').not().isEmpty(),
    check('unit_price', 'unit_price es requerido').not().isEmpty(),
    check('currency_id', 'currency_id es requerido').not().isEmpty(),
    check('quantity', 'quantity es requerido').not().isEmpty(),
    check('bookId', 'bookId es requerido').not().isEmpty(),
], createOrder);
router.post("/webhook", receiveWebhook);
router.post("/failure", failureWebhook);
router.get("/success", successWebhook);
router.get("/pending", (req, res) => res.send("Pending"));

module.exports = router;