const config = require('../config');
const Mongo = require('x4-model').mongo
const MDB = new Mongo(config.mongoDbBackend)

const SupplierModel = require('se-app-model').model.supplier
let lookup = {
    uk: {},
    us: {}
}

module.exports =  {

    generate(done) {
        var Supplier = new SupplierModel(config.mongoDb, {
            country: 'uk'
        })
    
        Supplier.generateDomainLookup((err, ukSupplierLookup) => {
            if(err) {
                done(err)
            } else {
                lookup.uk = ukSupplierLookup
                var Supplier = new SupplierModel(config.mongoDb, {
                    country: 'us'
                })
                Supplier.generateDomainLookup((err, usSupplierLookup) => {
                    if(err) {
                        done(err)
                    } else {
                        lookup.us = usSupplierLookup
                        done(null)
                    }
                })
            }
        })
    },

    getId(payload) {
        if(lookup[payload.country] && lookup[payload.country][payload.domain]) {
            return lookup[payload.country][payload.domain]
        } else {
            return false
        }
    }
    
    
}