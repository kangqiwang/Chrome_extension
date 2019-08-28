var superagent = require('superagent');

const GetCompetitivePrice = function(payload, next) {
	
        superagent 
            .post('http://matt-dev.profitsourcery.com:3459/')
            .send(payload)
            .end(function (err, res) {            	
                next(err, res);
            })

	    }

export default GetCompetitivePrice;