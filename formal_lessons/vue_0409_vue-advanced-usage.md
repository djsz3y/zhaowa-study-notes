十二、Vue 高级用法

# 目标

Vue 高级用法

- mixin 复用
- vue.js 动画特效 & 常见组件库介绍
- 插槽 & 插件 & 过滤器
- Vue 响应式原理
- 单元素/组件动画
- 列表动画、状态动画、动画库

# 一、特征一：模板化 => vue-template-compiler

## 1.1.模板结构的⼆次加⼯ —— 插槽(slot)_（三种插槽）_

<span style="color:red;">插槽 - 面试考察点 => 对比形式？</span>

### 1.1.1.默认插槽

组件外部维护参数以及结构，内部安排位置摆放

- 面试题 => 默认插槽的实现方式 => 插槽聚合

* 追问 => 多个插槽会是何种形态（合并）=> 多个默认插槽的展示原理和逻辑（一个 node）

=> 多个插槽放在不同的地方

外部：

```html
<custom-component> 默认插槽 </custom-component>
```

内部：

```html
<slot></slot>
```

### 1.1.2.具名插槽

以 name 表示当前插槽的身份，从而在组件内部做到可区分

- 面试点 => header footer（具名插槽可以指定位置区分布局） => name 其实索引了一段单个解析的命名空间，node 独立生成
- 以 node 渲染为单位
- 追问 => 如何混合式传参？

外部：

```html
<custom-component>
  <template v-slot:named> 具名插槽 </template>
</custom-component>
```

内部：

```html
<slot name="named"></slot>
```

### 1.1.3.作用域插槽

外部做结构描述勾勒，内部做参数混合

- 父亲参数向孩子 slot 传递
- 命名空间相同，覆盖

外部：

```html
<custom-component>
  <template slot="namedScope" slot-scope="{ slotProps }">
    {{ slotProps }}
  </template>
</custom-component>
```

内部：

```html
<slot name="namedScope" :slotProps="slotProps"></slot>
<script>
  export default {
    data() {
      return {
        slotProps: '内部数据'
      }
    }
  }
</script>
```

记忆要点：

- 外部模板 slot 属性值对应内部 slot 标签 name 属性值。
- 内部以 v-bind:slotProps 方式绑定数据，包装上{}传给外部 slot-scope 属性值。

### 插槽举例

> App.vue

```html
<template>
  <HelloWorld>
    <!-- 默认插槽 -->
    <p>Hello Vue</p>
    <p>Hello Vue2</p>
    <p>Hello Vue3</p>
    <!-- 具名插槽 -->
    <template v-slot:header>Hello Header</template>
    <template v-slot:footer>Hello Footer</template>
    <!-- 作用域插槽 -->
    <template slot="content" slot-scope="{ slotProps }">
      {{ slotProps }}
    </template>

    <!-- 过滤器 -->
    <h1>{{ money | moneyFilter}}</h1>
    <!-- 管道符：再加工：git branch -a (ls | grep 22) -->

    <!-- v-html -->
    <h1 v-html="money > 99 ? 99 : money"></h1>
    <!-- <h1 v-html="<div>99</div>"></h1> -->
    <h1 v-html="arrNode"></h1>
    <!-- arrNode 任何形式的 dom 登录 -->
  </HelloWorld>
</template>
<script>
  export default {
    data() {
      return {
        money: 100
      }
    },
    filters: {
      moneyFilter(money) {
        return money > 99 ? 99 : money
      }
    }
  }
</script>
```

如果重名，命名空间后者覆盖前者。

> 插槽内层 HelloWorld.vue

```html
<template>
  <!-- 默认插槽 -->
  <slot></slot>
  <!-- 具名插槽 -->
  <slot name="header"></slot>
  <slot name="footer"></slot>
  <!-- 作用域插槽 -->
  <slot name="content" :slotProps="slotProps"></slot>
</template>
<script>
  export default {
    data() {
      return {
        slotProps: 'slotProps'
      }
    }
  }
</script>
```

### 插槽思考：

为什么会有作用域插槽，使用的场景是什么时候？  
内部数据通过子组件传给父组件展示，为什么不在父组件直接获取这个数据？
如果在父组件直接获取这个数据，那么这个作用域插槽平时使用的场景比较少是吗？

## 1.2.模板数据的⼆次加⼯

解释：  
后台的值/data 的值，不能直接放到模板上复用。

