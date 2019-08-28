

// generate function for get the value from chrome storage local
var getdata = async (key) => {
    return new Promise((resolve, reject) => {
        if (key != null) {
            chrome.storage.local.get(key, function (obj) {
                resolve(obj);
            });
        } else {
            reject(null);
        }
    });
}

//  testing on product pages
var stockCheck = (urls, htmls) => {
    let req = new XMLHttpRequest();
    let resp
    let data
    data = { url: urls, html: htmls }
    req.open("POST", "https://x4-sm-working.sourcemogul.com/prime/stockCheck", true)
    req.setRequestHeader('Content-type', 'application/json')

    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200) {
            resp = JSON.parse(req.response)

        }
    }
    req.send(JSON.stringify(data));

}


// send message to content page and then get html
var sendMessagetoContent = (tabId, name, urls, searchId, key, pastNumber, changeDomain, lastUrl, prevUrls) => {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {


        if (urls !== lastUrl) {
            chrome.tabs.sendMessage(tabId, {
                action: name,
            }, function (response) {
                if (name === "getSource") {
                    localStorage.setItem('collectingData', false)
                }

                if (response && response.hasOwnProperty('html')) {

                    messageGetProduct(urls, response.html, searchId, key, pastNumber, changeDomain, lastUrl, prevUrls)
                    // if (key.dev) {
                    //     stockCheck(urls, response.html)
                    // }
                } else {
                    nohtml()
                }
            })
        }
    })

    //}
}

var sendMessageToCreateDiv = async (tabId) => {
    var record = await getdata('recordStatus')
    var page = await getdata('targetPage')
    var key = await getdata('accessKey')

    if (record.recordStatus && page.targetPage && key.accessKey && !localStorage.getItem('pausedSearch')) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabId, {
                action: "loadingPage",
            })
        })
    }
}

// first event for trigger all action in changIcon
//trigger change the tab event
chrome.tabs.onActivated.addListener(function (info) {

    chrome.tabs.get(info.tabId, function (tab) {

        var isUrls = localStorage.getItem('urlsRecorded') !== null ? JSON.parse(localStorage.getItem('urlsRecorded')) : []

        if (isUrls.length > 0) {
            var host = tab.url.split('.')
            var check = host[1]

            if (isUrls.indexOf(check) === -1) {
                localStorage.setItem('pausedSearch', true)
            } else {
                if (tab.url != 'chrome://URL') {
                    updateStatus('collectingData', true)
                    localStorage.setItem('collectingData', true)
                    sendMessage(tab.url, info.tabId)
                }
            }

        } else {
            if (tab.url != 'chrome://URL') {
                updateStatus('collectingData', true)
                localStorage.setItem('collectingData', true)
                sendMessage(tab.url, info.tabId)
            }
        }
    });

});

// trigger finish load event
chrome.tabs.onUpdated.addListener(function (tabId, info) {
    if (info.status === 'complete') {
        updateStatus('urlAlreadyRecorded', false)
        localStorage.setItem('urlAlreadyRecorded', false)


        chrome.tabs.get(tabId, function (tab) {
            let prevUrls = localStorage.getItem('urlsRecorded') !== null ? JSON.parse(localStorage.getItem('urlsRecorded')) : localStorage.getItem('urlsRecorded')
            let paused = localStorage.getItem('pausedSearch')
            getStorage('recordStatus', value => {
                if (prevUrls === null && value.recordStatus && paused !== true) {
                    if (tab.url != 'chrome://URL') {
                        updateStatus('collectingData', true)
                        localStorage.setItem('collectingData', true)
                        sendMessage(tab.url, tabId)
                    }

                } else if (prevUrls !== null && value.recordStatus && paused !== true) {

                    if (prevUrls.indexOf(tab.url) > -1) {
                        updateStatus('urlAlreadyRecorded', true)
                        localStorage.setItem('urlAlreadyRecorded', true)

                        chrome.tabs.sendMessage(tabId, { action: "HTML_NOTI" }, () => {
                            localStorage.setItem('collectingData', false)
                        })
                        localStorage.setItem('collectingData', false)

                    } else {

                        if (tab.url != 'chrome://URL') {
                            updateStatus('collectingData', true)
                            localStorage.setItem('collectingData', true)
                            sendMessage(tab.url, tabId)
                        }
                    }
                }
            })
        })

    } else {
        //pre loading
        // sendMessageToCreateDiv(tabId)
    }

})
// pre loading
// chrome.webNavigation.onBeforeNavigate.addListener((info) => {
//     if (info.frameId === 0) {
//         sendMessageToCreateDiv(info.tabId)
//         // updateStatus('preloading',true)
//     }
// })


