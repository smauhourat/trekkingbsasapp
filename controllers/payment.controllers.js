const mercadopage = require("mercadopago");
const { validationResult } = require('express-validator');

// Creamos el link de pago de MP
const createOrder = async (req, res) => {
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
            notification_url: `https://3247-201-213-113-23.ngrok-free.app/api/payments/webhook`,
            back_urls: {
                success: `https://3247-201-213-113-23.ngrok-free.app/booking-success`,
                failure: `https://3247-201-213-113-23.ngrok-free.app/booking-failure`
            },
        });

        res.status(200).send({ url_redirect: result.body.init_point });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

// Recibimos las respuestas de MP
const receiveWebhook = async (req, res) => {
    // Si el pago fue exitoso, guardamos la orden de compra con el pago correspondiente asociado al usuario.
    // Decrementamos en 1 la disponibilidad del Evento
    mercadopage.configure({
        access_token: global.env.mp_api_key,
        client_secret: global.env.mp_client_id,
        client_id: global.env.mp_client_secret
    });

    const { query } = req;
    console.log(query)

    const topic = query.topic || query.type;

    try {
        if (topic === "payment") {
            const paymentId = query.id || query["data.id"];
            const payment = await mercadopage.payment.findById(Number(paymentId));
            const paymentStatus = payment.body.status;
            const bookId = payment.body.external_reference;

            console.log('---------------- COMIENZO RECEPCION PAYMENT ----------------');
            console.log([payment, paymentStatus]);
            console.log('---------------- FIN RECEPCION PAYMENT ----------------');
        }
        if (topic === "merchant_order") {
            const merchantOrderId = query.id;
            const merchantOrder = await mercadopage.merchant_orders.findById(Number(merchantOrderId));
            const merchantOrderStatus = merchantOrder.order_status;

            console.log('---------------- COMIENZO RECEPCION ORDER ----------------');
            console.log([merchantOrder, merchantOrderStatus]);
            console.log('---------------- FIN RECEPCION ORDER ----------------');            
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }

    // try {
    //     const payment = req.query;
    //     console.log('PAYMENT IN QUERY HOOK', JSON.stringify(payment));
    //     if (payment.type === "payment") {
    //         const data = await mercadopage.payment.findById(payment["data.id"]);
    //         console.log('PAYMENT IN MP', JSON.stringify(data));
    //     }

    //     res.sendStatus(204);
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({ message: "Something goes wrong" });
    // }
};

const successWebhook = async (req, res) => {
    console.log('SUCCESS', req);
    res.sendStatus(200);
}

const failureWebhook = async (req, res) => {
    console.log('FAILURE', req);
    res.sendStatus(200);
}

module.exports = {
    createOrder,
    receiveWebhook,
    successWebhook,
    failureWebhook
}