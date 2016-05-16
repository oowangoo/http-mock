import _debug from 'debug'
import path from 'path'
import { argv } from 'yargs'

const debug = _debug('app:config:base')

const config = {
  env: process.env.NODE_ENV,
  api: process.env.API,

  base: path.resolve(__dirname, '../'),
  dist: 'dist',
  src: 'src',
  tests: 'tests',

  host: 'localhost',
  port: process.env.PORT || 4000,
}

config.globals = {
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__DEBUG__': config.env === 'development' && !argv.no_debug
}
const setPathsToConfig = () => {
  const resolve = path.resolve
  const base = function (...args) {
    return resolve.apply(resolve, [config.base, ...args])
  }
  config.paths = {
    base: base,
    src: base.bind(null, config.src),
    dist: base.bind(null, config.dist)
  }
}
setPathsToConfig()
export default config;
