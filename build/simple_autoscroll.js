
var listener = (sendResponse) => {

    var cuttently = window.innerHeight + window.scrollY
    var total = document.body.scrollHeight

    if ((total - cuttently) / total < 0.1) {
        sendResponse({ html: document.documentElement.outerHTML })
    }
}

var myFunction = (timer, obj, delay, listener) => {
    if (timer) {
        window.clearTimeout(timer);
    }
    timer = window.setTimeout(function () {
        timer = null;
        listener.call(obj, evt);
    }, delay);
}
var injectCss = () => {

}

function addDebouncedEventListener(obj, eventType, listener, delay) {
    var timer;

    obj.addEventListener(eventType, myFunction(timer, obj, delay, listener), false);
}


// generate function for update data in chrome storage local
var updateStatus = (variables, status) => {
    chrome.storage.local.get(variables, function (data) {
        data[variables] = status
        chrome.storage.local.set(data)
    })
}



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "lazyloadSupplier") {
        var total = document.body.scrollHeight
        var current = window.innerHeight + window.scrollY
        var timer = total - current / 100
        for (var i = 0; i < timer; i++) {
            window.scrollTo({ top: current + 1 * 100, behavior: 'smooth' });
        }
        window.addEventListener("scroll", listener(sendResponse), false)
    }




    if (request.action === "specialSupplier") {

        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        var timer1 = setTimeout(() => {
            if (window.confirm("Do you finish load all product on this page?")) {
                clearTimeout(timer1)
                sendResponse({ html: document.documentElement.outerHTML })
            }
        }, 2000)
        var timer2 = setTimeout(() => {


            addDebouncedEventListener(document, 'DOMNodeInserted', function (evt) {

                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                var tiemr3 = setTimeout(() => {
                    if (window.confirm("Do you finish load all product on this page?")) {
                        clearTimeout(timer2)
                        clearTimeout(tiemr3)
                        clearTimeout(timer1)
                        document.removeEventListener('DOMNodeInserted', myFunction())
                        sendResponse({ html: document.documentElement.outerHTML })
                    }
                }, 2000)
            }, 1000)
        }, 1000)

        setTimeout(() => {
            sendResponse({ html: document.documentElement.outerHTML })
        }, 1500000)

    }
    if (request.action === "getSource") {
        let logo = chrome.extension.getURL('img/SMCElogo.png')

        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        //create overlay div on the page
        createOtherDiv(logo)
        setTimeout(() => {
            // localStorage.setItem('collectingData', false)
            // window.scrollTo({ top: 0 });
            if(document.getElementById("tmpforlayout") !==null){

            
            document.getElementById("tmpforlayout").remove()
            document.getElementById("innerModalCE").remove()
            document.body.style.webkitFilter = ""
        }
            sendResponse({ html: document.documentElement.outerHTML })
            updateStatus('collectingData', false)
        }, 3000);


    }
    if(request.action === "loadingPage") {
        let logo = chrome.extension.getURL('img/SMCElogo.png')
        createOtherDiv(logo,()=>{
            // updateStatus('preloading',true)
        })
        
    }
    if(request.action === "HTML_NOTI"){
        document.getElementById("tmpforlayout").remove()
        document.getElementById("innerModalCE").remove()
        document.body.style.webkitFilter = ""
    }
    return true
})
function createOtherDiv(logo){
    if(document.getElementById('tmpforlayout') ===null ) {
        var outertDiv = document.createElement('div')
        var outerH1 = document.createElement('h1')
        outertDiv.appendChild(outerH1)
        document.body.appendChild(outertDiv)
        outertDiv.id = 'tmpforlayout'
        outertDiv.style.position = 'absolute'
        outertDiv.style.background = 'rgba(91,102,127,0.8)'
        outertDiv.style.top = 0
        outertDiv.style.zIndex = '10000000'
        outertDiv.style.bottom = 0
        outertDiv.style.width = "100%"
        outertDiv.style.height = document.body.scrollHeight.toString()+'px'
        
    
        // insert elements into outer div
        var innerModal = document.createElement('div')
        document.body.appendChild(innerModal)
        innerModal.id = "innerModalCE"
        innerModal.style.width = "312px"
        innerModal.style.height = "105px"
        innerModal.style.background = "#EFEFF3"
        innerModal.style.position = "fixed"
        innerModal.style.zIndex = "10000001"
        innerModal.style.top = "5px"
        innerModal.style.left = "5px"
        innerModal.style.boxShadow = "4px 2px 7px 2px rgba(121,121,121,0.5)"
        innerModal.style.borderRadius = "12px"
    
        var header = document.createElement('div')
        innerModal.appendChild(header)
        header.style.height = "43px"
        header.style.width = "312px"
        header.style.background = "#ffffff"
        header.style.display = "inline-flex"
        header.style.borderTopLeftRadius = "12px"
        header.style.borderTopRightRadius = "12px"
    
        var img = document.createElement("img");
        img.src = logo
        img.style.margin = "auto"
        header.appendChild(img)
    
        var splitter = document.createElement('div')
        innerModal.append(splitter)
        splitter.style.boxSizing = "border-box"
        splitter.style.height = "2px"
        splitter.style.width = "312px"
        splitter.style.border = "1px solid  #EFEFF3"
    
        var title = document.createElement('div')
        innerModal.append(title)
        title.style.height = "43px"
        title.style.width = "312px"
        title.style.background = "#ffffff"
        title.style.display = "inline-flex"
    
        var titleH3 = document.createElement('h3')
    
        title.append(titleH3)
        titleH3.textContent = "Currently Recording"
        titleH3.style.color = "#5B667F"
        titleH3.style.fontFamily = "Lato"
        titleH3.style.fontSize = "14px"
        titleH3.style.fontWeight = "bold"
        titleH3.style.lineHeight = "17px"
        titleH3.style.textAlign = "center"
        titleH3.style.margin = "auto"
        titleH3.style.marginTop = "10px"
        titleH3.style.display = "inline-flex"
    
        var recording = document.createElement('div')
        titleH3.append(recording)
        recording.style.height = "10px"
        recording.style.width = "10px"
        recording.style.background = "#F2613E"
        recording.style.borderRadius = "50px"
        recording.style.margin = "5px 0px 0px 13px"
    }
    // Make outer div


}

