const mongoose = require('mongoose')
const Token = require('../models/Token')
const sendEmail = require("./sendEmail")
const crypto = require('crypto')
const logger = require('./logger')
const Customer = require('../models/Customer')
const User = require('../models/User')

const sendEmailVerification = async (req, user, customer) => {

  // Eliminamos todos los Token del mismo tipo para el mismo usuario
  await Token.deleteMany({
    userId: user._id,
    tokenType: "email-verification"
  })

  // Generamos el token para la verificacion del mail del usuario
  const token = await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString('hex'),
    tokenType: "email-verification"
  }).save()

  // Enviamos el mail con el link para la verficacion de mail del customer
  const subject = global.env.verifyEmailSubject
  const requestedUrl = req.headers['client-base-url']
  const link = `${requestedUrl}/verify-email/${user._id}/${token.token}`
  const text = link

  const html = `<!DOCTYPE html>
                      <html lang="es">

                      <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                      </head>

                      <body>

                        <table width="600" style="border:'1px'; text-align:'center;'" align="center" cellpadding="0" cellspacing="0"
                          style="font-family: Raleway, Helvetica, sans-serif;">
                          <tr>
                            <td bgcolor="#FAFAFA" width="650"
                              style="color:#666; text-align:center; font-size:13px;font-family:Raleway, Helvetica, sans-serif; padding:30px 50px 20px 50px;line-height:14px; border-radius:0 0 0 0 ;">
                              <img src="${requestedUrl}/logo192.png" alt="logo argentinoscaminando"/>
                              <p style="font-size:16px; font-weight:600; color:#78777a; line-height: 1.6;">Hola <b>${user.name}</b> gracias
                                por elegirnos!!</p>
                              <p style="font-size:14px; font-weight:550; color:#78777a;line-height: 1.6;">Recibimos tu datos de registro
                                correctamente, por
                                favor confirma el email haciendo click en el siguiente enlace</p>
                              <p><a href="${link}">VALIDAR EMAIL</a></p>
                            </td>
                          </tr>
                        </table>
                      </body>
                      </html>`

  await sendEmail(user.email, subject, text, html)
}

const sendBookingCustomerMail = async (baseUrl, book) => {
  const customer = await Customer.findById(book.customer)
  const user = await User.findById(book.customer)

  const boolDetailslink = `${baseUrl}/booking-success/${book._id}`
  const accontsText = reservation.accounts.length > 0 ? "realizá la Transferencia o Depósito en alguna de las siguientes cuentas" : "ponete por favor en contacto con el mail o el telefono suministrado mas abajo."

  const accountsHtml = book.accounts.map((account) => {
    return (
      "<p><strong>" + account.bank + "</strong></p>" +
      "<p>" + account.account_type + " - " + account.currency + " Nro " + account.account_number + "</p>" +
      "<p>CBU: <strong>" + account.account_cbu + "</strong></p>" +
      "<p>Razon Social: <strong>" + account.account_holder + "</strong></p>" +
      "<p>CUIT: <strong>" + account.account_cuit + "</strong></p>" +
      "<p>Alias: <strong>" + (account.account_alias !== undefined ? account.account_alias : "-") + "</strong></p>" +
      "<br>"
    )
  })

  const subject = `${global.env.bookSubject} - ${book.code}  - ${book.description}`
  const html = `<!DOCTYPE html>
                  <html lang="es">

                  <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                  </head>

                  <body>

                    <table width="600" style="border:'1px'; text-align:'center;'" align="center" cellpadding="0" cellspacing="0"
                      style="font-family: Raleway, Helvetica, sans-serif;">
                      <tr>
                        <td bgcolor="#FAFAFA" width="650"
                          style="color:#666; text-align:center; font-size:13px;font-family:Raleway, Helvetica, sans-serif; padding:30px 50px 20px 50px;line-height:14px; border-radius:0 0 0 0 ;">
                          <img src="${baseUrl}/logo192.png" alt="logo argentinoscaminando"/>
                          <p style="font-size:16px; font-weight:600; color:#78777a; line-height: 1.6;">Hola <b>${customer.first_name}</b> gracias
                            por elegirnos!!</p>
                          <p style="font-size:14px; font-weight:550; color:#78777a;line-height: 1.6;">Recibimos tu RESERVA correctamente
                          </p>
                          <p><a href="${boolDetailslink}">Ver Detalle</a></p>
                          <p>Para completar el proceso, ${accontsText}</p>
                          <br>
                          ${accountsHtml}
                          <br>
                          <p>Por favor ingresá el nro de transaccion <a href="${boolDetailslink}">aqui</a> o bien envianos un mail con el
                            comprobante a ${global.env.bookEmailContact}</p>, o escribenos al WhatsApp <a href="https://api.whatsapp.com/send?phone=${global.env.bookWspContact}&text=Hola%20ArgentinosCaminando,%20tengo%20una%20consulta%21%20Podes%20ayudarme?">${global.env.bookWspContact}</a>
                          <br>
                          <p>Muchas Gracias</p>                          <br>
                          <p>Si no funcionan los links de forma directa, podes copiar el siguiente link y pegarlo en tu navegador: <strong> ${boolDetailslink}</strong></p>
                        </td>
                      </tr>
                    </table>
                  </body>
                  </html>`

  await sendEmail(user.email, subject, boolDetailslink, html)

  logger.info(`Send Booking <${book.code}> by Email to User <${user.email}>`)
}

