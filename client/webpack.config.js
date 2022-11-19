const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   entry: {
      index: "./src/pages/index/index.js",
      login: "./src/pages/login/login.js",
      signup: "./src/pages/signup/signup.js",
   },
   devServer: {
      static: "./dist",
   },
   devtool: "inline-source-map",
   output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
   },

   module: {
      rules: [
         {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
         },
         {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ["@babel/preset-env"],
               },
            },
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         title: "Note",
         template: path.resolve(__dirname, "src/pages/index/index.html"),
         filename: "index.html",
         inject: true,
         chunks: ["index"],
      }),
      new HtmlWebpackPlugin({
         title: "Note",
         template: path.resolve(__dirname, "src/pages/login/login.html"),
         filename: "login.html",
         inject: true,
         chunks: ["login"],
      }),
      new HtmlWebpackPlugin({
         title: "Note",
         template: path.resolve(__dirname, "src/pages/signup/signup.html"),
         filename: "signup.html",
         inject: true,
         chunks: ["signup"],
      }),
   ],

   mode: "development",
};
