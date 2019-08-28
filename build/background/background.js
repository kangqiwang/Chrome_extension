

chrome.runtime.onInstalled.addListener((detail) => {
    chrome.storage.local.clear(() => {
        // var error = chrome.runtime.lastError;
        // if (error) {
        //     console.log(error);
        // }
    });
    chrome.storage.local.set({ 'targetPage': false });
    chrome.storage.local.set({ 'accessKey': null })
    chrome.storage.local.set({ 'recordStatus': false })
    chrome.storage.local.set({ 'searchId': null })
    // chrome.storage.local.set({ 'workingStatus': true })
    chrome.storage.local.set({ 'domain': null })
    chrome.storage.local.set({ 'recordingNum': {product:0,page:0} })
    chrome.storage.local.set({ 'autoDomain': true })
    chrome.storage.local.set({ 'lastUrls': null })
    chrome.storage.local.set({ 'pausedSearch': false })
    chrome.storage.local.set({ 'searchName': "" })
    chrome.storage.local.set({ 'collectingData': false })
    chrome.storage.local.set({ 'urlAlreadyRecorded': false })
})

