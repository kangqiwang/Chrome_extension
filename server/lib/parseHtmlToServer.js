var parseHtml = require('./parseHtml');

var updateToDatabase = require('./updateToDatabase')



module.exports = (req, next) => {

    parseHtml(req, (err, result, domain) => {
        if (err) {
            console.error(err)
            next(err)
        } else {
            
            //  console.log(result)
            //  console.log(result.data.length)
            
            if (result.data.length > 0) {

                updateToDatabase(result.data)
            }else{
                
            }
            next(null, result)

        }

    })

    //}, 1000)
}