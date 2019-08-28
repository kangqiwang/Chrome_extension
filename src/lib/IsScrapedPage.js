const domainQuery = require('./getDomain.js');
import config from "../config.js";

var superagent = require('superagent');

const getProducts = function(request, next) { 
  superagent 
      .post(config.host + "new-extension")
      .send( request.source )
      .end(function (err, res) {

          next(err, res);
      })

}

export default getProducts; 