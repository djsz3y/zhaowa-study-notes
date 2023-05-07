Vue 基础用法

# 目标

Vue 基础用法

- vue.js 简介
- vue.js 模版及指令
- vue.js 事件/数据绑定
- vue.js 组件化
- 标签中的新属性
- vue.js 组件
- 生命周期

# 一、Vue 简介

## 1.1 前端框架进化史

### 1.1.1 目标：

1. 简单聊聊对于 MVVM 的了解<span style="color:red;">（面试题）</span>
   - （主干与旁支，发家史，进化史）、产生过程、重点是什么
2. Vue 框架与 MVVM

### 1.1.2 语义化模板（可读性）

- HTML5，HTML 版本更新，加的最多的是语义化模板，在前端不停增加地位。
  都有各自特有的能力。

- 对于 HTML 语义化，要对人、对机器可读、好读：

  1. 让人更容易读懂（增加代码可读性）
  2. 让搜索引擎更容易读懂（SEO）

- list、ul、li 各自有自己的能力，同时语义化拥有更好的可读性，比如：

```html
<h1>标题</h1>
<div>
  <p>文字</p>
  <ul>
    <li>列表1</li>
    <li>列表2</li>
  </ul>
</div>
```

- 而逐渐复杂的交互 => 拆分：视图层、逻辑层、数据处理层 => MVC

### 1.1.3 MVC（Model View Controller）（模型-视图-控制器）

对于 MVC：

#### 1.1.3.1. MVC（Model View Controller）（模型-视图-控制器） => （对整体）设计认知 （软件设计规范）

#### 1.1.3.2. 不同范畴（不同维度）具有不同含义：

##### 1.1.3.2.1. **观点 1**——jQuery 是 MVC（纯前端角度理解 MVC 所处理的能力）：

- Model：数据结构（数据驱动页面，现在数据和页面都是设计成层级是统一的，页面有一行表格，数据设计成数组里有一个对象，这样数据和视图是对应的。）（以前使用 jQuery，数据和页面是分开的，数据和页面没有任何关系，Model 层是纯粹从后台拿到数据后，存储、解析拼装数据。）
- View：视图、template(for Vue，layout、style)
- Controller：解析到的数据 set 到视图上（jQuery 是$.attribute/$.value）。

##### 1.1.3.2.2. **观点 2**——jQuery 是前端框架，加上后台接口、中转层 controller 加起来才是 MVC 的东西（上升维度：整个应用、前后端加在一起的层级，应用整合、应用架构角度理解 MVC）

- Model：就是底层的数据、读的数据表
- View：整个前端领域可以抽象成视图，或者说是视图的一部分，后台的接口是渲染驱动视图的，也可以并到 View 层里来。
- Controller：路由、路由提供的接口、路由跳转中转、鉴权权限等。

### 1.1.4 MVVM（Model-View-ViewModel）（数据、状态-视图-数据视图绑定层）

而对于现在主流的 MVVM：

#### 1.1.4.1. MVVM（Model-View-ViewModel）（数据、状态-视图-数据视图绑定层）（对主流框架有使用经验和了解）

#### 1.1.4.2. ViewModel 是 MVVM 所特有的数据视图绑定层。每个框架的实现用的发布订阅。

#### 1.1.4.3. ViewModel 所代表的思想：

##### 1.1.4.3.1. 数据会绑定在 viewModel 层，并且会直接驱动数据到页面的渲染 => 自动 trigger 的功能（视图增加的第一层自动化）：

- 自动 trigger 的功能：MVVM 和 jQuery 最大区别：jQuery 的数据都需要手动调用$dom 的名字.value = xxx，把数据替换掉现有的 dom 的数据。
- 数据变化 + 视图绑定数据变量 => 视图数据变量，自动发生变化

##### 1.1.4.3.2. （数据 -> 视图，数据变化到视图变化：vue-{{}}，react-setState、小程序-setData）

视图变化时，同时也会通知到 viewModel 层：

- View 变化 => ViewModel 同样可以拿到回调
- （在主流框架 Vue、React 里就是相应的 hook，相应的 hook 回来，告诉我们某个事件函数被触发了，hook 到相应的所写的函数里。）。

#### 1.1.4.4. ViewModel 的作用（与 MVC 的差别就在于 ViewModel）：

- 所以，ViewModel 不仅有 Controller 的作用，实际在 Controller 里增加了双向的发布订阅，或者说利用发布订阅机制实现自动化的 Controller。
- View 变化，VM 知道 hook 出去；Model 变化，触发 VM，在 View 中找 Model 相应绑定的变量。

#### 1.1.4.5. TODO：

- 了解 MVVM 究竟是什么，跟 MVC 究竟的差别，就在于 ViewModel。

