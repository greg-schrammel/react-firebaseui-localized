const path = require("path");

module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.resolve("dist"),
    filename: "index.js",
    library: "react-firebaseui-localized",
    libraryTarget: "umd",
    publicPath: "/dist/",
    umdNamedDefine: true,
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-react"]
        }
      }
    ]
  },
  resolve: {
    extensions: [".js"],
    alias: {
      react: path.resolve(__dirname, "./node_modules/react")
    }
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    }
  }
};
