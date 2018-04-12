require('now-env'); // eslint-disable-line import/no-unassigned-import
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  webpack: config => {
    config.plugins.push(new webpack.DefinePlugin({ 'process.env.API_URL': JSON.stringify(process.env.API_URL) }));
    return config;
  },
};
