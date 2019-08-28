var express = require('express')
var app = express();
var startSearch = require('./lib/startSearch')
var findUser = require('./lib/findUser')
var endSearch = require('./lib/endSearch')
var stockCheck = require('./lib/stockCheck')
var bodyParser = require('body-parser');
var domainCheck = require('./lib/domainCheck')
var discardSearch = require('./lib/discardSearch')
var server = require('http').createServer()
const domainLookup = require('./lib/domainLookup.js');
var caesarShift = require('./lib/caesarShift');
var parseHtmlToServer = require('./lib/parseHtmlToServer')


// let lastUrl
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

var config = {
    port: 3333,
    folder: '/prime'
}

const prefix = (p) => {
    let pre = config.folder + p;
    return pre
}

app.get(prefix('/'), function (req, res) {
    res.sendStatus(200);
});

app.post(prefix('/search'), function (req, res) {
    // var newdata ={
    //     country: req.body.userId.country,
    //     userId: req.body.userId.id,
    //     username: req.body.userId.username
    // }


    if (req.body.userId.country.length >= 2) {
        req.body.userId.country = "uk"
    }else{
        req.body.userId.country=req.body.userId.country[0]
    }

    

    startSearch(req.body, (err, data) => {
        if (err) {
            res.sendStatus(500)
        } else {
            if (data.userId === null) {
                res.sendStatus(502)
            } else {
                //lastDomain = req.body.domain
                res.send(data).status(200)
            }
        }
    })

})

app.post(prefix('/discard'), function (req, res) {
    discardSearch(req.body, (err, data) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ response: data }).status(200)
        }
    })
})

app.post(prefix('/endsearch'), function (req, res) {
    payload = req.body
    var newdata = {
        jobId: payload.searchId.jobId,
        supplierId: payload.searchId.supplierId,
        username: payload.userId.username,
        userId: payload.userId.id,
        country: payload.userId.country,
        product:payload.product,
        page:payload.page
    }

    if (newdata.country.length === 2) {
        newdata.country = "uk"
    }

    endSearch(newdata, (err, data) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})

app.post(prefix('/stop'), function (req, res) {
    res.sendStatus(200)
})

app.post(prefix('/check-key'), function (req, res) {
    findUser(req.body.accessKey, (err, result) => {
        if (err) {
            console.log(err)
            res.sendStatus(401);
        } else {
            if (result) {
                caesarShift(result, (resultencry, next) => {
                    var info = {
                        username: result.username,
                        country: Object.keys(result.api),
                        id: resultencry
                    }
                    res.send(info).status(200);
                })

            } else {
                res.sendStatus(401);
            }
        }
    })

})




app.post(prefix('/url'), function (req, res) {
    parseHtmlToServer(req, (err, result, domain) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        } else {
            res.send(result).status(200);
        }
    })
})



app.post(prefix('/stockCheck'), (req, res) => {


    stockCheck(req.body, (err, result) => {
        res.send(result).status(200)
    })
})




domainLookup.generate((err) => {
    if (err) {
        console.error(err)
    } else {
    }
})




app.post(prefix('/domain'), function (req, res) {

    domainCheck(req.body, (err, result) => {

        if (err) {
            console.log(err)
            res.sendStatus(500)
        } else {
            if (result.type === 'SERVER ERR') {
                res.sendStatus(401)
            } else {
                res.send(result).status(200)
            }

        }
    })

})

app.post(prefix("/record"), function (req, res) {
})

app.post(prefix("/new-extension"), function (req, res) {
    res.sendStatus(200);
});

app.post(prefix("/requestBackground"), function (req, res) {

})




server.on('request', app);
server.listen(config.port, function () {
    console.log('Listening on ' + server.address().port)
})
