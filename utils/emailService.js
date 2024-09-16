const transporter = require('../config/mailer');

const sendEmail = async (to, subject, text, html) => {
 
  try {
    const info = transporter.sendEmail(to, subject, text, html)
    console.log('Email sent: %s', info.messageId)
    return info
  } catch (err) {
    console.error('Error sending email:', error)
    throw error
  }
}

module.exports = { sendEmail }
