var superagent = require('superagent');

const GetAmazonFees = function(payload, next) {
        superagent 
            .post('http://matt-dev.profitsourcery.com:3455/')
            .send(payload)
            .end(function (err, res) {
                next(err, res);
            })

	    }

export default GetAmazonFees;