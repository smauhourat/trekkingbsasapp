const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
    createOrder,
    receiveWebhook,
    successWebhook,
    failureWebhook,
} = require("../../controllers/payment.controllers");




router.post('/create-order', createOrder);
router.post("/webhook", receiveWebhook);
router.post("/failure", failureWebhook);
router.get("/success", successWebhook);
router.get("/pending", (req, res) => res.send("Pending"));

module.exports = router;