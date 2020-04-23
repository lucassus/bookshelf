const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "none",
  entry: [
    "./src/index.tsx"
  ],
  output: {
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    runtimeChunk: "single",
    moduleIds: "hashed",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/"
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template: "index.html"})
  ]
}
