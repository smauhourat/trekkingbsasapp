const sequenceNumber = require('./sequenceNumber')
const fillWithZeros = require('./fillWithZeros')

module.exports = async () => {
    const bookCode = "RES-" + fillWithZeros(await sequenceNumber('books'), 8)
    return bookCode
}