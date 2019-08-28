const config = require('../config')

const JobModel = require('se-app-model').model.job
const decrypt = require('./decrypt')
const job = new JobModel(config.mongoDb);
const sendToProduct = require('./sendToProduct')

module.exports = (payload, next) => {
            var p = {
                jobId: payload.jobId,
                userId: payload.userId,
                chromeKey: payload.userId
            }

            sendToProduct("CHROME_SEARCH", p, 'sm-monitor-user', (err, resp) => {
                if (err) {
                    console.log(err)
                } else {
                    var data = {
                        "status": "IN_PROGRESS",
                        "page": payload.page,
                        "product": payload.product,
                        "totalScanned" : payload.product,
                        "chromeSearch" : true
                    }
                    job._updateStatus(payload.jobId, data, (err) => {
                        if (err) {
                            console.log(err)
                            next(err)
                        }
                        next(null, payload)

                    })
                }
            })


}