## 1.2 Vue 简介

### 1.2.1 目标：

1. Vue 思想以及发展史
2. Vue 项目写法介绍

### 1.2.2 vue 是如何利用 mvvm 思想进行开发的？

数据的双向绑定（如何利用 mvvm，特点）

1. 利用花括号 => 若干正则进行 template pass（正则条件判断）
2. 通过视图绑定事件 => 依赖收集、不同 trigger

### 1.2.3 生命周期

#### 1.2.3.1 vue 生命周期？<span style="color:red;">（面试题）</span>生命周期有哪些？

beforeCreate => created => beforeMount => mounted  
=> beforeUpdate => updated  
=> beforeDestroy => destroyed

#### 1.2.3.2 bC 和 c 区别<span style="color:red;">（面试题）</span>（vue2 VS vue3）：

##### 1.2.3.2.1. 【vue2】：bC：new Vue() - 初始化类、挂载属性（新建 vue 实例，实例挂载功能）

##### 1.2.3.2.2. 【vue2】：c：

###### 1. merge options 的操作：

- Vue 相应的配置合并到新建的实例上的过程。
- options 指的是：data（本地数据）、props（父到子传递的数据）、methods（当前实例所需使用的方法）、computed（当前所实时计算的属性）

###### 2. bC 到 C 所作的事情也就是：

- 数据操作和属性合并 => 不涉及到 vdom 和 dom 的方法处理。

###### 3. 陷阱：$ref 是在这里做的吗？

- 任何对 dom 和 vdom 挂载处理的事情都不是在 created 之前去完成的。虚拟节点还没完全的 ready，不能说完全的没有，只有一个壳。

##### 1.2.3.2.3. 【vue3】：

- bC&c 合并 => setup 阶段

#### 1.2.3.3 bM 和 m 区别<span style="color:red;">（面试题）</span>（vue2 VS vue3）：

- bM：vDom(完整获取，虚拟 dom、虚拟 node 已经生成) - 数据操作（可以做几乎所有的） => 不可以做涉及 dom 操作
- m: Dom - 任何操作（对 dom）

##### Note：

###### 1. 避免重绘重排（对实际 dom 做任何操作时，浏览器消耗性能，浏览器最消耗性能的是重绘重排）：

- 重绘：节点本身结构变化，layout tree 变化。
- 重排：重新布局所有节点。

###### 2. 虚拟 dom：

- 描述 dom 的数据结构（描述 dom 的虚拟节点）（用数据结构模仿的实际 dom，描述当前的 dom 的）。
- vdom + vue template render 渲染引擎 => 可以把 vdom 变为实际的 dom。

###### 3. 拉取数据请求越早越好的前提下，动态绘制 echarts：先拉取数据，再绘制图表，如何操作？

- created 拉取数据，beforeMounted 绘制 echarts，这对吗？
- 涉及 canvas 需要有宽高，初始化 echarts 要传确认的宽和高 ，才会渲染当前的 dom
- beforeMounted 时，dom 还未生成，画 canvas，继承父级宽高，会出现什么问题？拿不到宽和高（有宽没高）。因为父级 dom 还未生成（这时加 nextTick、setTimeout 都是不合适的）。
- 应该在 dom 生成完后，再初始化 canvas，比较合适。

#### 1.2.3.4 bU 和 u 区别<span style="color:red;">（面试题）</span>（vue2 VS vue3）：

- bU：vDom 更新了（dom 没更新，没有触发 render 函数） -获取到的数据（虚拟节点的数据是新的，但获取的节点信息、dom 信息是旧的）
- u：dom 更新了

=> 谨慎在 bU、u 里写对 dom 的操作（触发 dom 更新，触发宽高，如果宽高联动数据 => 死循环，**类似 computed**）

##### Q&A：

###### 1. 实现机制：

- 更新节点，更新节点时的生命周期回调。
- 任何实例更新、vnode 更新，都会触发。

###### 2. 场景：

- 图表绘制、
- 低代码、
- 实现类似装饰器的功能：  
  TS 装饰器，实现某个方法包个外壳，外壳插个插件，加个属性，用户名称，执行任何方法，套用这个外壳，都会把外壳名称注入到方法里。  
  当前组件任何变化都加 1、任何渲染都做相同的操作、视图变化 驱动本地数据、后置操作——updated 里。

#### 1.2.3.5 bD 和 d 区别<span style="color:red;">（面试题）</span>：

##### 1.2.3.5.1. 【vue2】：

- bD: vm 实例销毁前
- d: 实例销毁后

##### 1.2.3.5.2. 【vue3】： => unmount

- beforeUnmount
- unmounted

#### 1.2.3.6 总结

