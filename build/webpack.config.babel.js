import webpack from 'webpack';
import config from '../config';
import _debug from 'debug';
const paths = config.paths;
const debug = _debug('app:webpack:config');
const { __DEV__ } = config;
debug('Create Webpack Configuration', config);
debug('config.globals:', config.globals);

const webpackConfig = {
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
  // devtool: "source-map",
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      include: paths.src()
    }],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: paths.src()
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new webpack.NoErrorsPlugin()
  ]
}
export default webpackConfig;