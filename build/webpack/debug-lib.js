import webpack from 'webpack'
import merge from 'webpack-merge'
import OptimizeJsPlugin from 'optimize-js-plugin'
import prodConfig from './prod-lib'

const devConfig = merge(prodConfig, {
  output: {
    filename: '[name].debug.js',
  },
  devtool: 'source-map',
});

devConfig.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new OptimizeJsPlugin({
    sourceMap: false,
  }),
];

export default devConfig
