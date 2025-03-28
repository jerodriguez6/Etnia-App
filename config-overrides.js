const webpack = require('webpack');

module.exports = function override(config, env) {
  // Configura los polyfills para módulos de Node.js
  config.resolve.fallback = {
    ...config.resolve.fallback,
    assert: require.resolve('assert'),
    url: require.resolve('url'),
    stream: require.resolve('stream-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    zlib: require.resolve('browserify-zlib'),
    buffer: require.resolve('buffer'),
    process: require.resolve('process/browser.js'),
    crypto: require.resolve('crypto-browserify'),
    path: false,
    fs: false,
    os: false,
    module: false, // Deshabilita module
  };

  // Proporciona variables globales como Buffer
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser.js',
    }),
  ];

  // Asegúrate de que Webpack maneje correctamente los módulos ESM
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
    resolve: {
      fullySpecified: false, // Desactiva la resolución estricta de ESM
    },
  });

  // Desactiva source-map-loader para evitar errores con archivos que no tienen source maps
  config.module.rules = config.module.rules.map(rule => {
    if (rule.loader && rule.loader.includes('source-map-loader')) {
      return {
        ...rule,
        exclude: [/node_modules/], // Excluye node_modules de source-map-loader
      };
    }
    return rule;
  });

  return config;
};