const sendReservationCustomerMail = async (baseUrl, reservation) => {

  // console.log('reservation =>', reservation)
  const reservationDetailslink = `${baseUrl}/reservation-success/${reservation._id}`
  const accontsText = reservation.accounts.length > 0 ? "realizá la Transferencia o Depósito en alguna de las siguientes cuentas" : "ponete por favor en contacto con el mail o el telefono suministrado mas abajo."
  const accountsHtml = reservation.accounts.map((account) => {
    return (
      "<p><strong>" + account.bank + "</strong></p>" +
      "<p>" + account.account_type + " - " + account.currency + " Nro " + account.account_number + "</p>" +
      "<p>CBU: <strong>" + account.account_cbu + "</strong></p>" +
      "<p>Razon Social: <strong>" + account.account_holder + "</strong></p>" +
      "<p>CUIT: <strong>" + account.account_cuit + "</strong></p>" +
      "<p>Alias: <strong>" + (account.account_alias !== undefined ? account.account_alias : "-") + "</strong></p>" +
      "<br>"
    )
  })

  const subject = `${global.env.bookSubject} - ${reservation.code}  - ${reservation.description}`
  const html = `<!DOCTYPE html>
                  <html lang="es">

                  <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                  </head>

                  <body>

                    <table width="600" style="border:'1px'; text-align:'center;'" align="center" cellpadding="0" cellspacing="0"
                      style="font-family: Raleway, Helvetica, sans-serif;">
                      <tr>
                        <td bgcolor="#FAFAFA" width="650"
                          style="color:#666; text-align:center; font-size:13px;font-family:Raleway, Helvetica, sans-serif; padding:30px 50px 20px 50px;line-height:14px; border-radius:0 0 0 0 ;">
                          <img src="${baseUrl}/logo192.png" alt="logo argentinoscaminando"/>
                          <p style="font-size:16px; font-weight:600; color:#78777a; line-height: 1.6;">Hola <b>${reservation.customer.first_name}</b> gracias
                            por elegirnos!!</p>
                          <p style="font-size:14px; font-weight:550; color:#78777a;line-height: 1.6;">Recibimos tu RESERVA correctamente
                          </p>
                          <p><a href="${reservationDetailslink}">Ver Detalle</a></p>
                          <p>Para completar el proceso, ${accontsText}</p>
                          <br>
                          ${accountsHtml}
                          <br>
                          <p>Por favor ingresá el nro de transaccion <a href="${reservationDetailslink}">aqui</a> o bien envianos un mail con el
                            comprobante a ${global.env.bookEmailContact}</p>, o escribenos al WhatsApp <a href="https://api.whatsapp.com/send?phone=${global.env.bookWspContact}&text=Hola%20ArgentinosCaminando,%20tengo%20una%20consulta%21%20Podes%20ayudarme?">${global.env.bookWspContact}</a>
                          <br>
                          <p>Muchas Gracias</p>                          <br>
                          <p>Si no funcionan los links de forma directa, podes copiar el siguiente link y pegarlo en tu navegador: <strong> ${reservationDetailslink}</strong></p>
                        </td>
                      </tr>
                    </table>
                  </body>
                  </html>`

  await sendEmail(reservation.customer.email, subject, reservationDetailslink, html)

  logger.info(`Send Booking <${reservation.code}> by Email to User <${reservation.customer.email}>`)

}

module.exports = { sendEmailVerification, sendBookingCustomerMail, sendReservationCustomerMail }