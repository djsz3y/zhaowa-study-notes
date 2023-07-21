const getBaseCfg = require('./webpack.base')
const { merge } = require('webpack-merge')
const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

// 优化、压缩、分治
module.exports = merge(getBaseCfg(false), {
	optimization: {
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin({
				// 并行压缩
				parallel: true,
				terserOptions: {
					compress: {
						pure_funcs: ['console.log', 'console.warn'] // 生产环境 不能带上 console.log console.warn 等
					}
				}
			})
		],
		splitChunks: {
			// 缓存组
			cacheGroups: {
				vendors: {
					priority: 1,
					test: /node_modules/,
					name: 'vendors'
					// minChunk, chunks, minSize,
				},
				common: {
					name: 'commons',
					minChunks: 3
				}
			}
			// 面试官不会问具体的配置策略，因为有的配置策略 你自己也不好分析，大概知道有这些东西就行。
			// 还剩 cross-env
		}
	}
})
