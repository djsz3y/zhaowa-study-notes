# Vue 实战

## 目标

- vue-cli4 介绍
- 服务端渲染 server-side-render
- vue.config.js 配置介绍
- vue.config.js 更改 webpack 配置
- 项目实战：vue + ts 重写今日头条（⭐）
  1. 使用 vue-cli 脚手架创建项目
  2. 使用 vue 和 vuex 进行数据整体管理
  3. 对比 ES6 项目实战和 Vue 重构后的区别

## course

c 侧

b 侧

- 大 b 侧
  - saas CRM
    - 亮点 or 难点 ——> 复杂模块 & 缺失哪些？（上报 队列 多次请求合并 一次请求报错，其他没有）
    - 完整的应用体系
      - 模块分离
      - 通用组件结构
      - 底层功能支持
    - 支持体系
      - 套餐权限（设计怎么做）
      - 安全体系（、csrf）
      - 监控体系（面向开发者：报错，上报哪个用户；面向用户：功能性保障、产品发展保障。）
- 小 b 侧
  - 内部系统：简洁稳定、迭代迅速

空项目

规划场景

设计业务和架构
（权限、白屏体验、ajax 接口会被拦截。制出模板、工程化文件做配置）

1. UI 层

```js
// 引入型UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 按需加载型UI
```

面试：按需加载的处理方式
分布式、页面模块直接按需加载
一个页面维护所有按需加载的文件。
组件的异步加载优化：如果没有访问到这个，对于其他页面就是浪费。要考虑页面中加载。

> main.js

```js
import router from './router'

new Vue({ el, router, render })
```

> router/index.js

```js
import Router from 'vue-router'
import HelloWorld from './'
import Vue from 'vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      meta: 'main'
    }
  ]
})
// 路由完成了，做模块分离
```

主模块 core
通用组件结构 shared
共享组件用 fragments

> core/HelloWorld.vue

```html
<template>
  <div class="hello">
    <div class="main-content"></div>
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16"></el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>
```

> App.vue

```html
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
```

底层功能支持-存储-vuex

> store/index.js

```js
import Vuex from 'vuex'
import main from './modules/main' // 逻辑分包
import Vue form 'vue' // 挂载

// 处理app以及主页所有信息

const store = new Vuex.Store({
  state: {},// 当前真正存储的状态
  modules: {
    main
  },// state 可以分模块
  // mutation：{},// 触发处理
  // actions: {}// 改值
})
```

> store/modules/main.js

```js
const state = {}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

页面、store、router 路由每一个都可以快速找到 mapping 上。

公司
职位
公司信息

接口复用整合聚合

一个接口通过当前表格信息

财务看财务，后台统一接口
权限接口
带上权限信息请求接口 // 接口串联

接口并联

接口适配

很多数据数据处理。

bff、胶水层

2. 网络层

> main.js

```js
import shared from './shared'
```

> shared/ajax.js

```js
// 网络层内容

// 1.功能配置
// 上报、监控
window.trace = (key, value) => {
  // 上报网络层 ready
}

// 全局变量获取
// 从ua抓取（当前版本等信息）
window.env = {}

