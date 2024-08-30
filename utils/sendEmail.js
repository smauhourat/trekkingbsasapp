const nodemailer = require("nodemailer");

module.exports = async (email, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: global.env.contact_host,
            //service: process.env.SERVICE,
            port: Number(global.env.contact_port),
            //secure: Boolean(process.env.SECURE),
            auth: {
                user: global.env.contact_user,
                pass: global.env.contact_pwd
            },
        });

        await transporter.sendMail({
            from: global.env.contact_user,
            to: email,
            subject: subject,
            text: text,
            html: html
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};