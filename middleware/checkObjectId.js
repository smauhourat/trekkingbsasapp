const mongoose = require('mongoose')
// middleware to check for a valid object id
const checkObjectId = (idToCheck, inBody = false) => (req, res, next) => {
  if (!inBody) {
    if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck])) { return res.status(400).json({ msg: `Invalid ID <${idToCheck}>` }) }
  } else {
    if (!mongoose.Types.ObjectId.isValid(req.body[idToCheck])) { return res.status(400).json({ msg: `Invalid ID <${idToCheck}>` }) }
  }
  next()
}

module.exports = checkObjectId
