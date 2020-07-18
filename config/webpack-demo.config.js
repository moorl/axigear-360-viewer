const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "../examples/src/index.html"),
  filename: "./index.html"
});
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, "../examples/src/index.js"),
  output: {
    path: path.join(__dirname, "../examples/dist"),
    filename: "bundle[hash].js"
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
    htmlWebpackPlugin,
    new CopyPlugin({
      patterns: [
        { from: './examples/src/assets/img/', to: './img' }
      ],
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: 3001
  },
  devtool: 'source-map'
};