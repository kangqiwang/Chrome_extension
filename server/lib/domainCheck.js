
var url = require('url');
var endSearch = require('./endSearch')
var getSupplier = require('./getSupplier')
var getSpecialdomain = require('./getSpecialDomain')
var getSpecialSupplier = require('./getSpecialSupplier')
module.exports = (paload, next) => {

    // var specialDomain = ["www.diy.com", "electrical.coop.co.uk", "www.comacotoys.com", "www.smythstoys.com", "www.365games.co.uk"]
    var lazyLoadDomain = ["groceries.morrisons.com"]
    let domain = url.parse(paload.url).host;
    var lastDomain = paload.lasturl

if(paload.userinfo !==null && paload.userinfo !=undefined ){
    if(paload.userinfo.country){
        getSupplier(paload.userinfo.country,(err, totalDomain) => {
            if (err) {
                console.error(err)
            } else {
                getSpecialSupplier((err, specialDomain) => {
                    if (err) {
                        console.log(err)
                    }
                    if (!specialDomain.includes(domain) && !lazyLoadDomain.includes(domain)) {
                        if (lastDomain != undefined) {
    
                            if (paload.records && !paload.optionDomain && domain !== lastDomain) {
                                endSearch({ searchId: paload.search }, (err, data) => {
                                    if (err) {
                                        next(err)
                                    } else {
                                        next(null, { domain: domain, type: 'DIFFER_DOMAIN_RECORD' })
                                    }
    
                                })
                            } else {
                                if (totalDomain) {
                                    if (totalDomain.includes(domain)) {
                                        next(null, { domain: domain, type: 'GETHTML' })
                                    } else {
                                        next(null, { domain: domain, type: 'WRONG_DOMAIN' })
                                    }
                                } else {
                                    next(null, { type: 'SERVER ERR' })
                                }
    
                            }
                        } else {
                            if (totalDomain) {
                                if (totalDomain.includes(domain)) {
                                    next(null, { domain: domain, type: 'GETHTML' })
    
                                } else {
                                    next(null, { domain: domain, type: 'WRONG_DOMAIN' })
                                }
                            } else {
                                next(null, { type: 'SERVER ERR' })
                            }
                        }
                    } else {
                        if (specialDomain.includes(domain)) {
                            next(null, { domain: domain, type: 'SPECIAL_DOMAIN' })
                        } else {
                            next(null, { domain: domain, type: 'LAZYLOAD_DOMAIN' })
                        }
    
                    }
    
                })
    
            }
    
        })
    
    }else{
        next(null, {domain:domain,type:'WRONG_DOMAIN'})
    }
}else{
    next(null, {domain:domain,type:'WRONG_DOMAIN'})
}
}