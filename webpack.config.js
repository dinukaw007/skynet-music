var HtmlWebpackPlugin = require('html-webpack-plugin');
const { template } = require('lodash');
const path = require('path');

module.exports = {
   module: {
    rules: [
      {
        test: '/.html$/',
        use: [
          {
            loader: 'html-loader',
            options: { minimze: true },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {         
          name: '[name].[ext]',
          outputPath: 'images',
          publicPath: 'images',
          emitFile: true,
          esModule: false,
        }
      },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      {
        loader: "url-loader",
        test: /\.(svg|eot|ttf|woff|woff2)?$/
      }
    ],
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    })
  ],
};
