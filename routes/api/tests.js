const express = require('express');
const router = express.Router();
const { sendEmail } = require('../../utils/emailService')

router.get('/', async (req, res) => {
  const hostname = req.headers.host; // Get the hostname
  const origin = req.headers; // Get the origin
  const protocol = req.headers['x-forwarded-proto']
  const host = req.headers['x-forwarded-host']

  // console.log(req)

  res.json({
    hostname: hostname,
    origin: origin,
    protocol: protocol,
    host: host
  })

  const mail = {
    from: global.env.contact_user,
    to: 'santiagomauhourat@hotmail.com', //user.email,
    subject: `Reserva AAAA`,
    text: "boolDetailslink",
    html: `<p>Hola Santiago gracias por elegirnos!!</p><br><p>Recibimos tu RESERVA correctamente, COD: AAAA</p><p><a href="http://www.google.com">Ver Detalle</a></p>`
  }

  console.log(mail)

  // try {
  //   // await sendEmail(mail)
  //   return ({
  //     status: 'success',
  //     message: 'El mail ha sido enviado con exito'
  //   })
  // } catch (err) {
  //   return ({
  //     status: 'fail',
  //     message: 'Error enviando el mail'
  //   })
  // }

}) 

module.exports = router