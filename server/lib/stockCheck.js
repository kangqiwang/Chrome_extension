const structureHtml = require('sm-supplier-html').structure;
const config = require('../config')
const HtmlModel = require('se-app-model').model.html
const Html = new HtmlModel(config.mongoDb);
const sendToStockCheck = require('./sendToStockCheck')

module.exports = (payload, next) => {
    var data = structureHtml({
        html: payload.html,
        url: payload.url,
        pageType: 'product'
    });


    if (data.name) {
        let stockPayload = {
            "jobType": "STOCK",
            "jobId": "UWBP2ORNITZ6C64BL158OR7OFXAUFG",
            "userName": "mike",
            "country": "us",
            "userId": "585d5951cc787451ccefab7e",
            "url": [{
                "url": payload.url,
                "id": "953e4b3af9c6dcb731b5835b5d6fc77a",
                "key": "be848ea12e6cde6c723d1ba3c6b3df60"
            }],
            "urlType": "product"
        }

        sendToStockCheck('STOCK_CHECK', stockPayload, () => {

        })
    }


    next(null, data)


}