// 2.网络配置
if (!Vue.prototype.$ajax) {
  // 1. 安全配置
  // 面试题：如何规避跨站攻击csrf问题？
  // csrf key，前后端的额外标识。
  const CSRF_KEY = '_csrf'
  // 模拟后台往cookie中注入的码
  const cMap = {
    _csrf: 'klargiakdkfaksldflgjgskl',
    _token: 'glofldgjddgjhadkumvdtyeuyf'
  }

  // 登录超时
  let lastRequestSettings = [] //上次发送没有发送出去的东西
  let going = false // 是否断点续传

  // 面试：如何拦截请求做通用参数补充
  // 拦截器配置
  axios.interceptors.request.use(function (config) {
    // 请求上报
    window.trace('request', Date.now(), config.params) //

    let csrf = cMap[CSRF_KEY]
    if (csrf) {
      switch (config.method) {
        // 面试线
        case 'get':
        case 'delete':
        case 'options':
          config.params = config.params || {}
          config.params[CSRF_KEY] = csrf
          break

        case 'post':
        case 'put':
          config.data = config.data || {}
          if (typeof config.data === 'string') {
            let str = config.data
            try {
              config.data = JSON.parse(str)
            } catch (e) {
              config.data = str
            }
          }
          config.data[CSRF_KEY] = csrf
          break
        default:
          break
      }
    }
    return config
  })

  axios.interceptors.response.use(function (res) {
    return res
  }, function (err)=> {
    // 面试点：登录态超时处理逻辑？
    // => 1. 约定好登录超时 code => 2. 做相应处理
    let url = error && error.config && error.config.url

    // a.支持数据接口返回数据
    // code === 3 表示登录态过期
    if(url) {
      if(error.code === 3){
        error.status = 508
      } else{
        error.status = 608
      }
    }
    // 错误上报
    window.trace('error', Date.now(), error)
    // b.状态码返回过期
    if(error.status === 508){
      // 登录过期操作
    }
  })

  // 断点续传（上次请求，再重新请求）
  axios.goon = function() {
    let len = lastRequestSettings.length
    let defers = []
    let config

    if(len === 0 || going){
      return
    }

    // 续传上报
    window.trace('goon', Date.now())

    // 防止ajax 同组多次触发
    going = true
    for(let i = 0; i < len; i++){
      // 重发的请求不再进行存储
      config = lastRequestSettings[i]
      config.ignore = true

      // 重发队列组装
      (function(config){
        let defer = axios.request(config)

        defer.then(data => {
          config.promise.resolve(data)
        }, error => {
          error && error.status !== 508 && config.promise.reject(error)
        })

        defers.push(defer)
      })(config)
    }

    Promise.all(defers).then(()=>{
      lastRequestSettings = []
      going = false
    }).catch(()=>{
      going = false
    })

    // axios 重发报错，依然不成功，不能重复提交
    return axios
  }

  Vue.prototype.$ajax = axios

}

export default Vue.prototype.$ajax
```

如何做 mock 数据

> mock/server.js

```js
import Mock from 'mockjs'
import api from './bm/api'

// 1. 本地服务
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

// 路由配置
var router = express.Router()

router.use('/bm/', require('./bm/api.js'))

// 网络请求配置
app.get('/', function (req, res) {
  res.send('mock test')
})

app.use('/mock', router)
app.listen(3000)


// 2.静态mock
const { mock } from Mock
//匹配相应规则
mock(/\api\/users\/login/, 'get', api.getList)
```

> mock/bm/api.js

```js
function getList(req) {
  return {
    code: 200,
    data: {
      list: [
        {
          name: Radom.cname(),
          uid: Random.guid(),
          age: Random.integer(18, 50)
        }
      ],
      message: 'success'
    }
  }
}

export default {
  getList
}
```

模块怎么做抽离

模块之外

上报监控：sdk 清理端、数据处理端 展示端

// 前端定协议 的主推流程

整个项目把握程度

## 四、项⽬实战初始化

### 4.1 利⽤ vue-cli 初始化⼀个 vue 项⽬

1. 样式初始化
2. 功能模板初始化

### 4.2vue 项⽬常⻅业务功能配套以及配置结构

1. loaders，package.json，打包，路由，存储……
2. ⽂件结构，产出配置

### 4.3vue 项⽬常⻅开发辅助功能配套以及配置

1. Eslint，babel……
2. 配置⽅式

## 五、企业级 Saas 系统的重点原理

### 5.1 抽象（设计⼀致性）

1. 系统级别抽象 - 分层设计
2. 业务内容抽象 - 战区 / 模块
3. 功能服务抽象 - 功能代码 / 服务代码

### 5.2 安全（⽹络、登录）

1. ⽹络体系 - 功能性⽀持/mock 服务/跨站点通信
2. 登录体系 - 登录态 / 登录弹框 / 超时登出
3. 安全体系 - XSS / CSRF

### 5.3 拓展

1. 上报 / 性能监控
2. 边缘状态展示（404 ⻚、抽象中转⻚）

## 友情链接

- [我的掘金主页](https://juejin.cn/user/1042768423037150)

- [我的 github 主页](https://github.com/djsz3y)

- [读书视频学习笔记](https://github.com/djsz3y/learning-notes)

- [爪哇学习笔记](https://github.com/djsz3y/zhaowa-study-notes)

- [bug 仓库](https://github.com/djsz3y/bug-repository)
