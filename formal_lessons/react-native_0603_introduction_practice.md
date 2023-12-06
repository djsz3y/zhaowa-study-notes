二十五、RN 入门与实战（上）

# 目标

- RN 与 Flutter 对比
- RN 新架构详解
- 重写 React-dom 实现跨端原理讲解与渲染器实战
- RN 环境搭建与部署
- RN 路由介绍与实战
- RN 咨询列表、图标、多媒体应用实战

## 上节课补充

- vdom
- current Fiber ~ wip Fiber
  - fiber --> staticNode
- DOM

# react native

## 目标

P6：

- 会使用 RN，了解 RN 同类别的产品，了解移动端一些主要的技术方案。

P7：

- 知道 一般 前端和客户端的通信方案、混合方案
- webview 的一些原理
- 能够做跨端方案的设计

一杆到底：

- 低代码
- WebGL / three.js
- 富文本编辑器
- canvas
- 前端智能 - TensorFlow.js
- rust webAssembly

P6 升 P7 需要有一些技术影响力，能解决一些问题，别人短时间内学不会这个技术。

## 如何做一个跨端方案的设计/方案的设计？

P7 很有可能是职业的天花板。

### 需求是什么？

什么样的场景，解决什么样的问题？
拆解成一个一个的子问题。

### 目前业界有哪些成熟的技术？

- 微前端
  - SPA
  - qiankun
  - 飞冰
  - microapp
- iframe
- a - href
- 模块联邦
- shadow dom

分析出每一个技术方向的，优劣。

### 结合当前的场景，如何**设计**一套自己的方案。

### 针对于这个方案，你当前的规划，和业务收益

### 针对于这个方案，后续的规划，和业务收益

P7

## 跨端的方案。

我在手机

跨端有哪些方案？

## react native

### 原理

```js
console.log('hello world')
```

#### 引擎

引擎、负责翻译，console.log 是要进行打印的，

#### 宿主环境提供了一个这样的 api 让你去调用。

- 浏览器：DOM，BOM window，screen，navi，history，document
- node: fs ,path, http
