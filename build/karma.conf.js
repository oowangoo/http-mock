import { argv } from 'yargs';
import config from '../config';
import webpackConfig from './webpack.config.babel';
import _debug from 'debug';

const debug = _debug('app:karma');
debug('Create configuration.');

const karmaConfig = {
  basePath: '../', // project root in relation to bin/karma.js
  files: [
    `./${config.tests}/index.js`
  ],
  singleRun: !argv.watch,
  frameworks: ['jasmine'],
  reporters: ['progress'],
  preprocessors: {
    [`${config.tests}/**/*.js`]: ['webpack', 'sourcemap']
  },
  browsers: ['Chrome'],
  webpack: {
    resolve: webpackConfig.resolve,
    plugins: webpackConfig.plugins,
    devtool: 'inline-source-map',
    module: {
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /\.spec\.js$/,
          loaders: ['babel-loader', 'eslint']
        }
      ])
    },

  },
  webpackMiddleware: {
    noInfo: true
  },
  coverageReporter: {
    reporters: config.coverage_reporters
  }
};

// add coverage if enabled
if (config.coverage_enabled) {
  karmaConfig.reporters.push('coverage');
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.(js|jsx)$/,
    include: new RegExp(config.src),
    loader: 'isparta',
    exclude: /node_modules/
  }];
}

// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig);
