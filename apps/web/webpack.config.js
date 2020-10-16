const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const PnpWebpackPlugin = require("pnp-webpack-plugin");

module.exports = {
  mode: "none",
  entry: ["./src/index.tsx"],
  devtool: "inline-source-map",
  output: {
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  optimization: {
    runtimeChunk: "single",
    moduleIds: "hashed",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  target: "web",
  resolve: {
    plugins: [PnpWebpackPlugin],
    extensions: [".ts", ".tsx", ".js"]
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)]
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } },
          "sass-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "ts-loader",
            options: { transpileOnly: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "src/index.html" })
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api/*": "http://localhost:4000",
      "/graphql": "http://localhost:4000",
      "/voyager": "http://localhost:4000"
    }
  }
};
