module.exports = function(data) {
    var simple = [];
    data.map(function(d) {
        var simpleObj = {}
        simpleObj.barcode = d.barcode;
        simpleObj.name = d.name;
        simpleObj.price = d.price;
        simpleObj.url = d.url;
        simpleObj.affilaiteUrl = d.url;
        simple.push(simpleObj);
    })
    return simple;
}
