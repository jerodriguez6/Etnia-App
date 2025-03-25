module.exports = function override(config) {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        "stream": require.resolve("stream-browserify"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "zlib": require.resolve("browserify-zlib")
      }
    };
    return config;
  };