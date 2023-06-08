const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const mercadopage = require("mercadopago");

// router.post('/create-order', [
//     check('title', 'title es requerido').not().isEmpty(),
//     check('item_id', 'item_id es requerido').not().isEmpty(),
//     check('description', 'description es requerido').not().isEmpty(),
//     check('unit_price', 'unit_price es requerido').not().isEmpty(),
//     check('currency_id', 'currency_id es requerido').not().isEmpty(),
//     check('quantity', 'quantity es requerido').not().isEmpty(),
//     check('bookId', 'bookId es requerido').not().isEmpty(),
// ], async (req, res) => {
//     mercadopage.configure({
//         access_token: global.env.mp_api_key,
//         client_secret: global.env.mp_client_id,
//         client_id: global.env.mp_client_secret
//     });

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { item_id, title, description, unit_price, currency_id, quantity, bookId } = req.body;

//     try {
//         const result = await mercadopage.preferences.create({
//             items: [
//                 {
//                     id: item_id,
//                     title: description,
//                     description: description,
//                     unit_price: unit_price,
//                     currency_id: currency_id,
//                     quantity: quantity,
//                     picture_url: 'http://www.trekkingbuenosaires.com/static/media/logo.dea47b25aa3249587ec6.svg'
//                 },
//             ],
//             statement_descriptor: "TrekkingBuenosAires.com",
//             payment_methods: {
//                 installments: 1
//             },
//             external_reference: bookId,
//             auto_return: "approved",
//             //notification_url: `https://trekkingbsastest.adhentux.com/api/webhook/webhook`,
//             notification_url: `https://a46c-201-213-113-23.ngrok-free.app/api/books/webhook`,
//             back_urls: {
//                 success: `https://a46c-201-213-113-23.ngrok-free.app/booking-success`,
//                 failure: `https://a46c-201-213-113-23.ngrok-free.app/booking-failure`
//                 // success: `https://trekkingbsastest.adhentux.com/booking-success`,
//                 // failure: `https://trekkingbsastest.adhentux.com/booking-failure`
//             },
//         });

//         res.status(200).send({ url_redirect: result.body.init_point });
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Something goes wrong" });
//     }
// });

// router.post("/webhook", async (req, res) => {
//     // Si el pago fue exitoso, guardamos la orden de compra con el pago correspondiente asociado al usuario.
//     // Decrementamos en 1 la disponibilidad del Evento
//     mercadopage.configure({
//         access_token: global.env.mp_api_key,
//         client_secret: global.env.mp_client_id,
//         client_id: global.env.mp_client_secret
//     });

//     const { query } = req;
//     console.log(query)

//     const topic = query.topic || query.type;

//     try {
//         if (topic === "payment") {
//             const paymentId = query.id || query["data.id"];
//             const payment = await mercadopage.payment.findById(Number(paymentId));
//             const paymentStatus = payment.body.status;
//             const bookId = payment.body.external_reference;

//             console.log('---------------- COMIENZO RECEPCION PAYMENT ----------------');
//             console.log([payment, paymentStatus]);
//             console.log('---------------- FIN RECEPCION PAYMENT ----------------');
//         }
//         if (topic === "merchant_order") {
//             const merchantOrderId = query.id;
//             const merchantOrder = await mercadopage.merchant_orders.findById(Number(merchantOrderId));
//             const merchantOrderStatus = merchantOrder.body.order_status;

//             console.log('---------------- COMIENZO RECEPCION ORDER ----------------');
//             console.log([merchantOrder, merchantOrderStatus]);
//             console.log('---------------- FIN RECEPCION ORDER ----------------');
//         }
//         res.status(204).json({ message: "callback succefully processed" });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Something goes wrong" });
//     }
// });

//router.get("/pending", (req, res) => res.send("Pending"));

module.exports = router;