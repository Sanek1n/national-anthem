const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    main: './pages/main/main.js',
    // game: './nationalanthem/src/pages/main/index.js',
    // results: './nationalanthem/src/pages/result/index.js'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist','pages','main')
  },
optimization: {
  chunkIds: 'named',
  minimize: false,
},
  plugins: [
    new HTMLWebpackPlugin({
      template: './pages/main/main.html',
      chunks: ['main'],
      scriptLoading: 'defer'
    }),
  ]
}