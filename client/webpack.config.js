const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   entry: {
      index: "./src/pages/index/index.js",
      login: "./src/pages/login/login.js",
      signup: "./src/pages/signup/signup.js",
      about: "./src/pages/about/about.js",
      notFound: "./src/pages/notFound/notFound.js",
      guest: "./src/pages/guest/guest.js",
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
      new HtmlWebpackPlugin({
         title: "Note",
         template: path.resolve(__dirname, "src/pages/about/about.html"),
         filename: "about.html",
         inject: true,
         chunks: ["about"],
      }),
      new HtmlWebpackPlugin({
         title: "Note",
         template: path.resolve(__dirname, "src/pages/guest/guest.html"),
         filename: "guest.html",
         inject: true,
         chunks: ["guest"],
      }),
      new HtmlWebpackPlugin({
         title: "Note",
         template: path.resolve(__dirname, "src/pages/notFound/notFound.html"),
         filename: "notFound.html",
         inject: true,
         chunks: ["notFound"],
      }),
   ],

   mode: "development",
};
