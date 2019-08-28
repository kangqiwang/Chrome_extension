const config = require('../config')

const HtmlModel = require('se-app-model').model.html
const Html = new HtmlModel(config.mongoDb);
var jobSupplierSearch = require('./JobSupplierSearch')
const lookup = require('./domainLookup')

module.exports = (payload, next) => {


    // if (payload.userId.country.length === 2) {
    //     countryU = 'uk'
    // } else {
    //     countryU = payload.userId.country
    // }

    var data ={
        formSearchName: payload.formSearchName,
        voucher: payload.formVoucher,
        userId: payload.userId.id,
        username: payload.userId.username,
        country :payload.userId.country,
        supplierId: lookup.getId({
            country:payload.userId.country,
            domain:payload.domain
        }).toString(),
        domain: payload.domain,
    }
    jobSupplierSearch(data, (err, newJob) => {
        if (err) {
            console.log(err)
        } else {
            
            data.jobId = newJob.jobId.toString()
            next(null,data)
            
            
        
            // Html.createNewSearch(data, (err, newdata) => {
            //     if(err){
            //         console.log(err)
            //     }else{
            //         
            //     }
            // })
            
        }

    })


}