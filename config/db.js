const mongoose = require('mongoose');
const logger = require('../utils/logger');
db = global.env.mongoUri;
const db_name = db.substring(db.indexOf('/', 14) + 1, db.indexOf('?'));

const connectDB = async () => {
    try {
        await mongoose.connect(db);

        console.log(`MongoDb Connected....${db_name} - (${db})`)
        logger.info(`MongoDb Connected....${db_name}`)
    } catch (err) {
        console.error(err);
        // Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB;