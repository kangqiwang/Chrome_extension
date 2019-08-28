


const updateStatus =(variables,status) => {
    chrome.storage.local.get(variables, function (data) {
        data[variables]=status
        chrome.storage.local.set(data)
    })
}

export default updateStatus