//https://www.mercadopago.com.ar/developers/es/reference/payments/_payments_id/get
//https://www.mercadopago.com.ar/developers/es/reference/merchant_orders/_merchant_orders_id/get
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new mongoose.Schema({

    trip: {
        type: Schema.Types.ObjectId,
        ref: 'trip'
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        default: 'pending'
    },

    _payment_id: {
        type: Number
    },

    payment_date_approved: {
        type: Date
    },

    // SOLO VIENE EN EL OBJETO PAYMENT
    payment_net_received_amount: {
        type: Number
    },

    // SOLO VIENE EN EL OBJETO PAYMENT
    payment_money_release_date: {
        type: Date
    },

    // SOLO VIENE EN EL OBJETO PAYMENT
    payment_type: {
        type: String
    },
    /*
    Es el tipo de método de pago (tarjeta, transferencia bancaria, ticket, ATM, etc.). Puede ser de los siguientes tipos.
    account_money: Money in the Mercado Pago account.
    ticket: Boletos, Caixa Electronica Payment, PayCash and Oxxo, etc.
    bank_transfer: Bank transfer (pix).
    atm: ATM payment (widely used in Mexico through BBVA Bancomer).
    credit_card: Payment by credit card.
    debit_card: Payment by debit card.
    prepaid_card: Payment by prepaid card.
    digital_currency: Purchases with Mercado Crédito.
    digital_wallet: Paypal.
    voucher_card: Alelo benefits, Sodexo.
    crypto_transfer: Payment with cryptocurrencies such as Ethereum and Bitcoin.    
    */

    payment_status: {
        type: String
    },
    /*
    Es el estado actual del pago. Puede ser de los siguientes tipos.
    pending: The user has not concluded the payment process (for example, by generating a payment by boleto, it will be concluded at the moment in which the user makes the payment in the selected place).
    approved: The payment has been approved and credited.
    authorized: The payment has been authorized but not captured yet.
    in_process: The payment is in analysis.
    in_mediation: The user started a dispute.
    rejected: The payment was rejected (the user can try to pay again).
    cancelled: Either the payment was canceled by one of the parties or expired.
    refunded: The payment was returned to the user.
    charged_back: A chargeback was placed on the buyer's credit card.    
    */

    payment_status_detail: {
        type: String
    },
    /*
    Detalle en el que resultó el Cobro
    Accredited: credited payment.
    pending_contingency: the payment is being processed.
    pending_review_manual: the payment is under review to determine its approval or rejection.
    cc_rejected_bad_filled_date: incorrect expiration date.
    cc_rejected_bad_filled_other: incorrect card details.
    cc_rejected_bad_filled_security_code: incorrect CVV.
    cc_rejected_blacklist: the card is on a black list for theft/complaints/fraud.
    cc_rejected_call_for_authorize: the means of payment requires prior authorization of the amount of the operation.
    cc_rejected_card_disabled: the card is inactive.
    cc_rejected_duplicated_payment: transacción duplicada.
    cc_rejected_high_risk: rechazo por Prevención de Fraude.
    cc_rejected_insufficient_amount: insufficient amount.
    cc_rejected_invalid_installments: invalid number of installments.
    cc_rejected_max_attempts: exceeded maximum number of attempts.
    cc_rejected_other_reason: generic error.    
    */

    payment_operation_type: {
        type: String
    },
    /*
    Es el tipo de pago. Los tipos disponibles son los siguientes.
    investment: When money is put into an investment, such as CDB, in the Mercado Pago application;
    regular_payment: Typification by default of a purchase being paid using Mercado Pago.
    money_transfer: Funds transfer between two users.
    recurring_payment: Automatic recurring payment due to an active user subscription.
    account_fund: Money income in the user's account.
    payment_addition: Addition of money to an existing payment, made through a Mercado Pago account.
    cellphone_recharge: Recharge of a user's cellphone account.
    pos_payment: Payment done through a Point of Sale.
    money_exchange: Payment to exchange currency for a user.
    */

    //es igual a price
    payment_transaction_amount: {
        type: Number
    },

    _merchant_order_id: {
        type: Number
    },

    merchant_order_status: {
        type: String
    },
    /*
    opened: Order without payments.
    closed: Order with payments covering total amount.
    expired: Canceled order that does not have approved or pending payments (all rejected or returned).    
    */

    merchant_order_total_amount: {
        type: Number
    },

    _payer_id: {
        type: String
    }

});

module.exports = mongoose.model('book', BookSchema);