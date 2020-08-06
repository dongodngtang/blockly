const path = require('path');
module.exports = {
  target: 'electron-main',
  entry: path.resolve(__dirname, 'main.js'),
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: '[name].js'
  },
  mode: process.argv.includes('development') ? 'development' : 'production',
  node: {
    // 使用绝对路径
    __dirname: false,
  }
};