const path = require('path');

module.exports = {
  entry: './js/game/game.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.js'
  }
}