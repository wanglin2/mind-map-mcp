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
    library: {
      type: 'module'
    },
    // 清理输出目录
    clean: true
  },
  experiments: {
    outputModule: true // 启用 ES Module 输出
  },
  // 排除 Node.js 内置模块和 node_modules
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, 'node_modules'),
      importType: 'module' // 指定外部依赖的导入类型
    })
  ],
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
