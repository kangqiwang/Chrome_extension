const config = require('../config')
const Q = require('x4-q').q

module.exports = (type, message,qName, next) => {
    const qProcess = new Q({}, qName)
    qProcess.send(type, message, (err, resp) => {
        next(err, resp)
    })

};