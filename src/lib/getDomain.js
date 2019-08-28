import config from "../config";

var superagent = require('superagent');

const getDomain = function(request, next) { 
        superagent 
            .post(config.host + "domain")
            .send( request.source )
            .end(function (err, res) {
                next(err, res);
            })

	    }

export default getDomain; 