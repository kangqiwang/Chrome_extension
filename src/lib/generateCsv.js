var csv = require('csv');

module.exports = function(rows, next) {

    var headers = [];
    var lines = [];

    rows.map(function(row) {
        headers = Object.keys(row);

        var line = [];
        headers.map(function(key) {
            line.push(row[key]);
        });
        lines.push(line)
    });

    csv.stringify(lines, function(err, csvData){
        var result = headers.join(',') + '\n' + csvData;
        next(err, result)
    });

}
