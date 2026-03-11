const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  // 指定为 Node.js 环境
  target: 'node',
  // 入口文件
  entry: './src/index.js',
  // 输出配置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    // 清理输出目录
    clean: true
  },
  // 排除 Node.js 内置模块和 node_modules
  externals: [nodeExternals()],
  // 模式：开发或生产
  mode: process.env.NODE_ENV || 'development',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  optimization: {
    minimize: false
  }
}
