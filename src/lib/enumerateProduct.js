var request = require('superagent')

const EnumerateProduct = function(payload, next) {
	
	var indexId = payload.indexId;
	delete payload.indexId;	

    // Finsing Product In Database
	request
	    .post('http://matt-dev.profitsourcery.com:3454/')
	    .send(payload)
	    .end(function(err, response) {
	    	// TODO: Check for errors
	    	response.body.indexId = indexId
	    	next(err, response.body);

	    	// Matching Product
	    	request
	    	   .post('http://matt-dev.profitsourcery.com:3766/')
	    	    .send(payload)
			    .end(function(err, response) {
			    	// TODO: Check for errors
			    	if(err) {
			    		console.log(err);
			    	}
			    });
	    })
	
	
}

export default EnumerateProduct;
