const nodemailer = require('nodemailer');
//const config = require('config');
const environment = require('./environment');

const transporter = nodemailer.createTransport({
    host: environment.contact_host, // config.get('contact_host'),
    port: environment.contact_port, // config.get('contact_port'),
    auth: {
        user: environment.contact_user, // config.get('contact_user'),
        pass: environment.contact_pwd // config.get("contact_pwd")
    }
});

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our email messages");
    }
});

module.exports = transporter;