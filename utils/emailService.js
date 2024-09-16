const transporter = require('../config/mailer');

const sendEmail = async (from, to, subject, text, html) => {

  try {
    const info = transporter.sendMail({ from, to, subject, text, html })
    console.log('Email sent: %s', info.messageId)
    return info
  } catch (err) {
    console.error('Error sending email:', err)
    throw err
  }
}

module.exports = { sendEmail }
