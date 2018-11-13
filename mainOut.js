var fs = require('fs')
var data = ' www.kangqiwang.com'

var writerStream = fs.createWriteStream('output.txt')

writerStream.write(data,'UTF8')

writerStream.end()

writerStream.on('finish', function(){
    console.log(' write ')
})

writerStream.on('error', function(){
    console.log(err.stack)
})

console.log(' finish ')