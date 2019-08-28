var path = require('path');

module.exports = {
    context: __dirname + "/src",
    entry: {
      app: './entry.js'
    },
    output: {
        path: __dirname + "/build/",
        filename: "app.js"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
          include: [
            path.join(__dirname, 'src')
          ],
          query:
          {
            presets:['react','es2015']
          }
        },
        {
          test: /\.less$/,
          loader: "style!css!less"
        }
      ]
    }
}
