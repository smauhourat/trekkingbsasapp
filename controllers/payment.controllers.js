const mercadopage = require("mercadopago");

// Creamos el link de pago de MP
const createOrder = async (req, res) => {
    mercadopage.configure({
        access_token: global.env.mp_api_key,
        client_secret: global.env.mp_client_id,
        client_id: global.env.mp_client_secret
    });

    const { userId, item_id, title, unit_price, currency_id, quantity } = req.body;

    try {
        const result = await mercadopage.preferences.create({
            items: [
                {
                    id: item_id,
                    title: title,
                    unit_price: unit_price,
                    currency_id: currency_id,
                    quantity: quantity,
                },
            ],
            statement_descriptor: "TrekkingBuenosAires.com",
            payment_methods: {
                installments: 1
            },
            auto_return: "approved",
            notification_url: `https://846c-190-104-238-200.ngrok-free.app/api/payments/webhook?userId=${userId}&productId=${item_id}`,
            back_urls: {
                success: `https://846c-190-104-238-200.ngrok-free.app/api/payments/success/?productId=${item_id}`,
                failure: `https://846c-190-104-238-200.ngrok-free.app/api/payments/failure/?productId=${item_id}`,
                pending: `https://846c-190-104-238-200.ngrok-free.app/api/payments/pending/?productId=${item_id}`,
            },
        });

        console.log(JSON.stringify(result));
        console.log(result);
        // res.json({ message: "Payment creted" });
        res.json(result.body);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

// Recibimos las respuestas de MP
const receiveWebhook = async (req, res) => {
    // Si el pago fue exitoso, guardamos la orden de compra con el pago correspondiente asociado al usuario.
    // Decrementamos en 1 la disponibilidad del Evento

    try {
        const payment = req.query;
        console.log('PAYMENT IN QUERY HOOK', JSON.stringify(payment));
        if (payment.type === "payment") {
            const data = await mercadopage.payment.findById(payment["data.id"]);
            console.log('PAYMENT IN MP', JSON.stringify(data));
        }

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
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