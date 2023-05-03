const nodemailer = require('nodemailer');
//const config = require('config');
//const environment = require('./environment');

const transporter = nodemailer.createTransport({
    host: global.env.contact_host,
    port: global.env.contact_port,
    auth: {
        user: global.env.contact_user,
        pass: global.env.contact_pwd
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