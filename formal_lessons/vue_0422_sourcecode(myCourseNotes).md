# Vue.js 核心模块源码解析（上）

## 理论

面试：proxy vs defineProperty()
追问：哪些数组方式是可以被感知的？
arr = [1,2,3,4,5,6]
arr[7] = 0

## 看源码

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

完善vue核心工具和生态。
Vue.util 
warn
extend
mergeOptions
defineReactive 定义一个被相应，可响应的值
4板斧

set
delete
nextTick
observable
Vue.options = Object.create(null)


Vue.options._base = Vue // 
<!-- window 传入， -->

initUse(Vue: GlobalAPI)——初始化vue插件的基座。

Vue.use 做什么？
传进来的插件（plugin）
挂载到自己身上，成为自己的一部分，调用插件的install方法，否则是个方法直接调用。

mixin。ts

initMixin

Vue.mixin——vue底层能力 mergeOptions
mergeOptions

什么时候把配置合并到一起。

initMixin(Vue)

_init

初始化了一个初始化
    // merge options => 内外 merge
    if (options && options._isComponent) {

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