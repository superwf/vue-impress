import webpack from 'webpack'
import merge from 'webpack-merge'
import OptimizeJsPlugin from 'optimize-js-plugin'
import config from '../config'
import baseConfig from './base'

const version = process.env.VERSION || require('../../package.json').version


baseConfig.entry = {
  'vue-impress': ['./src/index.js'],
}

export default merge(baseConfig, {
  output: {
    path: config.rootPath,
    filename: '[name].js',
    library: 'VueImpress',
    libraryTarget: 'umd',
  },
  vue: {
    loaders: {
      scss: 'css!sass',
    },
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new OptimizeJsPlugin({
      sourceMap: false,
    }),
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
  ],
})
