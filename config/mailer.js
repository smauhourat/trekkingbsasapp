const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport({
    host: config.get('contact_host'), //replace with your email provider
    port: config.get('contact_port'), //replace with your
    auth: {
        user: config.get('contact_user'), //process.env.EMAIL,
        pass: config.get("contact_pwd") //process.env.PASSWORD
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