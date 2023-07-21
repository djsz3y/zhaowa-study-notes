const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

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
			},
			{
				oneOf: [
					{
						// 定义，使用 xxx.module.(less|css)
						test: /.module.(less|css)$/,
						include: [path.resolve(__dirname, '../src')],
						use: [
							// 法Ⅰ：'style-loader'
							// 法Ⅱ：MiniCssExtractPlugin.loader

							// 我们一般情况下，在开发环境中，我们用 'style-loader', 方便我们做热更新。
							// 生产环境下，我们要放在单独的文件里。
							!isDev
								? 'style-loader'
								: MiniCssExtractPlugin.loader,
							{
								// 'css-loader',
								loader: 'css-loader',
								options: {
									importLoaders: 2,
									// 开启 css modules
									modules: {
										localIdentName:
											'[path][name]__[local]--[hash:base64:4]' // css module 最后生成什么文件
									}
								}
							},
							'postcss-loader',
							'less-loader'
						]
					},
					{
						test: /.(less)$/,
						use: [
							// 法Ⅰ：'style-loader'
							// 法Ⅱ：MiniCssExtractPlugin.loader

							// 我们一般情况下，在开发环境中，我们用 'style-loader', 方便我们做热更新。
							// 生产环境下，我们要放在单独的文件里。
							!isDev
								? 'style-loader'
								: MiniCssExtractPlugin.loader,
							'css-loader',
							'postcss-loader',
							'less-loader'
						]
					},
					{
						test: /.(css)$/,
						use: [
							// 法Ⅰ：'style-loader'
							// 法Ⅱ：MiniCssExtractPlugin.loader

							// 我们一般情况下，在开发环境中，我们用 'style-loader', 方便我们做热更新。
							// 生产环境下，我们要放在单独的文件里。
							!isDev
								? 'style-loader'
								: MiniCssExtractPlugin.loader,
							'css-loader',
							'postcss-loader'
						]
					}
				]
			},
			{
				// 图片文件
				// url-loader file-loader 在 webpack5 里已经集成了，所以不需要写进来了
				test: /.(png|jpg|jpeg|git|svg)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024
					}
				},
				generator: {
					filename: 'static/images/[name][ext]'
				}
			},
			{
				// 字体文件
				test: /.(woff|eot|ttf|otf)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024
					}
				},
				generator: {
					filename: 'static/fonts/[name][ext]'
				}
			},
			{
				// 媒体文件
				test: /.(mp4|mp3|webm)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024
					}
				},
				generator: {
					filename: 'static/medias/[name][ext]'
				}
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'], // 常用写前面，提升寻找速度
		alias: {
			'@': path.resolve(__dirname, '../src')
		}
	},

	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'), // 打完包，自动注入 这个文件夹，所以得创建 react-x/public/index.html
			inject: true
		}),
		new MiniCssExtractPlugin({
			// [content hash] - chunk hash - hash : 内容变了，我才有消除缓存的意义和价值。
			filename: 'static/css/[name].[contenthash:8].css'
		}),
		new webpack.DefinePlugin({
			// 有些代码 生产环境 不需要/进行特殊处理 ——使用 cross-env
			'process.env.PRIMARY': JSON.stringify(process.env.PRIMARY) // 注入
		})
	]
})
