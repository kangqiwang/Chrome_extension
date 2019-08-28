

chrome.runtime.onMessage.addListener((request, sender, next) => {

    if (request.action === "HTML_NOTI") {
        let logo = chrome.extension.getURL('img/SMCElogo.png')

        //create overlay div on the page
        
        // Make outer div
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
        titleH3.textContent = "Data already recorded for this page"
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

        setTimeout(() => {
            window.scrollTo({ top: 0 });
            document.getElementById("tmpforlayout").remove()
            document.getElementById("innerModalCE").remove()
            updateStatus('collectingData', false)
            next(true)
        }, 2500);
    }
})