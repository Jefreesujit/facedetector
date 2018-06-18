module.exports = env => {
  return {
    entry: [
      './src/index.js'
    ],
    output: {
      filename: './build/index.build.js'
    },
    module: {
      loaders: [{
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      }, {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      }]
    },
    devtool: 'inline-source-map'
  };
};