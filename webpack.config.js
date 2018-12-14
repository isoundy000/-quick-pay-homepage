const path = require('path');
const config = require('config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const marked = require("marked");
const renderer = new marked.Renderer();

module.exports = {
  mode: 'production',
  entry: {
    ...(()=>{
      var pageList = config.get('pageList');
      var result = {};
      pageList.forEach(p => {
        result[p.chunks] = `./js/${p.chunks}.js`
      });
      return result;
    })()
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.[hash].js'
  },
  devServer:{
      // contentBase: path.resolve(__dirname, 'dist'),
      publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
             loader: 'css-loader',
            }
          ],
          publicPath: '../'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
      {
        test: /\.(htm|html|ejs)$/i,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.md$/,
        use: [
            {
                loader: "html-loader"
            },
            {
                loader: "markdown-loader",
                options: {
                  renderer
                }
            }
        ]
      }
    ]
  },  
  optimization: {
    splitChunks: {
      cacheGroups: {
        'vendors': {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        'commons': {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    ...(()=>{
      var pageList = config.get('pageList');
      var result = [];
      pageList.forEach(p => {
          result.push(new HtmlWebpackPlugin({
            filename: `${p.name}.html`,
            template: `!!html-withimg-loader!${p.name}.html`,
            chunks: ['vendors', 'commons', p.chunks],
            inject: true,
            minify:true
          }));
      });
      return result;
    })(),   
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        },
        output: {
          comments: false
        },
      },
      sourceMap: false,
      parallel: true
    })
  ]
};