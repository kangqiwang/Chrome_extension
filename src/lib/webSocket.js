//var ws = new WebSocket('wss://search-dashboard-matt-dev.profitsourcery.com/');
// var ws = new WebSocket('ws://matt-dev.profitsourcery.com:3444/');
//var ws = new WebSocket('ws://ultron.profitsourcery.com:3444/');
var ws;

var userId = null;

import store from '../store.js';
import { recieveAmazonInfo, recieveCompetitivePrice, recieveFees } from '../actions/actionCreators.js';

// ws.onopen = function() {
//     console.log('SOCKET OPEN');
// };

// ws.onmessage = function(event) {
// 	var payload = JSON.parse(event.data);	
// 	switch(payload.type) {
// 		case 'init':
// 		    userId = payload.data.id;
// 		    break;
// 		case 'PRODUCT_ENUMERATOR':
// 			store.dispatch(recieveAmazonInfo(payload.payload.indexId, payload.payload.asin, payload.payload.asins, payload.payload.amazonName, payload.payload.amazonUrl, payload.payload.amazonImage));
// 			break;
// 		case 'CALCULATE_FEES':
// 		case 'NO_MARGIN_WITHOUT_FEES':
// 		    store.dispatch(recieveCompetitivePrice(payload.payload.indexId, payload.payload.competitivePricing, payload.payload.salesRank));
// 		    break;
// 		case 'FEE_CALCULATOR': 
// 			store.dispatch(recieveFees(payload.payload.indexId, payload.payload.profit, payload.payload.roi, payload.payload.fees));
// 			break;
// 	}
    
//}

module.exports = {

	sendOpportunity: function(opportunity) {
		var payload ={
			type: 'opportunity',
			userId: userId,
			data: opportunity
		}
		
		sendReady(payload);
	},
	sendOpportunities: function(opportunities) {
		// console.log('sendOpportunities');
		// console.log(opportunities);
		var payload = {
			type: 'opportunities',
			data: opportunities
		}
		sendReady(payload);
	}
	
}

const sendReady = function(message) {
	if(ws.readyState === 1) {
		console.log(message);
		ws.send(JSON.stringify(message));
	} else {
		setTimeout(function() {
			sendReady(message);
		}, 1000);
	}
}