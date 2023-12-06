二十四、react.js 路由及状态同构

# 目标

- Vue Router 和 React Router 实现的区别
- React-router 详解
- 服务端渲染 & 异步组件 & spa
- 手写一个 react-router（⭐）
- 如何监听 url 的变化
- 如何匹配 path，按什么规则
- 如何渲染对应的组件

# react-router 

```js
function Engine(opt) {
  opt = {
    ...defaultOpt,
    ...opt
  }

  let _resolve
  let _reject

  let taskArr = []

  new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  }).then((res) => {
    shouldYield()
    // todo
  })

  function start() {}

  function end() {}
}

const engine = new Engine()
engine.start()

const useFormState = (initState, key) => {
  const [state, setState] = useState(initState)

  const warppedSetState = () => {
    // 假校验。
    setState()
  }

  return [state, wrappedSetState]
}
```

### 基于 react 的 Fiber 异步可中断的原理，设计缓存中间层，异步实时校验变更数据，QPS 降低 38%，给企业云服务器节约成本。

### Proxy 对数据变更 响应式更新。

### 什么是卷

业务需求、技术需求。

### 面向简历开发

## router

## 路由的介绍

### 什么是 Router，以及 Router 发展的历史。

路由这个概念，跟着 SPA 出现的。

- 路由的概念，是伴随 SPA 出现的。在此之前，页面的跳转是通过服务器端进行控制的；

服务端跳转。

### 路由分类
● history 路由
● hash 路由
● memory 路由 *


#### history 路由

history./\(go|back|replace|push|forward)/

#### hash 路由

window.location.hash = "xxx"

#### memory 路由

#### hash 路由 和 history 路由，有什么区别？

- hash 路由一般会携带一个 # 号，不够美观； history 理由就不存在这种问题；
- 默认hash路由是不会像浏览器发出请求的，主要是用于锚点
  - history -> go back forward 前进后退，都会像服务器服务请求
- hash 模式一般是不支持 SSR 的，history可以支持
- history 路由，在部署的时候，nginx，需要自己去处理页面跳转。

```sh
# 单个的服务器部署

```


### react-router
V6
#### react-router
提供核心的API 如：Router，Route，Switch这些，但是没有提供有关DOM跳转的API

#### react-router-dom

提供 BrowserRouter，HistoryRouter

## 路由的基本用法

## 传统路由的原理讲解与实现

## 实现一个简单的 react-router 