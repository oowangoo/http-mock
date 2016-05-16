import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from '../build/webpack.config.babel.js'
import _debug from 'debug'

const debug = _debug('app:server')
const compiler = webpack(webpackConfig)
const server = new WebpackDevServer(compiler, {
  publicPath: webpackConfig.output.publicPath,
  hot: true
})

export default server