可以完整回答：基于 MVVM 思想，Vue 是如何搭建自己的一整套生态环境的？

1. vue 如何处理数据和视图之间的关系

2. 生命周期里如何编排每个节点做什么事，从而与用户进行沟通的？  
   （https://v2.vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks Along the way, it also runs functions called lifecycle hooks, giving users the opportunity to add their own code at specific stages.）

   - 视图&数据的沟通
   - 生命周期&用户的沟通

##### Q&A：

###### 1. 数据在 created 里请求，echarts 在 mounted 里初始化，初始化了，数据还没回来的情况（这挺对的）：

生命周期不会管业务测试是同步还是异步的，就只是 vue setup 的过程，所以要自己处理好异步请求和本地的数据处理的关系；通常建议 echarts 的初始化和拉数据做成同步的操作：async/await、promise、尽量控制，而不是写在两个不同的生命周期里（还有待实践，像上面问题的做法是可以通过的）。

###### 2. actived 针对于 keep-alive 组件：

点击列表进入详情页，但是回来期望列表页保持不变，这时会在前置页面套上 keep-alive 表示前置的实例不被销毁从而保持前置实例的原有状态。

###### 3. 销毁生命周期的使用场景：

- 导航守卫
- 拦截器：当且仅当当前页面发出的请求加个 header 头，其他页面都不要加，就在当前页面进来时 加拦截器，销毁时把拦截器去掉。
- 销毁定时器，not to 内存泄漏。

now 要**知道区别**，源码**后面通读源码，知道实现上的差异**。

### 1.2.4 vue 中有哪些实现定向监听的方法<span style="color:red;">（面试题）</span>

Unless Vuex 状态机&EventBus（实例直接存储数据），Vue 本身准备的定向监听的方式：

- computed
- watch

#### 1.2.4.1 computed 和 watch 异同

##### 相同点：

computed 和 watch 都是用来实现定向监听的，

###### 1. 基于 vue 的依赖收集机制（computed、watch 实现机制）

=> vue data：`a: { b: 1 }` => vue template：`{{ a }} - {{ b }}`  
 watch a b 变化  
 computed c=a+b,

- 依赖收集机制：  
  两个数据之间的关系存储在了一个固定的地方。  
  => 逻辑 b 变，template 里 b 变，a why 变？Since a 依赖 b，a 用了 b，b 变 a 也变。  
  => vue 要实现数据和视图的联动，就要处理依赖关系：依赖的对象变化，自己也重新渲染、重新更新。
- watch a，改变 b，a 是 b 的依赖。用 watch 搭建了一个依赖桥梁。
- 都是同一种依赖收机制，把 b 挂载到了 a 上、通知到了 a 上。

**<span style="color:red;">TODO:50:12</span>**

###### 2. 都是被依赖的变化触发，进行改变进而进行处理计算

watch b 变化，a 逻辑运行；  
 computed a 依赖于 b 变化。  
 都是计算。

##### 不同点

（吸顶操作，首先入参、出参）

###### 1. 入和出

computed：多入单出 - 多个值变化，组成导致一个值的变化  
 watch：单入多出 - 单个值变化，进而影响一系列状态的变更

###### 2. 性能

computed: 自动 diff 依赖，如果依赖没有变化，优先从缓存中读取当前计算值。（关注值本身）  
 watch: 无论监听值发生变化与否，都会执行回调（关注逻辑，值变了，逻辑没变就可以）  
 （压力面，知识储备的自信程度）

###### 3. 写法

computed: 必须有 return  
 watch：比一定

###### 4. 时机上

computed: 从首次生成赋值
watch: 首次是不运行的，immediate: true -> 初始化时就跑

### 1.2.5 条件

#### v-if & v-show & v-else & v-else-if

v-if 无 dom，不会渲染实际节点以及子节点
依赖倒置，父元素的不要在子元素里计算：值拉出来，不属于父元素不属于子元素，一部分给父，一部分给子元素，将来去掉子元素，可维护性高。
v-show 有 dom，不展示，不占据位置

### 1.2.6 循环

#### 1.2.6.1 v-for 和 v-if 优先级的问题？<span style="color:red;">（面试题）</span>

vue2.x 中，v-for 会优先响应
vue3.x 中，v-if 优先

#### 1.2.6.2 key 的作用<span style="color:red;">（面试题）</span>

1. 模板编译原理 —— template => dom  
   template => 正则匹配语法 - 生成了 AST：静态+动态 => 转化为节点，并且整体生成可执行方法 => render() => 生成 dom
2. dom diff
   1 2 3 4 5 6  
    6 5 7 3 2 1  
   层级：只考虑单层复用，错层遍历实现  
   顺序：双向指针，首尾向中间移动（首尾 移动、新增、删除）  
   操作：移动、新增、删除  
   => key - 快速识别节点

