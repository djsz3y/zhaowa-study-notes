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

扫盲点，游刃有余。

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

#### 1.1.3.1.MVC（Model View Controller）（模型-视图-控制器） => （对整体）设计认知 （软件设计规范）

#### 1.1.3.2.不同范畴（不同维度）具有不同含义：

##### 1.1.3.2.1.**观点 1**——jQuery 是 MVC（纯前端角度理解 MVC 所处理的能力）：

- Model：数据结构（数据驱动页面，现在数据和页面都是设计成层级是统一的，页面有一行表格，数据设计成数组里有一个对象，这样数据和视图是对应的。）（以前使用 jQuery，数据和页面是分开的，数据和页面没有任何关系，Model 层是纯粹从后台拿到数据后，存储、解析拼装数据。）
- View：视图、template(for Vue，layout、style)
- Controller：解析到的数据 set 到视图上（jQuery 是$.attribute/$.value）。

##### 1.1.3.2.2.**观点 2**——jQuery 是前端框架，加上后台接口、中转层 controller 加起来才是 MVC 的东西（上升维度：整个应用、前后端加在一起的层级，应用整合、应用架构角度理解 MVC）

- Model：就是底层的数据、读的数据表
- View：整个前端领域可以抽象成视图，或者说是视图的一部分，后台的接口是渲染驱动视图的，也可以并到 View 层里来。
- Controller：路由、路由提供的接口、路由跳转中转、鉴权权限等。

### 1.1.4 MVVM（Model-View-ViewModel）（数据、状态-视图-数据视图绑定层）

而对于现在主流的 MVVM：

#### 1.1.4.1.MVVM（Model-View-ViewModel）（数据、状态-视图-数据视图绑定层）（对主流框架有使用经验和了解）

#### 1.1.4.2.ViewModel 是 MVVM 所特有的数据视图绑定层。每个框架的实现用的发布订阅。

#### 1.1.4.3.ViewModel 所代表的思想：

##### 1.1.4.3.1.数据会绑定在 viewModel 层，并且会直接驱动数据到页面的渲染 => 自动 trigger 的功能（视图增加的第一层自动化）：

- 自动 trigger 的功能：MVVM 和 jQuery 最大区别：jQuery 的数据都需要手动调用$dom 的名字.value = xxx，把数据替换掉现有的 dom 的数据。
- 数据变化 + 视图绑定数据变量 => 视图数据变量，自动发生变化

##### 1.1.4.3.2.（数据 -> 视图，数据变化到视图变化：vue-{{}}，react-setState、小程序-setData）

视图变化时，同时也会通知到 viewModel 层：

- View 变化 => ViewModel 同样可以拿到回调
- （在主流框架 Vue、React 里就是相应的 hook，相应的 hook 回来，告诉我们某个事件函数被触发了，hook 到相应的所写的函数里。）。

#### 1.1.4.4.ViewModel 的作用（与 MVC 的差别就在于 ViewModel）：

- 所以，ViewModel 不仅有 Controller 的作用，实际在 Controller 里增加了双向的发布订阅，或者说利用发布订阅机制实现自动化的 Controller。
- View 变化，VM 知道 hook 出去；Model 变化，触发 VM，在 View 中找 Model 相应绑定的变量。

#### 1.1.4.5.TODO：

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

##### 1.2.3.2.1.【vue2】：bC：new Vue() - 初始化类、挂载属性（新建 vue 实例，实例挂载功能）

##### 1.2.3.2.2.【vue2】：c：

###### 1.merge options 的操作：

- Vue 相应的配置合并到新建的实例上的过程。
- options 指的是：data（本地数据）、props（父到子传递的数据）、methods（当前实例所需使用的方法）、computed（当前所实时计算的属性）

###### 2.bC 到 C 所作的事情也就是：

- 数据操作和属性合并 => 不涉及到 vdom 和 dom 的方法处理。

###### 3.陷阱：$ref 是在这里做的吗？

- 任何对 dom 和 vdom 挂载处理的事情都不是在 created 之前去完成的。虚拟节点还没完全的 ready，不能说完全的没有，只有一个壳。

##### 1.2.3.2.3.【vue3】：

- bC&c 合并 => setup 阶段

#### 1.2.3.3 bM 和 m 区别<span style="color:red;">（面试题）</span>（vue2 VS vue3）：

