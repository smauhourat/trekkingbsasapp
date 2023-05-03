const path = require('path');
const dotenv = require('dotenv');
const env_file = process.env.NODE_ENV !== undefined ? `.env.${process.env.NODE_ENV.trim()}` : '.env';
dotenv.config({ path: path.resolve(__dirname, env_file) })
const env = process.env;

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
  apiSecret: env.API_SECRET
}

module.exports = environment;
