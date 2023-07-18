const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = (isDev) => ({
	entry: path.join(__dirname, '../src/index.tsx'),
	mode: isDev ? 'development' : 'production',
	output: {
		filename: 'static/js/[name].[chunkhash:8].js',
		path: path.join(__dirname, '../dist'),
		clean: true, // w4 ： clean-webpack-plugin
		publicPath: '/'
	},

	module: {
		rules: [
			{
				test: /.(ts|tsx)$/,
				use: {
					loader: 'babel-loader' // 需要配置一下：所以得创建 react-x/.babelrc
				}
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'] // 常用写前面，提升寻找速度
	},

	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'), // 打完包，自动注入 这个文件夹，所以得创建 react-x/public/index.html
			inject: true
		})
	]
})
