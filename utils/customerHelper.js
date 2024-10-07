const mongoose = require('mongoose')
const Token = require('../models/Token')
const sendEmail = require("./sendEmail")
const crypto = require('crypto')

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
                              <img src="https://argentinoscaminando.com/static/media/logo.dea47b25aa3249587ec6.svg" />
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

module.exports = { sendEmailVerification }