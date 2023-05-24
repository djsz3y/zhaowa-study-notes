// const { injectBabelPlugin } = require('react-app-rewired')
// const { override, fixBabelImports } = require('customize-cra')
// // module.exports = function override(config, env) {
// //   //do stuff with the webpack config...
// //   config = injectBabelPlugin(['import', {libraryName: 'antd', style: 'css'}], config);
// //   return config
// // }
// module.exports = override(
//   fixBabelImports('import', {
//     libraryName: 'antd-mobile',
//     style: 'css'
//   })
// )

// 参考链接：https://blog.csdn.net/xh_jing/article/details/107570926
const path = require('path')
const {
  override,
  addDecoratorsLegacy,
  disableEsLint
} = require('customize-cra')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const customize = () => (config, env) => {
  config.resolve.alias['@'] = resolve('src')
  if (env === 'production') {
    config.externals = {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  }

  return config
}

module.exports = override(
  // enable legacy decorators babel plugin
  addDecoratorsLegacy(),

  // // disable eslint in webpack
  disableEsLint(),
  customize()
)