此时有哪些选择？

### 1.2.1.监听类 —— computed + watch

【1】watch（once） | computed

他们的不同：

1. 使用**原理**上的不同：一对多、多对一、computed 支持缓存&computed 支持异步；
   如果需要只运行一次，需要在**配置里声明和书写（配置 watch 的 once，需要维护。）**
2. **影响面**上的不同：
   如果一个 computed 没有绑定在模板上，肯定不会被运行；  
   如果在模板上，它肯定会被反复运行；

### 1.2.2.通道类 —— 函数、组装器、过滤器

【2】其余方案（过滤系统）

（可以在花括号直接写函数，但是这种方案一眼看上去不太明显，所以不好维护；所以是函数。）

1. 函数 - 独立管道符  
    -（filters 里 this.data,拿不到 this，其实是 window；因为所有的 filter 都挂载到了 window）  
    -（函数和业务解耦，不产生影响，只服务于函数，纯函数；幂等：执行一遍，多遍，都一样；应当可以被组合。函数式编程，管道串联、并联）

   -通过管道符的形式，就可以让 money 经过管道符 moneyFilter 处理：

   -（比如 unix linix ——`ls | grep 22`——ls 下的所有通过包含 22 的过滤下来；）

   -（比如 git ——`git branch -a | grep 2023`——所有包含 2023 的分支 grep 出来）
   管道符的设计理念就参考了它。

   - 管道符处理——再加工：拿到 money 的原值，经过 管道符处理——再加工；  
     如果直接写进函数里，methods 里就会既包含了过滤器、方法处理器、用户操作的响应器；  
     三个写在一起不好做区分，这样就知道哪些页面做过滤处理，哪些是真正的事件系统。

   => 管道符能拿到实例吗？  
   （filters 的 this 指向 window 不让拿到当前实例的东西，为什么？  
   -因为 filters 是纯过滤器：任何过滤器不应该跟业务产生任何的关系，应该是一个纯函数：

   1. 函数和业务绝对解耦，只服务于掺进来的参数；
   2. 纯函数是幂等的，不能包含计时器之类的东西。）

   - 如果有全局控制的东西，我应该在状态机里实现在函数外部 而不应该在函数内部；这就是**过滤器所遵循的实现机制**：过滤器只应该服务于管道符前面的参数，并且处理其自己的逻辑，而不应该与整个实例产生任何的沟通。这也是它的设计标准。

# 47:57

代码演示：

> HelloWorld.vue

```html
<template>
  <!-- 过滤器 -->
  <h1>{{ money | moneyFilter }}</h1>
  <!-- v-html -->
  <h1 v-html="money > 99 ? 99 : money"></h1>
  <h1 v-html="arrNode"></h1>
  <ul>
    <!-- ... -->
  </ul>
</template>
<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        money: 100
      }
    },
    filters: {
      moneyFilter(money) {
        // 控制价格在 99 之内。
        return money > 99 ? 99 : money
      }
    }
  }
</script>
```

2. v-html——原理：递归调用了 renderNode node 渲染 => 安全性（need 补充！）

3. 直给 => 通常写在生命周期 => init() 大数据平台尽量少用。

#### 函数

#### 组装器

#### 过滤器 filter

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

## 1.3.脚本化模板书写 —— JSX

### 1.3.1.jsx 更自由的 all in js

- 面试题：

1. 语法糖如何实现？

```vue
<script>
export default {
  name: 'HelloWorld1',
  data() {
    return {
      msg: 'hello jsx',
      options: [{
        vlaue: 1,
      }]
    }
  },
  render(h) {
    // 1.嵌套
    const moneyNode = {
      <p>{this.money > 99 ? 99 : money}</p>
    }
    // 实现 v-for
    this.options.map(item => {
      // 实现 v-if
      if(this.money === 99){
        return {
          <content
            item = { item }
            value = { item.value }
            onClick={ this.handleClick }
          >
            {this.msg}
            {moneyNode}
          </content>
        }
      }
    })
  }
}
</script>
```

2. jsx 优点和劣势

   vue 编译路径：template => render() => vm.render(vdom => dom)

a. dom 渲染优化 （template 优点）  
b. 直接写 render 函数更自由，不依赖 vueapi（render 的优点）

# 二、特征二：组件化

```js
Vue.component('component', {
  template: '<h1></h1>'
})
new Vue({
  el: '#app'
})
```

