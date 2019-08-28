const JobModel = require('se-app-model').model.job;
const config = require('../config');
const Job = new JobModel(config.mongoDb);
const decrpt=require('./decrypt')
module.exports = (data, next) => {
    decrpt(data.userId,(err,result)=>{
        if(err){
            console.log("THERE ARE SOME ERROR FROM CREATE USERID")
            next(err)
        }
        Job.saveSupplierSearch({
            country: data.country,
            suppliers: [{
                //id: data.searchId.toString(),
                domain: data.domain,
                name: data.formSearchName,
                periodCoverage: null
            }],
            selectedPeriod: undefined,
            options: { shippingFee: 0, coupon: data.voucher },
            userName: data.username,
            userId: result,
            supplierId: data.supplierId,
            supplierName: data.formSearchName,
            domain: data.domain,
            chromeSearch : true
        }, (err, newJob) => {
            next(err, newJob)
        })
    
    })

}

