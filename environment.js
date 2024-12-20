const path = require('path')
const dotenv = require('dotenv')
const envFile = process.env.NODE_ENV !== undefined ? `.env.${process.env.NODE_ENV.trim()}` : '.env'
dotenv.config({ path: path.resolve(__dirname, envFile) })
const env = process.env

const environment = {
  port: env.PORT,
  mongoUri: env.MONGO_URI,
  jwtSecret: env.JWT_SECRET,
  contact_user: env.CONTACT_USER,
  contact_to: env.CONTACT_TO,
  contact_pwd: env.CONTACT_PWD,
  contact_host: env.CONTACT_HOST,
  contact_port: env.CONTACT_PORT,
  cloudName: env.CLOUD_NAME,
  apiKey: env.API_KEY,
  apiSecret: env.API_SECRET,
  mp_api_key: env.MP_API_KEY,
  mp_client_id: env.MP_CLIENT_ID,
  mp_client_secret: env.MP_CLIENT_SECRET,
  verifyEmailSubject: env.VERIFY_EMAIL_SUBJECT,
  resetPasswordSubject: env.RESET_PASS_SUBJECT,
  bookSubject: env.BOOK_SUBJECT,
  bookWspContact: env.BOOK_WSP_CONTACT,
  bookEmailContact: env.BOOK_EMAIL_CONTACT
}

module.exports = environment
