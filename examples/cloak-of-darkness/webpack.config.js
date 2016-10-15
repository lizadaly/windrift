var webpack = require('webpack');

module.exports = [{
  context: __dirname,
  entry: "./index.js",
  output: {
    path: __dirname + "/build",
    filename: "cloak.js"
  },
  externals: {
    "windrift": "Windrift"
  },
  module: {
    loaders: [{
        test: /.js/,
        loaders: ['babel?cacheDirectory']
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
}
];