- bM：vDom(完整获取，虚拟 dom、虚拟 node 已经生成) - 数据操作（可以做几乎所有的） => 不可以做涉及 dom 操作
- m: Dom - 任何操作（对 dom）

##### Note：

###### 1.避免重绘重排（对实际 dom 做任何操作时，浏览器消耗性能，浏览器最消耗性能的是重绘重排）：

- 重绘：节点本身结构变化，layout tree 变化。
- 重排：重新布局所有节点。

###### 2.虚拟 dom：

- 描述 dom 的数据结构（描述 dom 的虚拟节点）（用数据结构模仿的实际 dom，描述当前的 dom 的）。
- vdom + vue template render 渲染引擎 => 可以把 vdom 变为实际的 dom。

###### 3.拉取数据请求越早越好的前提下，动态绘制 echarts：先拉取数据，再绘制图表，如何操作？

- created 拉取数据，beforeMounted 绘制 echarts，这对吗？
- 涉及 canvas 需要有宽高，初始化 echarts 要传确认的宽和高 ，才会渲染当前的 dom
- beforeMounted 时，dom 还未生成，画 canvas，继承父级宽高，会出现什么问题？拿不到宽和高（有宽没高）。因为父级 dom 还未生成（这时加 nextTick、setTimeout 都是不合适的）。
- 应该在 dom 生成完后，再初始化 canvas，比较合适。

#### 1.2.3.4 bU 和 u 区别<span style="color:red;">（面试题）</span>（vue2 VS vue3）：

- bU：vDom 更新了（dom 没更新，没有触发 render 函数） -获取到的数据（虚拟节点的数据是新的，但获取的节点信息、dom 信息是旧的）
- u：dom 更新了

=> 谨慎在 bU、u 里写对 dom 的操作（触发 dom 更新，触发宽高，如果宽高联动数据 => 死循环，**类似 computed**）

##### Q&A：

###### 1.实现机制：

- 更新节点，更新节点时的生命周期回调。
- 任何实例更新、vnode 更新，都会触发。

###### 2.场景：

- 图表绘制、
- 低代码、
- 实现类似装饰器的功能：  
  TS 装饰器，实现某个方法包个外壳，外壳插个插件，加个属性，用户名称，执行任何方法，套用这个外壳，都会把外壳名称注入到方法里。  
  当前组件任何变化都加 1、任何渲染都做相同的操作、视图变化 驱动本地数据、后置操作——updated 里。

#### 1.2.3.5 bD 和 d 区别<span style="color:red;">（面试题）</span>：

##### 1.2.3.5.1.【vue2】：

- bD: vm 实例销毁前
- d: 实例销毁后

##### 1.2.3.5.2.【vue3】： => unmount

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

###### 1.数据在 created 里请求，echarts 在 mounted 里初始化，初始化了，数据还没回来的情况（这挺对的）：

生命周期不会管业务测试是同步还是异步的，就只是 vue setup 的过程，所以要自己处理好异步请求和本地的数据处理的关系；通常建议 echarts 的初始化和拉数据做成同步的操作：async/await、promise、尽量控制，而不是写在两个不同的生命周期里（还有待实践，像上面问题的做法是可以通过的）。

###### 2.actived 针对于 keep-alive 组件：

点击列表进入详情页，但是回来期望列表页保持不变，这时会在前置页面套上 keep-alive 表示前置的实例不被销毁从而保持前置实例的原有状态。

###### 3.销毁生命周期的使用场景：

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

###### 1.基于 vue 的依赖收集机制（computed、watch 实现机制）

=> vue data：`a: { b: 1 }` => vue template：`{{ a }} - {{ b }}`  
 watch a b 变化  
 computed c=a+b,

- 依赖收集机制：  
  两个数据之间的关系存储在了一个固定的地方。  
  => 逻辑 b 变，template 里 b 变，a why 变？Since a 依赖 b，a 用了 b，b 变 a 也变。  
  => vue 要实现数据和视图的联动，就要处理依赖关系：依赖的对象变化，自己也重新渲染、重新更新。
- watch a，改变 b，a 是 b 的依赖。用 watch 搭建了一个依赖桥梁。
- 都是同一种依赖收机制，把 b 挂载到了 a 上、通知到了 a 上。

###### 2.都是被依赖的变化触发，进行改变进而进行处理计算

