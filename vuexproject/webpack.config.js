const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  watch: true,
  optimization: {
      minimizer: [
          new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true
          })
      ]
  },
  module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader"
        },
       {
         test: [/\.es6$/, /\.js$/, /\.json$/],
         exclude: /node_modules/,
         loader: 'babel-loader',
         query: {
           presets: ['vue','@babel/preset-env']
         }
       },
       {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(scss)$/,
          use: [{
            loader: 'style-loader', // inject CSS to page
          },{
            loader: 'sass-loader' // compiles Sass to CSS
          }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }
        ]
      },
      {
        test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'
      }
        // {
        //   test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        //   loader: 'file-loader',
        // },
        // {
        //   test: /\.(eot|svg|ttf|woff|woff2)$/,
        //   loader: 'url-loader',
        // }
    ]
  },
  resolve: {
     extensions: ['*', '.js', '.es6', '.scss']
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
      $ :'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      tether: 'tether',
      Tether: 'tether',
      'window.Tether': 'tether',
      Popper: ['popper.js', 'default'],
      'window.Tether': 'tether',
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: 'exports-loader?Util!bootstrap/js/dist/util'
    }),

    require('precss'),
    require('autoprefixer'),
    new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
            dead_code: true
        }
    })
  ]
}