1. 抽象复用
2. 精简 & 聚合

<!-- 组件化其他方案： -->

## 2.1.传统组件化⽅式

## 2.2.混⼊ MIXIN ⽅式

### 2.2.1.应⽤场景

### 2.2.2.优缺点

### 2.2.3.合并策略重点

### 混入 mixin - 逻辑混入

[1]应用：抽离公共逻辑（逻辑相同，模板不同，可用 mixin）

> HelloWorld2.vue

```html
<template> </template>
<script>
  import demoMixin from './fragments/demoMixin'
  import demoMixin2 from './fragments/demoMixin2'

  import demoExtends from './fragments/demoExtends'

  export default {
    name: 'HelloWorld2',
    mixins: [demoMixin, demoMixin2],
    extends: demoExtends,
    data() {
      return {
        msg: ''
      }
    },
    created() {
      console.log('created')
    }
  }
</script>
```

> demoMixin.js

```js
export default {
  data() {},
  methods: {},
  created() {
    console.log('created')
  }
}
```

[2]面试题：合并策略：

- a. 变量补充形式 => 额外补充 不会覆盖
- b. 生命周期 => mixin 在引用该 mixin 的组件之前
- c. 同样被引用的两个 mixin => 根据引用顺序安排加载顺序

## 2.3.继承拓展 EXTENDS ⽅式

### 2.3.1.应⽤场景

### 2.3.2.合并策略

### 继承拓展 extends - 逻辑上共同拓展

- 1. 应用：核心逻辑的功能继承
- 2. 合并策略：  
     a. 不会覆盖  
     b. 生命周期 => 生命周期不论是业务代码还是 mixins 他们生命周期都在 extends 后 => (why?)继承

> demoExtends.js

```js
export default {
  data() {
    return {
      msg: 'im extends',
      obj: {
        title: 'extendsTitle'
      }
    }
  },
  created() {
    console.log('extends created')
  }
}
```

#### 区别：

混入：逻辑补充

extends 火车头只有一个

## 2.4.整体拓展类 EXTEND ⽅式

### 2.4.1.extend && plugin

Vue.use 调用 install 方法

middleware 工程化相关

## 2.5.插件使⽤⽅式 USE ⽅式

### 2.5.1.应⽤场景

### 2.5.2.⼿写插件

Vue.use

## 2.6.组件的⾼级引⽤⽅式

### 2.6.1.递归组件

### 2.6.2.动态组件

### 2.6.3.异步组件

#### Vue.prorotype.ajax

#### vue3 - compositionAPI

```html
<script setup>
  import { reactive, onMounted } from 'vue'
  import addon from './addon'

  const msg = 'hello vue3'
  const money = reactive(100)

  const obj = addon() // minins extends 以函数形式
  //const {msg: msg1, obj: obj1 } = addon()

  onMounted(() => {
    console.log('hello vue3 mounted')
  })
</script>
```

> addon.js

```js
import { reactive } from 'vue'

export default function addon() {
  const msg = 'im addon'
  const obj = reactive({
    title: 'addonTitle',
    header: 'addonHeader'
  })

  return {
    msg,
    obj
  }
}
```

# 总结

通过以上整理，我可以做到如下几点：

# 补充

## 3.1.Learn More

1. 官网学习：

   - [Vue2 官方文档-API-全局 API](https://v2.cn.vuejs.org/v2/api/#%E5%85%A8%E5%B1%80-API)

2. 深⼊学习 vue 的推荐顺序：  
   官⽅⽂档 => 业务练⼿ => 开源熟悉 => 回到官⽅⽂档 api

3. ⾯试重点：  
   api 的功能 & 对⽐ & 优缺点

## 3.2.TODO 还需加强：

- [x] 1.熟悉官方文档
- [ ] 2.实操官网 DEMO
  - [Vue 官方文档学习笔记]()
- [ ] 3.熟悉开源
- [ ] 4.回顾与对比官网

# 友情链接

- [我的掘金主页](https://juejin.cn/user/1042768423037150)

- [我的 github 主页](https://github.com/djsz3y)

- [读书视频学习笔记](https://github.com/djsz3y/learning-notes)

- [爪哇学习笔记](https://github.com/djsz3y/zhaowa-study-notes)

- [bug 仓库](https://github.com/djsz3y/bug-repository)
