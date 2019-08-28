const config = require('../config')

const Mongo = require('x4-model').mongo
const MDB = new Mongo(config.mongoDb)

module.exports = (payload, next) => {
    MDB.conn("users", (err, collection) => {
        if (err) {
            next(err)
        } else {
            collection.findOne({ chromeKey: payload },(err, data) => {
                if (err) {
                    console.log(err)
                }
                    next(err,data)
            })
        }
    })
}