watch b 变化，a 逻辑运行；  
 computed a 依赖于 b 变化。  
 都是计算。

##### 不同点

（吸顶操作，首先入参、出参）

[1] 入和出

- computed：多入单出 - 多个值变化，组成导致一个值的变化
- watch：单入多出 - 单个值变化，进而影响一系列状态的变更

[2] 性能

- computed: 自动 diff 依赖，如果依赖没有变化，优先从缓存中读取当前计算值。  
  （计算属性，把属性计算出来，并且实时响应。）  
  （不管中间流程，关注值本身，值没变，结果没变。）
- watch: 无论监听值发生变化与否，都会执行回调  
  （不关注值，只要 watch 的发生变化，关注逻辑，逻辑没变，结果没变）  
  （压力面，知识储备的自信程度）

[3] 写法

- computed: 必须有 return（teacher 的 warning、报错都不让过。）
- watch：不一定

[4] 时机上

- computed: 从首次生成赋值，就开始计算运行了。
- watch: 首次是不运行的。  
  （watch b，b 变化后跑一段逻辑改 a。）  
  （关注的是 b 变化，而 b 第一次赋值成 1，只是初始值，不是变化，没有变化，不会跑 watch，所以时机上首次不运行。）  
  immediate: true -> 初始化时就跑

注意：

- 不建议在 computed 时做赋值操作（不建议在 get()改变其他值）；
- 也非常不建议 deep watch，非常消耗性能，因为用了递归虽然是伪递归，尽量少用，尽量把数据结构进行拆解；
- 也不建议在 computed 里进行拉取数据的异步操作。

比如：

```js
export default {
  data() {
    return {
      a: 1,
      b: 2
    }
  },
  computed: {
    c: {
      get() {
        //1.入和出：多入单出
        //2.性能：computed优于watch
        //3.写法：computed必须有return
        //4.时机：首次运行

        //Q&A：不建议在这更改其他值
        //Q&A：不建议在这拉取数据异步操作
        return this.a + this.b
      },
      set() {}
    }
  },
  watch: {
    c: {
      handler: function (newVal, oldVal) {
        //1.入和出：单入多出
        //2.性能：computed优于watch
        //3.写法：有无return都可以，不接收
        //4.时机：首次不运行
        this.d = newVal++
      },
      immediate: true, //4.时机：值true时，初始化就watch
      deep: true //Q&A：伪递归，消耗性能，不建议使用deep watch
    }
  }
}
```

#### 1.2.4.2 Q&A：

watch 比 computed 性能上稍微弱一点：computed 时+1-1 相当于没变，watch+1-1 有这个过程，会走两遍 watch。

### 1.2.5 条件

#### v-if & v-show & v-else & v-else-if

[1] v-if 无 dom，不会渲染实际节点以及子节点。

- 重点关注子节点的生命周期：v-if 判断时，全局状态不写在子元素里——父亲不要依赖于孩子的变量：父组件是页面，子组件是页面中的模块，页面中某一行文字基于子组件计算抛出来，这样的操作可以实现，但是有问题：子节点如果加上 v-if，这一串逻辑就无法继续，v-if 不会渲染实际节点及子节点，生命周期就不会渲染，父节点文字无法通过子节点计算生成了，这就是父子节点耦合带来的困扰。很多项目后期维护困难也因为这些问题的堆叠。
- 以及通过$refs 获取子节点，拿到子节点的属性，这样的写法尽量避免（code review 不会通过）。在设计模式中，我们写页面、代码、应用要遵循依赖倒置的原则，依赖只负责自己的功能就可以了（子元素就负责孩子部分就可以了），不要做外部操作，将来去掉子元素，稳定性、可扩展性最好。
- 父元素的东西不要在子元素里计算，如果需要，可以把这个模块独立出来；比如一个值要基于子元素计算，那么把这个值拉出来，既不属于父元素也不属于子元素，只是纯粹的数值运算；只是运算出来的值分成两部分，一部分给父，一部分给子元素，将来去掉子元素，父元素依旧可以正常运行。虽然多了一个模块，但是它的可维护性高。

[2] v-show 有 dom，不展示，不占据位置（渲染了，占用内存，占用了浏览器的性能，但是我们看不见，）

### 1.2.6 循环