3. （节点没有实时刷新）key - 尽量可复用节点标识
   常见问题：index 做 key，随机数做 key（失去了 dom diff 的一次性能优化）

- 哦哦哦，我看看下课看看我用的 forceUpdate 是什么情况

# 二、Vue 模板以及基础指令

## 2.1 目标

1. 模板化方案

a. 模板化写法
b. 团队使用优缺点

2. 基础指令

a. Vue 基础指令及使用场景
b. 自定义指令使用
c. 常见面试陷阱

## 2.2 指令

## 2.2.1 默认指令

v-once - 只渲染一次  
v-text - 渲染字符串  
v-html - 渲染 html  
v-bind - 绑定赋值  
v-on - 监听  
v-model - 双向绑定 => :value + @input

```js
  model: {
    prop: 'selected',
    event: 'change'
  }
```

## 2.2.2 自定义指令

```js
  directives: {
    yunyin: {
      update: function() {
        // ...
      }
    }
  }
  <div v-yunyin></div>
```

# 三、Vue 事件及数据绑定

## 3.1 目标

1. Vue 事件  
   a. Vue 事件处理  
   b. 事件修饰  
   c. 设计思想
2. Vue 数据绑定  
   a. 基础绑定  
   b. 数据修饰  
   c. 语法糖支持

## 3.2 Vue 事件

### 3.2.1 v-on @

### 3.2.2 修饰符

.stop .prevent .capture .self .once  
按钮修饰符

## 3.3 Vue 数据绑定

# 四、Vue 组件化 —— 面试重点

## 4.1 目标

a. Vue 组件化写法
b. 组件化实质
c. 组件传参与状态维护
d. 大型项目的组件管理

## 4.2 Vue 组件化写法

## 4.3 组件化实质

## 4.4 组件传参与状态维护

## 4.5 大型项目的组件管理

# 举例

> HelloWorld.vue

```html
<template>
  // 数据类型 // 面试题 // 1.数值转换类类型
  <h1>number + 1 : {{ number + 1}}</h1>
  数字类型计算
  <h1>{{ msg.slice(0, -1)}}</h1>
  字符串操作
  <h1>{{ number.toFixed(2) }}</h1>
  浮点
  <h1>{{ parseInt(number, 10) }}</h1>
  整形计算
  <!-- 上面4个都可以 -->

  // 2.回调本地函数的方式
  <h1>{{ calcNumber(number) }}</h1>

  // 3.先执行语句拿到值，再放模板里
  <h1>100 > 99 {{ 100 > 99 ? '对':'错'}}</h1>

  <h1>{{ addMsg }}</h1>
</template>
<script>
  import son from './son.vue'


  data(){
    return {
      msg:'welcome to Your Vue.js App',
      number: 100,
      number2: 0
    }
  },
  computed: {
    addMsg() {
      return this.msg + this.number
    }
  }
  methods: {
    calcNumber(number){
      return num + 2
    }
  },
  watch: {
    number() {
      this.number2++
    }
  },
  mounted() {
    this.number2 = 1 // 生命周期的变化
  }
</script>
```

> son.vue

```html
<template>
  <div>son</div>
</template>
<script>
  export default {
    name: 'son'
  }
</script>
```

> HelloWorld.vue

```html
<template> </template>
<script setup>
  // 解耦
  import {
    reactive, computed,watch, onMounted
  } from 'vue'
  const msg = 'welcome to Your Vue.js App'
  const state = reactive({
    number: 100,
    number2: 0
  })
  const addMsg = computed(() => msg + state.number)
  const calcNumber = num => num+2

  watch(
    () => state.number,
    (number, preNumber) => {
      state.number2++
    }
  )
  onMounted(() = >{
    state.number2 = 1
  })
</script>
```

1. 初始化  
   watch  
   c = a+b => c immdiate => 合并  
   computed

2. button -单个 tick  
   c = a+b  
   computed => 执行一次

3. 跨 tick  
   template => {{ }}

0409 开头补充：

4. computed & watch

```js
computed: {
  c() {
    d
    return a + b
  }
},
watch: {
  a() {
    // to do
  }
}
```

5. 单 tick diff

# 参考链接

# 友情链接

- [我的掘金主页](https://juejin.cn/user/1042768423037150)

- [我的 github 主页](https://github.com/djsz3y)

- [读书视频学习笔记](https://github.com/djsz3y/learning-notes)

- [爪哇学习笔记](https://github.com/djsz3y/zhaowa-study-notes)

- [bug 仓库](https://github.com/djsz3y/bug-repository)
