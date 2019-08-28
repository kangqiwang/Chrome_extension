var superagent = require('superagent');
import ws from './webSocket.js';

const GetCompetitivePrice = function(payload, next) {
		
		try {
			ws.sendOpportunity(payload);	
		} catch(e) {
			console.log(e);
		}
		
        // superagent 
        //     .post('http://matt-dev.profitsourcery.com:3444/')
        //     .send(payload)
        //     .end(function (err, res) {            	
        //         next(err, res);
        //     })

}

export default GetCompetitivePrice;