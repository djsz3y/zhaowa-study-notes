# 14:00 准时开始。
框架一般问什么？
1-2年：会熟练使用
- 生命周期，使用上的。
- 指令，use API

3-5年：
- 思想
- 方案，封装，亮点
- 性能
- 源码

5-7年：
- 框架无关，框架对比，核心思想（宿主环境）
- 源码，怎么样影响你的工作

> vue-2.6/src/core/instance/init.js

## 如果平时使用 react/vue，那么vue/react 是否需要很深入？
react -- 

1-2 年：
vue 你听说过，老师你好 vue 我了解过一些，我也简单看过一些 api 我感觉和 react 的生命周期很像，但是呢，我更熟练喜欢使用 react 里面的 hook ，听说 vue3 也有一些这种 useAPI ，但是没有深入了解过，就可以了，你要表达我是做 react 的，vue 我了解我听说过，我知道，但是呢，我确实没怎么了解，好吧，这个是 我认为 1-2 年人知道的方法，比较好。

3-5年：
- vue 没用过，怎么说？【第一个问题】
vue 这我简单的写过一些小 demo，自己create app 创建过，用下来感觉这些跨端的框架上原理可能都差不太多，包括一些生命周期啊，具体的思路啊，书写的东西不一样，vue的源码呢知道一点点，比如说 3-5年， react 是单项数据流，内部有 fiber 的这样的一些东西，我每次更新都相当于从头重新遍历，数据状态发生改变，来驱动我的整个fiber进行调度，改变这个结果。那 vue 我理解，他通过一些，vue2 vue3 是吧，它通过一些数据劫持监听到数据发生变化，去通知我的视图把值改了。我的感觉呢，react 呢其实灵活性更高一些，vue给我的感觉它的指令比较多，写起来自己用起来不是很习惯，不是很灵活，这样就可以了。大概了解一些 vue3 里有什么，vue2 里有什么，这块听过一些，看过一些网上的源码分析，大概知道一点点，但是确实实战经验不是很丰富。对吧，这是3-5年的。

5-7年：
都得熟悉，要对比，从多个方面去对比，这两个它的具体的一些逻辑，思想，方案，架构如何选型，比如说给你一个case 你是选 react 呢还是 vue ？那就要考虑这个 case 将来的一些场景，比如说当前团队的一些技术栈，数据的一些需求，综合考虑我到底是用 react 还是 vue ，5-7 年 与框架无关了，那你更喜欢谁，这块就得具体场景具体分析。面试官可能会挖坑说，react 好还是 vue 好，那就要看具体的场景，抛开场景看一个东西的优劣是没有意义的，那什么情况下我们选择 react ，什么情况下使用 vue ，如果说 vue 更好一些，我们需要用 react ，只能用 react ，那我们可能用 mobix ，我们做一些类似 vue 这样的一些东西，是 ok 的。 

## vue有哪些生命周期？ 以及各个生命周期做了些什么？

同学问题：vue生命周期的钩子怎么实现的？（vue-2.6/src/core/instance/lifecycle.js 的 callHook）  
生命周期是什么，就是我在执行整个流程的时候，我在什么阶段干什么事。

生命周期，就是我在一系列的流程中，在流程中间，插入一下代码片段，让它执行。
webpack plugin.

- beforeCreate
  - 组件的options 都未被创建，el, data, methods data computed 都还不能用
- created
  - 实例已经完成创建了，watch, event, data 初始化都完成了。没有挂载，$el 无法获取
- beforeMount
  - 现在数据已经被劫持了，下面是渲染到界面上去了
- Mounted
  - 已经完成渲染了，渲染完了做一些事情，比如说很多时候我们的数据处理，都是在这个阶段去把它做了。
  
  此时挂载，整个一个初始化阶段流程结束了。

- beforeUpdate
  - watcher（在 vue-2.6/src 搜索 "vm._render" ， "nexttick(flush" ）
  - 已经是 nextTick 了。

- updated
  - 已经经历了一系列的 patch, diff ，调用updated.（搜索 "callHook(vm, 'updated')" in scheduler.js）

- deforeDestory
  - 我在执行的销毁流程，之前有，现在没有了，之前v-for 有 10 个，现在有 5 个了，就会调用它。
  
- destoryed
  - 在一些清理逻辑完成以后，父子关系，watcher，（执行一些关闭。）

如果说，你想展示你对源码比较理解。

！展示了解源码（面试不是一问一答Q&A，而是通过和你的交流了解你对哪里熟悉！你自己要放轻松。比如开放题，问你我在处理这些地方有哪些思路，你能想到一些的时候，你也可以反问面试官，哎你这个面试题挺有意思的，我也想听听您的思路学习一下，面试官跟你聊一下你这个思路xxx，我们还可以基于它xxxxx，那你这样就稳了，你们在一起探讨工作啊~面试不是一问一答。）

