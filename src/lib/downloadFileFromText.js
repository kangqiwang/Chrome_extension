module.exports = function(filename, content, contentType) {
    var a = document.createElement('a');
    var blob = new Blob([ content ], {type : contentType + ";charset=UTF-8"});
    var blobUrl = window.URL.createObjectURL(blob);
    chrome.downloads.download({
        url: blobUrl,
        filename: filename,
        saveAs: true
    });
}

