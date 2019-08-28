const structureHtml = require('sm-supplier-html').structure;
const config = require('../config')
const HtmlModel = require('se-app-model').model.html
const Html = new HtmlModel(config.mongoDb);
const url = require('url');
var startSearch = require('./startSearch')
var endSearch = require('./endSearch')

module.exports = (payload, next) => {
    let domain = url.parse(payload.body.url).host;
    // console.log(payload.body.html)
    var data = structureHtml({
        html: payload.body.html,
        url: payload.body.url,
        pageType: 'search'
    });
    delete data.url
    if(payload.body.userId.country.length >= 2){
        payload.body.userId.country = "uk"
    }else{
        payload.body.userId.country=payload.body.userId.country[0]
    }
    let savedata = {
        data: data,
        jobId: payload.body.Id.jobId,
        supplierId: payload.body.Id.supplierId,
        chromeKey: payload.body.userId.id,
        username: payload.body.userId.username,
        country: payload.body.userId.country,
        domain:domain,
        recordNum:payload.body.recordNum
    }
    var lastDomain
    if(payload.body.lastDomain){
        lastDomain = url.parse(payload.body.lastDomain).host
    }

    if ( lastDomain && lastDomain != domain && payload.body.userId && payload.body.Id) {
        let dataend = {
            jobId: payload.body.Id.jobId,
            supplierId: payload.body.Id.supplierId,
            userId: payload.body.userId.id,
            username: payload.body.userId.username,
            country: payload.body.userId.country,
            domain:domain,
            page:payload.body.recordNum.page,
            product:payload.body.recordNum.product
        }
        endSearch(dataend, (err, data) => {
            if (err) {
                console.log(err)
            }
        })

        let startSearchdata = {
            formSearchName: 'chrome extension ' + domain,
            formVoucher: '0',
            
            jobId: payload.body.Id.jobId,
            supplierId: payload.body.Id.supplierId,
            userId:{
                username: payload.body.userId.username,
                country: payload.body.userId.country,
                id: payload.body.userId.id,
            },
            domain: domain
        }
        startSearch(startSearchdata, (err, id) => {
            if (payload.body.Id && payload.headers.authorization) {
                savedata.supplierId = id.supplierId
                savedata.jobId = id.jobId
            
                Html.savePageData(savedata, () => {
                    savedata.url = payload.body.url
                    next(null, savedata, domain);
                })
            } else {
                next(null, data, domain)
            }
        })
    } else {


        if (payload.body.Id && payload.headers.authorization) {

            Html.savePageData(savedata, () => {
                savedata.url = payload.body.url
                next(null, savedata, null);
            })
        } else {
            next(null, data, null)
        }

    }


}
