var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var env = 'production'

const version = process.env.VERSION || require('../package.json').version

delete baseWebpackConfig.entry

var webpackConfig = merge(baseWebpackConfig, {
  entry: {
    'vue-impress': './src/index.js',
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    library: 'VueImpress',
    libraryTarget: 'umd',
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('css'),
      scss: ExtractTextPlugin.extract('css!sass'),
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions'],
      })
    ],
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue',
      var: 'Vue',
    },
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.BannerPlugin(
`/*!
 * Vue Material v${version}
 * Made with love by Marcos Moura
 * Released under the MIT License.
 */`
    , {
      raw: true,
      entryOnly: true,
    }),
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
