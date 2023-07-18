const getBaseCfg = require('./webpack.base')
const { merge } = require('webpack-merge')
const path = require('path')

module.exports = merge(getBaseCfg(false), {})
