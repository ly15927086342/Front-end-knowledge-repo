const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode:'development',
  entry:{
    index: ['@babel/polyfill','./src/main.js'],
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
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
      'file-loader',
      ],
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
    }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  plugins: [
  new CleanWebpackPlugin(),
  new htmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html'
  })
  ]
};