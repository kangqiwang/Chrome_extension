var getSpecialdomain = require('./getSpecialDomain')
const config = require('../config')
const Mongo = require('x4-model').mongo
const MDB = new Mongo(config.mongoDbBackend)

module.exports = (next) => {
    MDB.conn("uksuppliers", (err, collection) => {
        if (err) {
            next(err)
        } else {
            collection.find({ chromeSpecial: true }, { domain: 1 }).toArray((err, data) => {
                if (err) {
                    next(err)
                } else {
                    data = data.map(element => element.domain)
                    MDB.conn("ussuppliers", (err, collection) => {
                        if (err) {
                            next(err)
                        } else {
                            collection.find({ chromeSpecial: true }, { domain: 1 }).toArray((err, data1) => {
                                if (err) {
                                    next(err)
                                } else {
                                    data.concat(data1.map(element => element.domain))
                                    next(null, data)
                                }
                            })

                        }
                    })
                }
            })
        }
    })
}