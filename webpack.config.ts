import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

const BASE_DIRS = {
  app: "./src-examples",
  dist: `./public`,
};

const webpackConfig: webpack.Configuration = {
  context: path.resolve(__dirname, BASE_DIRS.app),
  entry: "./index.tsx",
  output: {
    path: path.resolve(__dirname, BASE_DIRS.dist),
    filename: "[name]-[hash].js",
    chunkFilename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true, // ignore typescript type check, only do transform & compile
              compilerOptions: {
                target: "es5",
                module: "es6", // es module for webpack tree shaking
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: "raw-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React Rx Store",
      template: "./index.html",
    }),
  ],
  resolve: {
    modules: [__dirname, "node_modules"],
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  mode: (process.env.NODE_ENV as any) || "development",
};

export = webpackConfig;
