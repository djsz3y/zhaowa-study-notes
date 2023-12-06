三十二、react 实战 - 接口封装与对接【39:32】

10:00 开始

## 关于离职的问题

### 离职时间，不要超过三个月

1. 先休息不超过一周
2. 简单复盘一下，你在上家公司做了什么？有没有可以迭代的。 - 1 周
   1. 结合课程看看，想想
   2. 怎么样丰富自己的简历
3. 开始投
   1. 一边投一边准备；
   2. 有 offer，尽量拖长一些；
   3. 2022 - 至今；上海，如果你离职了，很可能公司会让你现场面试。

### 3 年 2 跳、5 年 3 跳

### 离职问题总结：

1. 离职时间：不超过 3 月；
2. **复盘**：*上家做*了什么？*可迭代*什么？_结合课程丰富简历_。
3. 投：边投边准备，有 offer 尽量拖长；写 2022 - 至今避免现场面试，远程省时间。
4. 尽量不要拖太长，否则不好解释。
5. 各种包、没修完的假 离职签协议清楚；自己交社保（影响养老保险、社保、买房、当地政策）。

# 编译

## 什么是编译？

总的来说，一个 js 文件，其实就是字符串。

### 运行时

这个 js 文件，已经跑在了引擎里了。

b 打印了什么，是在你运行的时候，你才知道的。

一般来说，运行时的动态化，就是靠函数。

#### 举个例子

我们想搞一个框架。

```sh
- pages
  - home
    - index.tsx
  - user
    - index.tsx
```

文件夹自己就给我搞定路径了。

```js
import Home from './pages/home'
import User from './pages/user'
// 我在代码跑的时候，至少要有这个东西。
```

这样的话，我就需要一些编译期的能力了。

#### 再来一个例子

```js
console.log('xxxxx')

warpped(console.log('xxxxx'))
```

我们能不能把 console.log() 封装一下，让他打印这个代码的位置 line column

warpped(console.log())

你是不是还要改写，所有用到 console.log 的地方。

### 编译期

但是，我们可以用一些编译期的能力，在代码真正运行之前
去改变书写的代码的能力。

#### 编译

1. parser

   1. 解析文件，用正则等的方式，把你书写的代码，以字符串的形式，结合这门语言的规则去解析。
   2. 解析生成一个非常完整的，描述你的代码功能的 【抽象语法树】。AST

2. transform

   1. 我改它

3. generate
   1. 生成新的代码

## 我的这组色彩，是其他人维护的，比如说，是设计团队在维护。

# 实战

## 编写 consolePlugin

> my_proj_0701/packages/apps/react-x/consolePlugin.js

```js
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generate').default
const template = require('@babel/template').default

// 定义一个数组，去取 console

const targetList = ['log', 'info', 'error'].map((item) => `console.${item}`)

const consolePlugin = function ({ types }) {
  return {
    visitor: {
      // 要拿到 CallExpression
      CallExpression(path) {
        const name = generate(path.node, callee).code
        if (targetList.includes(name)) {
          const { line, column } = path.node.loc.start // 得到 起始行数列数
          path.code.arguments.unshift(
            types.stringLiteral(`filepath: ${line}, ${column}`)
          )
        }
      }
    }
  }
}

moduleExpression.exports = consolePlugin
```

> package.json

```js

```

```bash
pnpm i @babel/parser @babel/generator @babel/traverse @babel/template --filter @proj/react-x
```

```bash
cd ./packages/apps/react-x
npm run start:prod
```

# 39:32

## node

next

egg

koa, express

http

net

## JWT

jsonwebtoken

<!-- authorization: Bearer sidufaiwf2upqw98qiwobfqo9qu.q2o3ifhq29cbuiubc42qi.hq2fifb3qpfqp9bf4== -->

三段的 base64

### header

我的加密算法

```js
{"alg": "HS256", "typ": "JWT"}
```

### payload

负载，name id password

### signature

使用前两个部分，加盐。进行一个加密，编码。

salt: "zhaowajiaoyu"

《狼书》
《深入浅出 node.js》 朴灵

backend for frontend

api,

### cli

minimist command inquirer chalk yeoman-generator

# 第八讲

## 埋点和监控

-> 需求 -> UI -> 埋点评审（DA）
-> 前端上报 -> 数据清洗 -> 数据转换 -> 数据可视化

神奇：

- 埋点
- CI/CD

### 分类

- 无埋点：不需要研发同学手动去写。

  - 数据清洗是很麻烦的。
  - SDK, 用户所有的点击，我都给你上报。

- 业务埋点：手动的去埋点
  - 埋热区
  - 埋曝光

### 埋什么

1. 标识信息： eventId, eventType, userId
2. 业务自定义：【再来一单】
3. 通用的一些信息： userAgent, deviceId, timestamp, 城市

### 上报方式

#### 1px GIF 上报

```js
const upload(data) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = `http://xxx.xxx.com/xxx/xxx.gif?data=${JSON.stringfy(data)}`;

    img.onload = () => resolve(true);
    img.onerror = reject;
  })
}
```

- 避免跨域；
- 空白图片，1px GIF 比较小
- 图片不占用 Ajax 通道
- 不阻塞页面

#### 接口上报

### 上报时机

#### 实时上报

只要埋了，立即发送；

#### 延时上报

一般我们会有一个 SDK， 我把埋点的信息，收集一些，然后一起上报。

- 性能
- 设计
- 亮点

### 上报企业

神策、诸葛 IO 商业产品。

## 一些实践

1. 获取元素的唯一标识 xpath

```js
function getXPath(element) {
  // 如果元素有 id 属性，直接返回
  if (element.id) {
    return `//*[@id="${element.id}"]`
  }
  // 如果没有，向上去找我的body,
  if (element === document.body) {
    return `/html${element.tagName.toLowerCase()}`
  }

  let currentIndex = 1 // 默认第一个元素的索引为1
  let siblings = element.parentNode.childNodes

  for (let sibling of siblings) {
    if (sibling === element) {
      // 确定了当前元素在兄弟节点的索引 然后向上查找
      return `${getXPath(
        element.parentNode
      )}/${element.tagName.toLowerCase()}[${currentIndex}]`
    } else if (sibling.nodeType == 1 && sibling.tagName === element.tagName) {
      currentIndex++
    }
  }
}
```

//\*[@id="app"]/div/div[2]/div[1]/div/div[2]/div[2]/div[1]/a

## 埋点 SDK

如果说来一个，上报一个，是不是很耗性能。
是不是可以收集起来一波，然后以数组的形式，统一上报。
