
const md5 = require('md5')
const refreshId = md5(new Date().toISOString())
const sendToProduct = require('./sendToProduct')
module.exports = (payload, next) => {
    payload.map((p) => {

        p.refreshId = refreshId
        
        sendToProduct("DATA", p,'product', (err, resp) => {
            if (err) {
                console.error(err)
            } else {
            }
        })
    })
}