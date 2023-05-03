require('dotenv').config();
//require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
//require('dotenv').config('.env.test');

console.log(process.env);

class Environment {
  constructor() {
    this._env = process.env;
  }

  get port() {
    return this._env.PORT || 5000;
  }

  get mongoUri() {
    return this._env.MONGO_URI;
  }

  get jwtSecret() {
    return this._env.JWT_SECRET;
  }
 
  get contact_user() {
    return this._env.CONTACT_USER;
  }

  get contact_to() {
    return this._env.CONTACT_TO;
  }

  get contact_pwd() {
    return this._env.CONTACT_PWD;
  }

  get contact_host() {
    return this._env.CONTACT_HOST;
  }

  get contact_port() {
    return this._env.CONTACT_PORT;
  }
  
  get cloudName() {
    return this._env.CLOUD_NAME;
  }

  get apiKey() {
    return this._env.API_KEY;
  }

  get apiSecret() {
    return this._env.API_SECRET;
  }
}

module.exports = new Environment();