源码里 init.js 明确写了，通过 callHook 这样的 api ，来实现各个生命周期的调用，比如你简单说一下这块看过一些源码，我知道beforeCreate 和 created 之间调用了一些代码。

## data是一个函数的原因以及如何理解 vue 的模块化？【vue2.js】
一起写一段代理。
```js
const data = { message: 'hello world' };

const com1 = new Vue({
    el: '#app1',
    data,
})

const com2 = new Vue({
    el: '#app2',
    data,
})

```
函数的作用域，data挂载到上面，而不是一个绝对的对象，就是为什么这里必须是函数，就是因为如果不是一个数据的话，内存是同一个，我改这个值的时候，相当于内容就串了，没有实现模块化。

补充解释：为什么平时 this.xxx 就能拿到 data 的值？  

写全 proxy vue2.js 17 行。

## vue的指令有哪些，如何书写自定义指令?【vue2-demo 工程里】
主要讲一下全局的。全局怎么注册？  
> vue2-demo/src/main.js

Vue 允许我们通过以全局注册和局部注册两种方式，添加自定义的指令。
```js
// el 直接要绑定的元素
// binding, 一个对象，包含：
  // name 
  // value
  // oldValue
  // arg
  // modifiers

Vue.directive('resize', {
  // 只调用一次，指令第一次绑定元素时调用，主要进行初始化
  bind(el) {},
  // 被绑定元素插入父节点的时候调用
  inserted() {},
  // 所在组件的Vnode 更新时调用
  update() {},
   // 所在组件的Vnode 更新后调用
  componentUpdated() {},
  // 只调用一次
  unbind() {},
})

```

```js
directives: {
    xxx: {
      bind() {},

    }
  }
```

v-copy
v-loadmore
v-preload
v-lazyload

v-debounce
v-throttle

v-draggable

更偏向于，给元素、组件，做功能增强；
而不是去组合、加工、处理元素。


## 组件间不同传参方式有何优劣？
有哪些？
1. props / $emit  - 用于父子组件之间通信
   - 优点
     - 简单，常见，props有类型检查
   - 缺点
     - 跨级上优缺点。

2. $ref / $children | $parent - 用于指向性通信
    - 优点
      - 能够拿到父子组件的实例的
    - 缺点
      - 难以维护，你是打破了数据封装的。
3. $attrs / $listener - 隔代等监听型通信
   - 常用对一些原生组件的一些封装

4. EventBus - 隔代、兄弟等非直接通信
   - $emit , $on
   - 优点
     - 原理简单，多层组件的事件传播
   - 缺点
      - 很难模块化
      - 多人开发，容易造成一些 Bug
      - $on .$off
5. provide / inject - 隔代广播等
  - 解决一层层传递的问题
  - 非响应式
6. vuex - 整体状态机
    - 多层组件的事件传播
    - 单项数据流
    - 统一状态管理
  
  平衡 熵 。一个系统的混乱程度。



## 什么是函数式组件，函数式组件注意项？


## vue是如何实现数据驱动双向绑定的？响应式是如何实现的？


## v-model的含义是什么？不同版本有何差异？
Vue2 就是一个语法糖
```html
<input :value="foo" @input="foo = $event.target.value" />
```
.sync 的修饰符
<input :value="foo" @update:value="foo = $event.target.value" />

Vue3
为了让 v-model 更好的针对多个属性进行双绑
1. 去掉了 sync， 原本的功能，由 v-model 来代替
2. 对自定义组件使用 v-model 时，value -> modelValue.

<input :value="foo" @update:modelValue="foo = $event.target.value" />

## vue3 和 vue2 Diff 对比
Vue3 使用了 最长上升子序列
runtime-core/src/renderer.ts 2494行
莱文斯坦最短编辑距离。
[c, d, e] 和 [d, e, h, c]
可能有一些新增的、删减的、需要移动的。
old new 的顺序，泛化成数字。
[2,3,4,2,1,5]

## computed 和 watch 有何异同
computed:
- 缓存，不支持异步，
- 一般一个属性，可以由其他属性计算而来，可以用。

watch:
- 无缓存，可异步
- immediate
- deep


## MVVM的含义以及如何实现一个迷你版MVVM框架？
model-view: render -- 双向绑定
view-model: DOM 监听


## vue3.0的特性有哪些？如何理解组合式编程？
- Proxy
- composition API
- patchFlag
- openBlock
- monorepo
- typescript

```html
<div>
    <div>hello</div>
    <div>{{msg}}</div>
</div>
```

## vue-router的核心功能？$route 和 $router 有何区别
$router 路由器，访问整个项目的路由结构
router.beforeEach()
router.afterEach()
router.push()
router.replace()
router.go()
router.back()
router.forward()

$route, 静态的信息。
fullpath, hash, meta, query, path, params



## vueX的状态管理流程？如何正确使用状态机


2021
  1000 人 -- 500个优秀的岗位。
2022
  1000 人 -- 200个优秀的岗位。
2023
  2000 人 -- 500个优秀的岗位。25%