const path = require('path');
const webpack = require('webpack');
const pkg = require('../package');

const now = new Date();
const banner = `
 ${pkg.name} v${pkg.version}
 ${pkg.repository.url}
 ${pkg.description}
 Copyright (c) 2020 ${pkg.author}
 Released under the ${pkg.license} license
 Based on "js-cloudimage-360-view 2.4.1", Copyright (c) 2019 scaleflex, provided under MIT license
 Date: ${now.toISOString()}
`;


module.exports = {
  entry: path.join(__dirname, "../src/index.js"),
  output: {
    path: path.join(__dirname, "../build"),
    filename: `${pkg.name}.min.js`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner),
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};