// second event for trigger all action in changIcon.js

// generate function for update data in chrome storage local
var updateStatus = (variables, status) => {
    chrome.storage.local.get(variables, function (data) {
        data[variables] = status
        chrome.storage.local.set(data)
    })
}

var getStorage = (name, done) => {

    chrome.storage.local.get(name, (data) => {
        done(data)
    })

}

// 1 step to server: send each url to server, check if we analysis this domian
var sendMessage = async (urls, tabId) => {
    // var loading = await getdata('preloading')
    var key = await getdata('accessKey')
    var page = await getdata('targetPage')
    var record = await getdata('recordStatus')
    var searchId = await getdata('searchId')
    // var working = await getdata('workingStatus')
    var pastNumber = await getdata('recordingNum')
    var changeDomain = await getdata('autoDomain')
    var lastUrl = await getdata('lastUrls')
    let prevUrls = localStorage.getItem('urlsRecorded') !== null ? JSON.parse(localStorage.getItem('urlsRecorded')) : localStorage.getItem('urlsRecorded')
    let urlsList = []


    // console.log("loading preloading     ",loading.preloading)
    var req = new XMLHttpRequest();
    var resp
    let data
    if (record.recordStatus && !changeDomain.autoDomain) {
        data = { url: urls, search: searchId.searchId, records: record.recordStatus, lasturl: lastUrl ,userinfo:key.accessKey}
    } else {
        data = { url: urls, lasturl: lastUrl ,userinfo:key.accessKey}
    }

    req.open("POST", "https://x4-sm-working.sourcemogul.com/prime/domain", true)
    req.setRequestHeader('Content-type', 'application/json')

    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200) {
            resp = JSON.parse(req.responseText)
            switch (resp.type) {
                case 'GETHTML':

                    updateStatus('domain', resp.domain)
                    updateStatus('targetPage', true)


                    if (JSON.parse(localStorage.getItem('key')) === true && JSON.parse(localStorage.getItem('pausedSearch')) !== true) {

                        if (record.recordStatus) {
                            sendMessagetoContent(tabId, "getSource", urls, searchId.searchId, key.accessKey, pastNumber.recordingNum, changeDomain.autoDomain, lastUrl.lastUrls, prevUrls)
                            chrome.browserAction.setIcon({ path: "img/SMCElogoSmallRec.png" })
                        } else {
                            chrome.browserAction.setIcon({ path: "img/SMCElogoSmall.png" })
                        }
                    }
                    return 0;

                case 'WRONG_DOMAIN':
                    updateStatus('domain', resp.domain)
                    updateStatus('targetPage', false)
                    chrome.browserAction.setIcon({ path: "img/SMCElogoSmallGrey.png" })
                    return 0;

                case 'DIFFER_DOMAIN_RECORD':
                    updateStatus('recordStatus', false)
                    updateStatus('recordingNum', { product: 0, page: 0 })
                    updateStatus('searchId', null)
                    // chrome.browserAction.setBadgeText({ text: "on" })
                    return 0;

                case 'SPECIAL_DOMAIN':
                    urlsList.push(urls)
                    localStorage.setItem('urlsRecorded', JSON.stringify(urlsList))
                    updateStatus('domain', resp.domain)
                    updateStatus('targetPage', true)
                    if (record.recordStatus) {
                        sendMessagetoContent(tabId, "specialSupplier", urls, searchId.searchId, key.accessKey, pastNumber.recordingNum, changeDomain.autoDomain, lastUrl.lastUrls, prevUrls)
                        chrome.browserAction.setIcon({ path: "img/SMCElogoSmall.png" })
                    } else {
                        chrome.browserAction.setIcon({ path: "img/SMCElogoSmall.png" })
                    }
                    return 0

                case 'LAZYLOAD_DOMAIN':
                    updateStatus('domain', resp.domain)
                    updateStatus('targetPage', true)
                    if (record.recordStatus) {
                        sendMessagetoContent(tabId, "lazyloadSupplier", urls, searchId.searchId, key.accessKey, pastNumber.recordingNum, changeDomain.autoDomain, lastUrl.lastUrls, prevUrls)
                        chrome.browserAction.setIcon({ path: "img/SMCElogoSmall.png" })
                    } else {
                        chrome.browserAction.setIcon({ path: "img/SMCElogoSmall.png" })
                    }
                // chrome.browserAction.setBadgeText({ text: 'S' })
            }
        }
    }
    req.send(JSON.stringify(data));
    // } else {
    //     // chrome.browserAction.setBadgeText({ text: "off" });
    //     chrome.browserAction.setIcon({ path: "img/SMCElogoSmall.png" })
    // }
    // } else {
    //     // chrome.browserAction.setBadgeText({ text: "off" });
    //     chrome.browserAction.setIcon({ path: "img/SMCElogoSmall.png" })
}


