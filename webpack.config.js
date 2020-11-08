var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
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
            options: { minimze: false },
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
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
        ],
      },
      {
        loader: 'url-loader',
        test: /\.(svg|eot|ttf|woff|woff2)?$/,
      }

    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: '' },
        { from: 'src/sw.js', to: '' },
      ],
    }),
  ],
};
