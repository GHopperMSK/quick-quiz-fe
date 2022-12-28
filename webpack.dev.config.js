const path = require('path');

module.exports = {
  entry: './src/main.js',
  mode: 'development',
  output: {
    filename: 'QuickQuiz.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};