const config = require('../config')
const Q = require('x4-q').q

module.exports = (type, message, next) => {

    const qProcess = new Q({}, 'sm-stock-crawler')
    qProcess.send(type, message, (err, resp) => {
        next(err)
    })

};
