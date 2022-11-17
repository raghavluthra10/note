const path = require("path");

module.exports = {
   entry: path.resolve(__dirname, "src/index.js"),
   devServer: {
      static: "./dist",
   },
   devtool: "inline-source-map",
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index_bundle.js",
      library: "$",
      libraryTarget: "umd",
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
   mode: "development",
};
