const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../package/dist'),
    libraryTarget: 'commonjs'
  },
  devtool: false,
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    fallback: {
      string_decoder: require.resolve('string_decoder/'),
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'] // 仅移除 console.log
          },
          format: { comments: false }
        }
      }), // 压缩 JS
    ]
  },
  externals: {
    obsidian: 'commonjs2' // 排除 Obsidian API
  }
}
