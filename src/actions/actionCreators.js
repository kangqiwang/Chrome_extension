
export function receiveHtmlPageInfo(request) {
    return {
        type: 'RECIEVE_HTML_PAGE',
        request
    }
}

export function changeSearchName(request) {
	return {
		type: 'CHANGE_SEARCH_NAME',
		request
	}
}

export function productsNumber(request){
	return {
        type: 'RECIEVE_HTML_PAGE_INFO',
        request
    }
}

export function receiveUrlInfo(request) {

    return {
        type: 'RECIEVE_URL_INFO',
        request
    }
}
export function resetKey() {
	return {
		type : 'RESET_KEY',
	}
}

export function resetChrome(){
	return {
		type: 'RESET_CHROME'
	}
}

export function resetRecord() {
	return {
		type : 'RESET_RECORD'
	}
}

export function searchDiscard(){
	return {
		type: 'DISCARD_COMFIRM'
	}
}

export function saveKey(todo) {
	return {
		type: 'SAVE_KEY',
		todo
	}
}

export function saveRecord(request) {
	return {
		type: 'SAVE_RECORD',
		request
	}
}

export function targetPageStatus (request) {
	return {
		type: 'TARGET_STATUS',
		request
	}
}

export function recordingStatus (request) {
	return {
		type: 'RECORDING_STATUS',
		request
	}
}


export function checkDomain(request){
	return{
		type: 'RECIEVE_STATUS_INFO',
		request
	}
}

export function productsRecieved(products) {
	return function(dispatch) {
		dispatch({
			type: 'RECIEVE_PRODUCTS',
		    products
		})
	}
}

export function error(err) {
	return {
		type: 'ERROR',
		err
	}
}

export function recieveAmazonInfo(indexId, asin, asins, amazonName, amazonUrl, amazonImage) {
	return {
		type: 'RECIEVE_ASIN',
		indexId,
		asin,
		asins,
		amazonName,
		amazonUrl,
		amazonImage
	}
}

export function recieveCompetitivePrice(indexId, price, salesRank) {
	return {
		type: 'RECIEVE_COMPETITIVE_PRICE',
		indexId,
		price,
		salesRank
	}
}

export function recieveFees(indexId, profit, roi, fees) {
	return {
		type: 'RECIEVE_FEES',
		indexId,
		profit,
		roi,  // Return On Investment
		fees
	}
}

export function changeWorking(){
	return {
		type:'CHANGE_WORKING'
	}
}

export const searchComplete = () => {
	return {
		type:'SEARCH_COMPLETE'
	}
}

export const saveNameToStore = (name) => {
	return {
		type: 'SAVE_NAME',
		value: name
	}
}

export const start = (name) => {
	return {
		type: 'START',
		value: name
	}
}

export const resumeSearch = () => {
	return { 
		type: 'RESUME_SEARCH'
	}
}

export const workingTrue = () => {
	return {
		type: 'WORKING_TRUE'
	}
}

export const logOut = () => {
	return {
		type: 'LOG_OUT'
	}
}

export const pauseSearch = () => {
	return {
		type: 'PAUSE_SEARCH'
	}
}