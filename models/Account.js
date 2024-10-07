const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new mongoose.Schema({

    bank: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        default: '($) ARS',
        required: true
    },
    account_type: {
        type: String,
        required: true
    },
    account_number: {
        type: String,
        required: true
    },
    account_cbu: {
        type: String,
        required: true
    },
    account_alias: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }


}, { timestamps: true });

module.exports = mongoose.model('account', AccountSchema);    