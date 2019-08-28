const qName = 'sm-monitor-user'
const Q = require('x4-q').q
const qProcess = new Q({}, qName)

let message = {
    jobId: newJob.jobId.toString(),
    userId: data.userId
}

qProcess.send("CHROME_SEARCH", message, (err, resp) => {
    if(err) {
        console.error(err)
    } else {
        process.exit();
    }
    
})
