var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');
var extractPlugin = new extractTextPlugin({
  filename: 'main.css'
});

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './src/dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
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
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: extractPlugin.extract({
          use: ['css-loader']
        })
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  plugins: [extractPlugin],
  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
  }
}
