小程序：对比 & 跨平台方案

# 一、各家小程序 api 对比

## 命名空间

- 微信 - wx
- 支付宝 - my
- 百度 - swan

## if 指令

- 微信 - wx:if
- 支付宝 - a:if
- 百度 - s-if

## for 指令

- 微信 - wx:for
- 支付宝 - a:for
- 百度 - s-for

## key

- 微信 - wx:key
- 支付宝 - key
- 百度 - s-key

## 事件绑定

- 微信 - bind/catch - bindtap => 事件名全小写 = '回调函数名'
- 支付宝 - on/catch - onTap => 整体驼峰 = '回调函数名'
- 百度 - bind/catch - bindtap => 事件名全小写 = '回调函数名'

## 模版上内嵌脚本

- 微信 - <wxs />
- 支付宝 - <import-sjs />
- 百度 - <filter />

## 小程序的文件命名

- 微信 - .wxml .wxss
- 支付宝 - .axml .acss
- 百度 - .swan .css

## 账号的获取 => 手机号

- 微信 -

1. button 组件上 open-type 设置为 getPhoneNumber
2. 通过 bindgetphonenumber 事件回调回去动态令牌 code => 传递给开发者后台
3. 开发者后台调用微信后台获取 getPhoneNumber 接口

- 支付宝 -

1. my.getPhoneNumber 获取用户授权
2. 相同流程获取用户设备信息

- 百度 -

1. button 组件中，open-type 设置为 getPhoneNumber
2. 获取手机号回调
3. 返回值中 encryptedData 和 iv，服务端解密

# 二、主流的跨平台框架 - taro remax mpvue uniapp

## mpvue - 不推荐

- 特点

1. 通过 vue 来进行开发的
2. 支持多端框架
3. 保留了 vue.runtime 的 核心方法，无缝继承了 vue 的基础能力
4. 直接将 vue 的模版语法转换到小程序的 wxml 语法的能力
5. 修改了 vue 的构建配置，使之构建出符合小程序项目结构的代码格式：json / wxml / wxss / js 文件

- 原理特性

1. 不同于完全的编译时转换，mpvue 还在运行时加入了 runtime 中的元素
2. 整合了 diff/events/生命周期

- 状态

目前社区不维护，较多遗留问题

## remax

- 特点

1. 使用 react 的风格和方式进行开发
2. 把代码转换成多个小程序平台
3. 原生支持 TS

- 原理特性

1. 通过不完全依赖编译时转换，进行了运行时处理
2. 通过实现 react-dom，将 react-dom 中涉及到浏览器的 document、window 替换成小程序的内容
3. 书写风格贴近面向对象

## taro - 支持平台

- 特点

1. 原生支持依赖包管理
2. 原生支持了 es678 及以上规范
3. 原生支持了 css 预编译器
4. 原生支持 redux、mobx 进行状态管理
5. 原生小程序 API 直接调用

- 原理特性

1. 静态编译框架，主要的工作是在编译阶段进行的
2. 模块的解耦

微信小程序：taro-transformer-wx => 对 ts 和 babel 将编译结果进行分析
=> 将分析到的结构通过区分类型进行不同的操作 => AST 节点类型分析
=> jsx 节点转化为 wxml 模板 => js 逻辑
=> 在静态编译阶段实现的转译

# 三、kbone

## 1.项目创建

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

## 2.核心 —— 运行时兼容，静态复制配置

miniprogram-render - 构造元素树
custom-dom: div >> input >> label

a. 转化树结构
view - dom-div >> view - input >> view - label
b. 结合自定义组件、自定义指令
b.1 合并创建 ： 静态节点复用 + 控制更新节点数量

miniprogram-element - 监听桥梁作用  
c. 事件监听： 无缝对接

## 3.优势

a. 支持多种框架 vue react preact
b. 支持更完整的原生指令
c. 提供了全局接口 dom bom
d. 可以提供小程序本身的特性

# 四、实战

kbone-demo