//send: 1. urls and htmls and searchId or 2. urls and htmls

var messageGetProduct = (urls, htmls, searchId, key, pastNumber, changeDomain, lastUrl, prevUrls) => {
    let urlsList = []
    if (prevUrls !== null) {
        urlsList = prevUrls
    }
    let req = new XMLHttpRequest();
    let resp
    let data
    req.open("POST", "https://x4-sm-working.sourcemogul.com/prime/url", true)
    if (searchId && JSON.parse(localStorage.getItem('userInfo')) !== null) {
        //check different domain

        data = { url: urls, html: htmls, Id: searchId, userId: JSON.parse(localStorage.getItem('userInfo')), optionDomain: changeDomain, lastDomain: lastUrl,recordNum: pastNumber }
        req.setRequestHeader('Authorization', 'Basic' + JSON.parse(localStorage.getItem('userInfo')))
    } else {
        data = { url: urls, html: htmls }
    }
    req.setRequestHeader('Content-type', 'application/json')

    req.onreadystatechange = () => {

        if (req.readyState == 4 && req.status == 200) {

            resp = JSON.parse(req.responseText)

            if (resp.jobId) {
                if (resp.domian) {
                    pastNumber.product = 0
                    pastNumber.page = 0
                }
                var searchId = {
                    jobId: resp.jobId,
                    supplierId: resp.supplierId
                }
                updateStatus('recordingNum', { product: resp.data.length + parseInt(pastNumber.product), page: pastNumber.page + 1 })
                urlsList.push(urls)
                localStorage.setItem('urlsRecorded', JSON.stringify(urlsList))

                updateStatus('searchId', searchId)
                updateStatus('domain', resp.domain)

                // localStorage.setItem('pages', pastNumber.page + 1)

                // localStorage.setItem('products', resp.data.length + parseInt(pastNumber.product))
                // chrome.browserAction.setBadgeText({ text: number.toString() })
            } else {
                // chrome.browserAction.setBadgeText({ text: resp.data.length.toString() });
                updateStatus('recordingNum', { product: 0, page: 0 })
            }
            updateStatus('lastUrls', urls)
        }
    }
    req.send(JSON.stringify(data));
    //chrome.browserAction.setBadgeText({text: resp});
}

var nohtml = () => {
    chrome.tabs.reload()
}
