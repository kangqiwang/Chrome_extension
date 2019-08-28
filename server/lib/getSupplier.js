const config = require('../config')
const Mongo = require('x4-model').mongo
const MDB = new Mongo(config.mongoDbBackend)

module.exports = (country, next) => {
    if (country.length) {
        if(country.length >=2){
            country ="uk"
        }else{
            country = country[0]
        }
        MDB.conn(country+"suppliers", (err, collection) => {
            if (err) {
                next(err)
            } else {
                collection.find({ live: true }, { domain: 1 }).toArray((err, data) => {
                    if (err) {
                        next(err)
                    } else {
                        data = data.map(element => element.domain)
                        next(null, data)
                    }
                })
            }
        })

    }else{
        next("USER RECORD NO COUNTRY")
    }
}