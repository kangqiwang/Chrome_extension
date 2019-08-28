const injectScript = function(target) {
    
        chrome.tabs.executeScript(null, 
            {file: target+".js"},function(){
                // If you try and inject into an extensions page or the webstore/NTP you'll get an error
                if (chrome.runtime.lastError) {
                console.log('There was an error injecting script : \n' + chrome.runtime.lastError.message);
            }
    })

}

export default injectScript;
