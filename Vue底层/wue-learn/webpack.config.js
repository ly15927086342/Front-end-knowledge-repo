const path = require('path');

module.exports = {
  entry:{
    index: ['@babel/polyfill','./src/index.js'],
    // main:['@babel/polyfill','./src/main.js']
  },
  // entry:'./src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    }
    ]
  }
};