#### 1.2.6.1 v-for 和 v-if 优先级的问题？<span style="color:red;">（面试题）</span>

vue2.x 中，同一元素都使用，v-for 会优先响应（先循环，再判断子节点 v-if）
vue3.x 中，v-if 优先（正好相反）

#### 1.2.6.2 key 的作用<span style="color:red;">（面试题）</span>

前面提到：若干正则——>分成若干类型模块，进行编译。

1. 模板编译原理 —— template => dom  
   template => 正则匹配语法 - 生成了 AST：静态+动态  
   （模板层级结构，每个节点是什么，包含了静态属性、动态属性）  
   => 转化为节点，并且整体生成可执行方法  
   （也就是 render 函数，vue 也支持 render 函数，利用 JSX 语法）  
   => render()  
   （写 render 函数可以，写 template 让 vue 去帮我们做操作也可以，最终都是生成一个可执行的 render 方法）  
   => 生成 dom  
   （这个 render 方法是什么时候执行的？什么时候有 dom 什么时候执行：m 时，所以 bM 为什么没 dom 只有虚拟节点，因为还没调用实际的渲染方法函数；调用 render()后，生成 dom。）

2. dom diff（`computed和watch异同-不同点-[2] 性能`）  
   => key ：------->1 2 3 4 5 6  
   => 一波操作：---->6 5 7 3 2 1（少了 4，多了 7）  
   => 层级：只考虑单层复用，错层遍历实现（单层级）  
   => 顺序：双向指针，首尾向中间移动（首尾 移动、新增、删除）  
   （首 left 尾 right 指针，首指向 6，尾指针指向 1；left 在 6，right 在 1，之前有 6，之前有 1，调整顺序，移动；指针往中间移动，5，2，同理；指针继续往中间移动，7，3，无 7 新增节点逻辑，有 3 移动。）  
   操作：移动、新增、删除（所以在这里进行移动、新增、删除操作，优先复用。）  
   => **key - 快速识别节点**  
   （这里有个强依赖，依赖对节点的准确判断，6 是真 6，所以为方便做 dom diff，给它传入 key。）

3. **key - 尽量可复用节点标识**  
   （节点没有实时刷新：列表其他都更新，只有这一个没更新；默认显示的是上一次的，只有操作后才是这次的；——>都代表当前节点没有实时刷新，因为 key 错了。）  
   常见问题：  
   [first].index 做 key  
   【优点：直接拿，普通静态列表大部分情况 index as key 没问题；  
   缺点：但是做的是拖拽的页面，第一行拖拽到第三行，由于用 index as key，vue 认为这个列表没变化，拖拽了等于没拖拽、或者点按钮后才拖拽成功  
   （这就是 dom diff 没更新，用了上一次的旧有的 dom 的顺序）！  
   这时有同学就会使用 forceUpdate 强行改变根数据 options 被循环的数据改变掉，从而触发 => 相当于浪费了一次渲染的资源，本质上直接调整 key 就可以实现渲染】  
   [second].随机数做 key  
   【优点：不考虑极小概率，永远重新生成 key 按新增逻辑重新渲染；  
   缺点在于：失去了 dom diff 的一次性能优化——全量新增，认为是整体的变化】

以上就是对于 key 由浅入深、坑在哪、怎么用的理解。【比较基础的知识】

**<span style="color:red;">TODO:</span>**

- 思考：我用的 forceUpdate 是什么情况？【可以最佳实践】
- （forceUpdate 会被无情的打回：大部分的场景用不到它，带来的非常严重的问题是：他可能会强行的让当前的 update 更新重新走一遍。如果说里面有子组件的话，就会有很厚大的问题；再加上当前的组件用了 vuex 全局的状态机的话，数据管理也是很大的问题。所以尽量少用 forceUpdate）

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

没使用过建议实际试一试：

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

局部自定义指令：

```js
//指令
  directives: {
    custom: {
      update: function() {
        // ...
      }
    }
  }
  // 模板中
  <div v-custom></div>
```

html 自定义指令，全局自定义指令：

方法论：

```js
Vue.directive('指令名称', function (el, binding) {
  // el：html dom 对象
  el.innerHTML = el.innerHTML + '(x-art)'
  el.style.color = 'pink'
})
```

举例：

