import { argv } from 'yargs';
import config from '../config';
import webpackConfig from './webpack.config.babel';
import _debug from 'debug';

const debug = _debug('app:karma');
debug('Create configuration.');

const paths = config.paths
const karmaConfig = {
  basePath: '../', // project root in relation to bin/karma.js
  files: [
    `./${config.tests}/index.js`
  ],
  singleRun: !argv.watch,
  frameworks: ['jasmine'],
  reporters: ['spec'], // ['multibrowser-summary'],
  preprocessors: {
    [`${config.tests}/**/*.js`]: ['webpack']
  },
  browsers: ['Chrome'],
  webpack: {
    resolve: webpackConfig.resolve,
    plugins: webpackConfig.plugins,
    module: {
      ...webpackConfig.module,
      preLoaders: webpackConfig.module.preLoaders,
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /\.spec\.js$/,
          loaders: ['babel-loader', 'eslint'],
          include: paths.base('tests')
        }
      ])
    },

  },
  webpackMiddleware: {
    noInfo: true
  },
  coverageReporter: {
    reporters: config.coverage_reporters
  },
  // multibrowser-summary options
  verboseReporter: {
    color: 'full',
    output: 'only-failure'
  }
};

// isparta 与 eslint 有冲突. isparta 编出后的文件会跑 eslint， 暂时不进行覆盖率检查
// add coverage if enabled
if (config.coverage_enabled) {
  karmaConfig.reporters.push('coverage');
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.(js|jsx)$/,
    loader: 'isparta',
    include: new RegExp(config.src)
  }, {
    test: /\.js$/,
    loader: 'eslint',
    include: paths.src()
  }];
}

// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig);
