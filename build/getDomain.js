chrome.runtime.sendMessage({
    action:"Disable",
    source: {
        domain:window.location.href
    }

});
