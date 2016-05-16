import webpack from 'webpack';
import config from '../config';
import _debug from 'debug';
const paths = config.paths;
const debug = _debug('app:webpack:config');
const { __DEV__ } = config;
debug('Create Webpack Configuration', config);
debug('config.globals:', config.globals);

const webpackConfig = {
  name: '',
  resolve: {
    root: paths.src(),
    extendsions: ['', '.js']
  },
  entry: [
    paths.src('index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: paths.base('dist'),
    publicPath: '/'
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin(config.globals),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
export default webpackConfig;