const mongoose = require('mongoose');
const Counter = require('../models/Counter');

module.exports = async (sequenceName) => {

    const sequenceDocument = await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.seq;
}


