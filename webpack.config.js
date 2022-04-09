module.exports = {
    resolve: {

        fallback: {
       
          fs: false,
          'stream': require.resolve('stream-browserify'),
          'buffer': require.resolve('buffer/'),
          'util': require.resolve('util/'),
          "http": require.resolve("stream-http"),
          'assert': require.resolve('assert/'),
          "os": require.resolve('os-browserify/browser'),
          "https": require.resolve("https-browserify")
       
        },
       
       },
}