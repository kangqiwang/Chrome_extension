const config = require('../config')
const Mongo = require('x4-model').mongo
const MDB = new Mongo(config.mongoDbBackend)

module.exports = (next) => {
    MDB.conn("uksuppliers", (err, collection) => {
        if (err) {
            next(err)
        } else {
            collection.find({ lazyloading: true }, { domain: 1 }).toArray((err, data) => {
                if (err) {
                    next(err)
                } else {
                    data = data.map(element => element.domain)
                    next(null, data)
                }
            })
        }
    })
}