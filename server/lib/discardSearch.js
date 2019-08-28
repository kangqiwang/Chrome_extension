const config = require('../config')

const HtmlModel = require('se-app-model').model.html
const Html = new HtmlModel(config.mongoDb);
const JobModel = require('se-app-model').model.job
const job = new JobModel(config.mongoDb);


module.exports = (payload, next) => {

    Html.discardSearch({jobId:payload.jobId}, (err, data) => {
        next(err, data);
    })
    job.delById(payload.jobId,(err,data)=>{
        if(err){
            console.log(err)
        }
    })
    
    
}