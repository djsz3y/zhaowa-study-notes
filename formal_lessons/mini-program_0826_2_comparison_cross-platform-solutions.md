小程序开发框架解析（小程序：对比 & 跨平台方案）

# 一、各家小程序 api 对比

## 1.1 命名空间（面试题：各家属性有何区别）

- 微信 - `wx`
- 支付宝 - `my`
- 百度 - `swan`

## 1.2 模板指令

### if 指令

- [微信 - `wx:if`](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/conditional.html)

```html
<view wx:if="{{length > 5}}"> 1 </view>
<view wx:elif="{{length > 2}}"> 2 </view>
<view wx:else> 3 </view>
```

- [支付宝 - `a:if`](https://opendocs.alipay.com/mini/framework/conditional-render?pathHash=26fb5763)

```html
<view a:if="{{length > 5}}"> 1 </view>
<view a:elif="{{length > 2}}"> 2 </view>
<view a:else> 3 </view>
```

- [百度 - `s-if`](https://smartprogram.baidu.com/docs/develop/framework/view_if/)

```html
<!-- if-demo.swan-->
<view s-if="is4G">4G</view>
<view s-elif="isWifi">Wifi</view>
<view s-else>Other</view>
```

- [uni-app - `v-if`](https://uniapp.dcloud.net.cn/tutorial/vue-basics.html#v-if%E5%92%8Cv-else)

```vue
<view v-if="seen">现在你看到我了</view>
<view v-else>你看不到我了</view>
```

### for 指令

- 微信 - `wx:for`

```html
<view wx:for="{{array}}"> {{index}}: {{item.message}} </view>
Page({ data: { array: [{ message: 'foo', }, { message: 'bar' }] } })

<!-- wx:for-item 当前元素，wx:for-index 当前下标： -->
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>

<!-- wx:for 也可以嵌套，下边是一个九九乘法表 -->
<view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="i">
  <view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="j">
    <view wx:if="{{i <= j}}"> {{i}} * {{j}} = {{i * j}} </view>
  </view>
</view>
```

- 支付宝 - `a:for`

```html
<view a:for="{{array}}"> {{index}}: {{item.message}} </view>
Page({ data: { array: [{ message: 'foo', }, { message: 'bar', }], }, });

<!-- a:for-item 可以指定数组当前元素的变量名 -->
<view a:for="{{array}}" a:for-index="idx" a:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>

<!-- a:for 支持嵌套。 以下是九九乘法表的嵌套示例代码。 -->
<view a:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" a:for-item="i">
  <view a:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" a:for-item="j">
    <view a:if="{{i <= j}}"> {{i}} * {{j}} = {{i * j}} </view>
  </view>
</view>
```

- 百度 - `s-for`

```html
<!-- for-demo.swan-->
<view>
  <view s-for="p,index in persons"> {{index}}: {{p.name}} </view>
</view>

<!-- for-demo.swan-->
<view>
  <view s-for="persons" s-for-index="idx" s-for-item="p">
    {{idx}}: {{p.name}}
  </view>
</view>
```

### key

- 微信 - `wx:key`
- 支付宝 - `key` 全局特异性的属性
- 百度 - `s-key`

## 1.3 事件绑定

- 微信 - `bind/catch[事件名全小写]` => bindtap/catchtap = '回调函数名'

> WXML 定义事件

```html
<view
  change:prop="{{test.propObserver}}"
  prop="{{propValue}}"
  bindtouchmove="{{test.touchmove}}"
  class="movable"
></view>
```

> test.wxs

```js
module.exports = {
  touchmove: function (event, instance) {
    console.log('log event', JSON.stringify(event))
  },
  propObserver: function (newValue, oldValue, ownerInstance, instance) {
    console.log('prop observer', newValue, oldValue)
  }
}
```

- 支付宝 - `on/catch[事件名驼峰]` => onTap/catchTap = '回调函数名'

```html
<view id="tapTest" data-hi="Alipay" onTap="tapName">
  <view id="tapTestInner" data-hi="AlipayInner"> Click me! </view>
</view>
Page({ tapName(event) { console.log(event); }, });
```

- 百度 - `bind/catch[事件名全小写]` => bindtap/catchtap = '回调函数名'

## 1.4 脚本 & 文件

### 1）组件模块中内嵌脚本

- 微信 - `<wxs />` 在 wxml 里直接引用，实现的独立闭环模块 - 内嵌脚本。
- 支付宝 - `<import-sjs />`
- 百度 - `<filter />`

### 2）小程序的文件命名

- 微信 - `*.wxml`、`*.wxss`；
- 支付宝 - `*.axml`、`*.acss`；
- 百度 - `*.swan`、`*.css`；

## 1.5 业务流程差别

### 账号的获取（获取手机号）

前提：

1）监控管理、防止违法犯罪；  
2）身份校验接口的封装：同样的人校验，先看库里有没有，再决定是否付费调用实名制接口。  
3）通信实名制-手机号实名制。

\- 微信：

1. button 组件上 open-type 设置为 getPhoneNumber
2. 通过 bindgetphonenumber 事件回调，获取到动态令牌 code => code 发送给业务后台（传递给开发者后台）
3. 开发者业务后台，通过调用微信后台的 phonenumber.getPhoneNumber，消费 code => 换取手机号（获取 getPhoneNumber 接口）

```html
<!-- *.wxml -->
<view>
  <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">
    获取手机号
  </button>
</view>
<!-- *.js -->
<script>
  Page({
    getPhoneNumber(e) {}
  })
</script>
```

\- 支付宝：

1. my.getPhoneNumber 获取用户授权（唤起用户预授权，获取手机号）
2. 相同流程获取用户设备信息

\- 百度：

1. button 组件中，open-type 设置成 getPhoneNumber
2. 获取手机号回调（通过 bindgetphonenumber 作为获取手机号的回调）
3. 返回值中，包含加密数据 encryptedData 和偏移量 iv，需要发送到服务端进行解密

\* 区别：微信要通过后台来获取；百度获取密文，给后台解密给前台。

\* 目的：防止账号信息被截获。

\* aes 加密：前后台约定好 code ——对称加密（HTTPS）。

# 二、主流跨平台框架对比 - taro remax mpvue uniapp wepy

## 2.1 mpvue - 不推荐

\- 特点：

1. 通过 vue 来进行开发的
2. 支持多端框架
3. 保留了 vue.runtime 的核心方法，无缝继承了 vue 的基础能力
4. 提供了直接将 vue 的模版语法转换到小程序 wxml 语法的能力
5. 修改 vue 的构建配置，使之构建出符合小程序项目结构的代码格式：json/wxml/wxss/js 文件

\- 原理特性：

1. 不同于完全编译时框架（完全编译时转换），mpvue 还在运行时加入了 runtime 中的元素（mpvue 结合了 runtime 加入了 vue.runtime.js）
2. 整合了 diff/events/生命周期

\- 状态：

目前社区废弃不维护，遗留问题较多，不推荐使用

## 2.2 remax

\- 特点：

1. 使用 react 风格和方式进行小程序的开发
2. 把代码转换成多个小程序平台
3. 原生支持 TS

\- 原理特性：

1. 同样通过不完全依赖静态编译时转换，进行了运行时处理（整合进了运行时替换）。
2. 运行时实现了一套类似 react-dom——通过实现 react-dom；区别是把 react-dom 中涉及到浏览器的 document、window 相关内容，替换成小程序中相应内容，实现了 react-reconciler。
3. 书写风格贴近于面向对象，react 技术栈友好。

## 2.3 taro - 支持平台多

\- 特点：

1. 原生支持依赖包管理：npm/yarn
2. 原生支持了 es678 及以上规范：ES-next / css 预编译器
3. 原生支持了 css 预编译器
4. 原生支持使用 redux / mobx 进行状态管理
5. 原生小程序 API 直接调用——支持小程序 Api 的 promise 化

\- 原理特性：

1. 静态编译框架，主要工作都是在编译阶段进行的
2. 源码模块解耦，可读性好。

微信小程序：taro-transformer-wx => 对 ts 和 babel 将编译结果进行分析
=> 将分析到的结构通过区分类型进行不同的操作 => AST 节点类型分析
=> jsx 节点转化为 wxml 模板 => js 逻辑
=> 在静态编译阶段实现的转译

（taro-transformer-wx 模块 => index.ts => tsc & babel => AST => parseJSXChildren => wxml => 静态编译阶段实现了转义）

# 三、kbone

## 3.1 项目创建

```js
    // 1. 使用脚手架创建项目
    npm install -g kbone-cli
    // 2. 通过脚手架创建项目
    kbone init my-app
    cd xxx
    npm install
    // 3. 开发调试小程序端 => 开发者工具 dist/mp目录
    npm run mp
    // 4. 开发调试web端
    npm run web
```

## 3.2 核心 —— 运行时兼容，静态复制配置

miniprogram-render - 构造元素树
custom-dom: div >> input >> label

a. 转化树结构
view - dom-div
\>\> view - input
\>\> view - label
b. 结合自定义组件、自定义指令

b.1 合并创建 ： 静态节点复用 + 控制更新节点数量

miniprogram-element - 监听桥梁作用  
c. 事件监听： 无缝对接

## 3.3 优势

a. 支持多种框架 vue react preact
b. 支持更完整的原生指令
c. 提供了全局接口 dom bom
d. 可以提供小程序本身的特性

# 四、实战

【1】创建 kbone-demo 项目。
