const mongoose = require('mongoose');
db = global.env.mongoUri;
const db_name = console.log(db.substring(db.indexOf('/', 14)+1, db.indexOf('?')));

const connectDB = async () => {
    try {
        await mongoose.connect(db);

        console.log(`MongoDb Connected...`)
    } catch (err) {
        console.error(err);
        // Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB;