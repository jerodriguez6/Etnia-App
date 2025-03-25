const path = require('path');

module.exports = {
  // ... otras configuraciones de Webpack ...
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
    },
  },
  // ... otras configuraciones de Webpack ...
};