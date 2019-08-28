import config from "../config.js";

var superagent = require('superagent');
const sendToServer = function(endPoint, data, next) { 
        superagent 
            .post(config.host + endPoint)
            .send( data )
            .end(function (err, res) {
                next(err, res);
            })
	    }
    
export default sendToServer; 