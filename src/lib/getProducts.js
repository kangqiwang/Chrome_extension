import config from "../config.js";

var superagent = require('superagent');
/*var $ = require('jquery');
var csvInfo = '';
var md5 = require('md5');
var GenerateCsv = require('./generateCsv.js');
var downloadFileFromText = require('./downloadFileFromText.js');
var pad = require('./pad.js');
var createSimpleFormat = require('./createSimpleFormat.js');

import store from '../store.js';
import { recieveOpportunities } from '../actions/actionCreators.js';*/

const getProducts = function(request, next) { 
        superagent 
            .post(config.host + "new-extension")
            .send( request.source )
            .end(function (err, res) {

                next(err, res);
            })

	    }

export default getProducts; 