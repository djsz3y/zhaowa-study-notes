const getBaseCfg = require('./webpack.base')
const { merge } = require('webpack-merge')
const path = require('path')

console.log('PRIMARY:', process.env.PRIMARY)

module.exports = merge(getBaseCfg(true), {
	// dev 所以给 true
	devtool: 'source-map', // 源码调试
	devServer: {
		port: 3000,
		compress: false, // 压缩
		hot: true, // 热更新
		historyApiFallback: true, // 解决 404 的问题
		static: {
			directory: path.join(__dirname, '../public')
		}
	}
})
