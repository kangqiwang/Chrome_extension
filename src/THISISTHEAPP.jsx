require('./css/productInfo.less');

var superagent = require('superagent');
var $ = require('jquery');
var htmlPageInfo = '';
var csvInfo = '';
var md5 = require('md5');
var GenerateCsv = require('./lib/generateCsv.js');
var downloadFileFromText = require('./lib/downloadFileFromText.js');
var pad = require('./lib/pad.js');
var createSimpleFormat = require('./lib/createSimpleFormat.js');
var config = require('./config')

chrome.tabs.executeScript(null, {
    file: "getHtml.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
       //console.log('There was an error injecting script : \n' + chrome.runtime.lastError.message);
    }
  });

$(document).ready(function() {

    $('a#download').click(function(event) {
        var filename = md5(htmlPageInfo.url) + '.html';
        downloadFileFromText(filename, htmlPageInfo.html, 'text/html');
    })
});




chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        htmlPageInfo = request.source
        superagent
            .post(config.host)
            .send( request.source )
            .end(function (err, res) {

                var html = '';

                res.body.map(function(data, index) {

                    // Trigger Action

                    var line = [];
                    html += '<ul id="prod' + index + '" class="product-info">';
                    for (var key in data) {

                        var info = data[key];
                        line.push(info);
                        if(key === 'url') {
                            info = '<a href="' + info + '">link</a>'
                        }

                        html += '<li>' + info + '</li>';

                    }
                    html += '</ul>'

                })

                $('#products').append(html);

                $('a#downloadCsv').click(function(event) {
                    var now = new Date();
                    var dateFormat = now.getFullYear() + '-' + pad(now.getMonth()+1) + '-' + pad(now.getDate()) + '-' + pad(now.getHours()) + '-' + pad(now.getMinutes()) + '-' + pad(now.getSeconds());
                    var host = htmlPageInfo.url.split('/')[2].replace(/\./g,'-');

                    var filename = host + '-' + dateFormat + '.csv';

                    var simpleFormat = createSimpleFormat(res.body);
                    GenerateCsv(simpleFormat, function(err, csvContents) {
                        downloadFileFromText(filename, csvContents, 'text/csv');
                    });

                })

            })

    }
    // if(request.action == "updateIcon"){
    //     // console.log('________this is on THISISTHEAPP')
    // }
});





