
module.exports = (paload, next) => {
    var result = "";
    for (var i = 0; i < paload.length; i++) {
        var c = paload.charCodeAt(i);
        if (65 <= c && c <= 90) result += String.fromCharCode((c - 65 + 3) % 26 + 65);  // Uppercase
        else if (97 <= c && c <= 122) result += String.fromCharCode((c - 97 + 3) % 26 + 97);  // Lowercase
        else result += paload.charAt(i);  // Copy
    }
    next(result);


}