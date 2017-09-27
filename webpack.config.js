var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');
var extractPlugin = new extractTextPlugin({
  filename: 'main.css'
});

module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['env'] }
          }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'scss-loader']
        })
      }
    ]
  },
  plugins: [extractPlugin],
  devServer: {
    contentBase: path.resolve(__dirname, "/src")
  }
}
