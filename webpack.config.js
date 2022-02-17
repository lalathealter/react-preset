const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require("eslint-webpack-plugin");

let mode = process.env.NODE_ENV
console.log("mode active: " + mode)


module.exports = {
  mode: mode,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: "/",
  },
  
  devtool: 'source-map',
  devServer: {
    static: './dist',
    hot: true,
    historyApiFallback: true,
  },
  target: mode === "development" ? "web" : "browserslist",

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.png',
      
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[id].css',
    }),
  ],
  performance: { hints: false },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  
  resolve: {
    extensions: [".jsx", ".js", ".sass", ".scss", ".css", ".json", "..."]
  },

  module: {
  	rules: [
      { 
        test: /\.(html)$/, 
        use: ['html-loader'] 
      },

      { 
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                '@babel/preset-env', 
                '@babel/preset-react'
              ],
            }
          },
          
        ]
      },
      
      { 
        test: /\.(s[ac]ss|css)$/i, 
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'postcss-loader',
          'sass-loader',
      ]},

      {
        test: /\.(jpe?g|gif|svg|webp)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource'
      },
      {
        test: /\.(png)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
    
  },

}