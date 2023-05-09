Vue 核心模块源码解析（上）

# 目标

Vue 核心模块源码解析

- 组件化的实现原理
- 响应式对象的创建，依赖收集、派发更新的实现过程
- event、v-model、slot、keep-alive、transition、
- transition-group 等常用功能的原理实现
- 深入理解响应式设计（⭐）

Vue3

- 手把手剖析 Vue3 核心源码
- 手写 Vue3 中 diff 算法属性比对及子元素比对流程（⭐）
- 从性能角度对比 vue2.0 与 vue3.0

# 理论

面试：proxy vs defineProperty()
追问：哪些数组方式是可以被感知的？
arr = [1,2,3,4,5,6]
arr[7] = 0

# 看源码

vue 源码

```js
// 艺术
|-src 源码
  |-compiler 编译相关
  |-core vue核心代码/vue核心入口

    |-index.ts

  |-platforms 跨平台的代码
    |-web weex
    |-server 服务端渲染（横杠）
  |-shared 共享工具方法
    |-constants.ts
    |-util.ts
  |-types
  |-v3
```

> index.ts
> 暴露 vue ：是主入口

initGlobalAPI 初始化全局

主入口即使有时监听，初始化，版本号。

1. 检查是否 dev， set，不能独立属性。

2. 响应式的 config 属性 Object.difineProperty(Vue, 'config', configDef)

完善 vue 核心工具和生态。
Vue.util
warn
extend
mergeOptions
defineReactive 定义一个被相应，可响应的值
4 板斧

set
delete
nextTick
observable
Vue.options = Object.create(null)

Vue.options.\_base = Vue //

<!-- window 传入， -->

initUse(Vue: GlobalAPI)——初始化 vue 插件的基座。

Vue.use 做什么？
传进来的插件（plugin）
挂载到自己身上，成为自己的一部分，调用插件的 install 方法，否则是个方法直接调用。

mixin。ts

initMixin

Vue.mixin——vue 底层能力 mergeOptions
mergeOptions

什么时候把配置合并到一起。

initMixin(Vue)

\_init

初始化了一个初始化
// merge options => 内外 merge
if (options && options.\_isComponent) {

```
    // expose real self
    // init为何划分层级
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
```

> create-element.js

if (typeof tag === 'string') {
是不是自定义组件。
动态组件
is component

stateMixin(Vue)

eventsMixin(Vue)

lifecycleMixin(Vue)

renderMixin(Vue)

# 友情链接

- [我的掘金主页](https://juejin.cn/user/1042768423037150)

- [我的 github 主页](https://github.com/djsz3y)

- [读书视频学习笔记](https://github.com/djsz3y/learning-notes)

- [爪哇学习笔记](https://github.com/djsz3y/zhaowa-study-notes)

- [bug 仓库](https://github.com/djsz3y/bug-repository)
