chrome.runtime.sendMessage({
    action: "getUrl",
    source: {
        url: window.location.href,
    }
});

