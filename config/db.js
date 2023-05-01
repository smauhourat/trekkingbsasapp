const mongoose = require('mongoose');
const config = require('config');
//const db = config.get('mongoURI')
require("dotenv").config();

const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db);

        console.log('MongoDb Connected...')
    } catch(err) {
        console.error(err);
        // Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB;