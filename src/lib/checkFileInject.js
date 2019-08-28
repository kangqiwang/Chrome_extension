import { request } from "https";
const url = require('url');

const checkFileInject = function() {
	chrome.tabs.executeScript(null, 
		{file: "getHtml.js"},function(){
            if(url.parse(window.__HTMLPAGEINFO__.source.url).hostname === 'www.google.com'){

            }else{
                chrome.tabs.executeScript(null,{file:"getHtml.js"},function(){
                    if (chrome.runtime.lastError) {
                        console.log('There was an error injecting script : \n' + chrome.runtime.lastError.message)
                }
            })
            }
            // If you try and inject into an extensions page or the webstore/NTP you'll get an error
            
        }
    )
}
export default checkFileInject;