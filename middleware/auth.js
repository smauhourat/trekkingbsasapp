const jwt = require('jsonwebtoken');
//const config = require('config');
const environment = require('../config/environment');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token from header
    if(!token) {
        return res.status(401).json({ msg: 'Token not found'});
    }

    // Verify token from header
    try {
        //const decodedToken = jwt.verify(token, config.get('jwtSecret'));
        const decodedToken = jwt.verify(token, environment.jwtSecret);

        req.user = decodedToken.user;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token not valid'});
    } 

}