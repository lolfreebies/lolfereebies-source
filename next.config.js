/* eslint-disable import/no-commonjs */
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  exportPathMap: function(defaultPathMap) {
    return {
      '/': { page: '/' }
    }
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };
    config.module.rules.push({
      test: /\.css$/,
      loader: ['style-loader', 'css-loader', 'postcss-loader'],
    });
    if (config.resolve.alias) {
      delete config.resolve.alias.react;
      delete config.resolve.alias['react-dom'];
    }
    return config;
  },
});