```html
<div v-xart="{color:'red',text:'best learning video'}">好好学习，天天向上</div>
<script>
  Vue.directive('xart', function (el, binding) {
    el.innerHTML = el.innerHTML + '(' + binding.value.text + ')'
    el.style.color = binding.value.color
  })
</script>
```

指令的生命周期。。。

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

使用修饰符，日常开发可以避免一些问题：

- .stop 停止冒泡
- .prevent 阻止默认事件发生
- .capture 阻止捕获
- .self 只在当前不传播
- .once 执行一次

按钮修饰符：

- 按下 enter 键
- 按下 delete 键

@keydown.enter = "showInfo" 按下回车提示输入  
@keyup.left = "showInfo" 拾起左箭头提示输入  
@keyup.delete = "showInfo" 按下删除提示输入  
@keydown.tab = "showInfo" 按下 tab 提示输入  
@keydown = "showInfo" 按下提示输入  
@keydown.caps-lock = "showInfo" 按下 CapsLock 提示输入

(1).配合 keyup 使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。  
@keyup.ctrl = "showInfo" 按下 ctrl 提示输入  
(2).配合 keydown 使用：正常触发事件。  
@keydown.ctrl = "showInfo" 按下 ctrl 提示输入

Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名

详情见参考链接。

## 3.3 Vue 数据绑定

# 四、Vue 组件化 —— 面试重点

## 4.1 目标

a. Vue 组件化写法
b. 组件化实质
c. 组件传参与状态维护
d. 大型项目的组件管理

## 4.2 Vue 组件化写法

纯 html 里的组件：

```html
<div>
  <div id="template" style="display:none;">
    <div class="product" @click="increaseSales">
      <div>￥{{product.price}}</div>
      <div>{{product.name}}</div>
      <div>月成交{{product.sale}}笔</div>
      <div>评价{{product.review}}</div>
    </div>
  </div>
  <div id="div1">
    <product v-for="item in products" v-bind:product="item"></product>
  </div>
</div>
<script>
  var templateDiv = document.getElementById('template').innerHTML
  var templateObject = {
    props: ['product'],
    template: templateDiv,
    methods: {
      increaseSales: function () {
        this.product.sale = parseInt(this.product.sale)
        this.product.sale += 1
        this.$emit('increment')
      }
    }
  }
  Vue.component('product', templateObject)
  new Vue({
    el: '#div1',
    data: {
      products: [
        { name: 'xxx1', price: 889, sale: 18, review: 5 },
        { name: 'xxx2', price: 322, sale: 35, review: 4 },
        { name: 'xxx3', price: 523, sale: 29, review: 3 },
        { name: 'xxx4', price: 554, sale: 12, review: 2 }
      ]
    }
  })
</script>
```

## 4.3 组件化实质

## 4.4 组件传参与状态维护

## 4.5 大型项目的组件管理

## 过滤器 filter

局部过滤器：

```html
<template>{ { scope.row.value | formatResVal } }</template>
<script>
  export default {
    filters: {
      formatVersion: function (value, symbol) {
        return symbol + value //添加版本号前的V
      },
      formatSize: function (value, symbol) {
        return value + symbol //添加大小后的MB
      },
      formatLevel: function (value) {
        let result = ''
        switch (value) {
          case 'H':
            result = '高'
            break
          case 'M':
            result = '中'
            break
          case 'L':
            result = '低'
            break
          default:
            result = ''
        }
        return result
      }
    }
  }
</script>
```

全局过滤器:

```html
<template>{{data|capitalize|capitalizeLastLetter}}</template>
<script>
  Vue.filter('capitalize', function (value) {})
  Vue.filter('capitalizeLastLetter', function (value) {})
</script>
```

# 5.实战

## 5.1.vue2

**<span style="color:red;">TODO:1:52:23</span>**

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
  export default {
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

## 5.2.vue3

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

## 5.3.其他

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

- [Vue 按键修饰符，鼠标按钮修饰符，系统修饰键](https://blog.csdn.net/weixin_46724415/article/details/121451618)

# 友情链接

- [我的掘金主页](https://juejin.cn/user/1042768423037150)

- [我的 github 主页](https://github.com/djsz3y)

- [读书视频学习笔记](https://github.com/djsz3y/learning-notes)

- [爪哇学习笔记](https://github.com/djsz3y/zhaowa-study-notes)

- [bug 仓库](https://github.com/djsz3y/bug-repository)
