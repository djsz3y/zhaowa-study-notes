redux & mobx

# 目标

- redux 状态管理详解
- redux/react-redux 代码解析
- mobx 状态管理详解
- mobx 与 redux 区别
- 手写一个 redux（⭐）

# 开始——状态管理

风格：知识体系

- react
- react source
- react native
- 实战
- node
- 8 月前

## 状态

举例：
userList 渲染，一般编程关注的是（重要的是）userList 数据的状态（我们在这个过程中，什么是状态，状态就是 userList 当前所表现的一个形态；对我们来说，它代表当前页面、当前数据里，userList 在什么样的时候应该显示什么东西，做的是这样一个事情。）

```jsx
function App() {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    fetchUser.then((res) => {
      setUserList(res)
    })
  })

  return (
    <div>
      <ul>
        {userList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

这里涉及几个事情：

首先，状态，web 是一个状态机。

- 我们不关心过程，我们关心的永远是，（当前）界面处于 哪个状态。
- （那状态管理是什么？）状态管理，是一种在 web 的生命周期变化时，数据 model 所呈现出来的 view。  
  （这是我们的核心——什么是状态？状态就是页面当前它处于哪一种展示形态；比如对于这样一个例子来说，我们的心智模型是怎样的？界面进来 userList 是一个空数组，然后我们 fetchUser 调用前、后是什么样子？我们关心的永远是当前页面里，它的视图在什么样的情况下呈现什么样的内容，这个东西就是状态。状态，说白了就是你的视图 view 所呈现出来的效果，就是你的视图 view。）  
  （状态管理是什么？我们如何通过一些东西管理 view，管理我的视图当前处于一个什么样的形状或者形态。）

这个可能比较抽象，我们反过来想想，对于软件工程来说，它的核心是什么？

### 软件在做什么？

软件的核心，其实就是在管理数据（你们登录的信息、登录的状态存在哪里？Vuex。为什么要存在 Vuex 里？登录的状态存在 Vuex 里有什么问题？刷新会丢失，没错。所以大家发现没，我们在设计一个数据的时候，我们首先考虑什么？）。

我们首先考虑的是，一个数据的生命周期是什么？（有时候，大家想一想，一个数据，我们在设计功能、首先考虑功能的时候，就是这个功能需要什么数据，设计状态就是设计一个数据，设计它的生命周期是什么，作用范围是什么？）（刷新调接口是两码事）

数据设计：设计生命周期，作用范围

- DB，用户在，名字在，
- localStorage、sessionStorage 较长
- project runtime 较短
  - 状态管理的作用（项目运行时、全局存储）
- component [state, props, data]

刷新调接口：2 个 TTFB，我本该持久化的数据，我用时间换了空间，
评论列表，淘宝买东西，订单信息，调用接口请求回来，
进入购物车，
每个数据都有。。。

用较长的生命周期存储，取代较短的生命周期的数据，是一种最典型的性能优化手段，缓存设计。
react + k - diff

## 状态管理实现

redux 为主 & mobx

他们做了什么？

### 状态管理方法论

[1]组件之外，可以共享状态/数据；（有一部分数据在全局生命周期里）

- 闭包可以解决。

```js
const deps = {}
function modifyDeps(val) {
  deps.value = val
}

module.exports = {
  modifyDeps
}
```

[2]有修改状态的明确方法，并且能让其他的方法感知到；

1. 发布订阅
2. Proxy

- 本质上，把 handler 放到一个地方，然后在一个合适的时间，执行一下。

[3]修改状态，会触发 UI 同步更新；

1. forceUpdate
2. Comsumer 和 Provider
3. data.x = Math.random()

### 编码（redux & mobx）

#### 创建&启动项目：

```bash
npx create-react-app redux-study
cd redux-study
npm start
```

#### 依次创建 src 下的文件：

入口：

- `src/index.js`
- `src/App.js`

redux 原理：

- `src/data/data.js`
- `src/data/index.jsx`

模拟 redux：

- `src/store/redux.js`
- `src/store/index.js`
- `src/store/context.js`
- `src/store/connectValue.js`

redux 测试组件：

- `src/reduxTest.jsx`

模拟 mobx：

- `src/mobx/index.js`
- `src/mobx/api.js`
- `src/mobx/A.jsx`

引入 data & reduxTest & A 组件：

- `src/App.js`

#### 项目 redux-study

> redux-study

- 仓库地址：[redux-study](https://github.com/djsz3y/zhaowa-study-notes/tree/master/formal_lessons/practice_is_the_sole_criterion_for_testing_truth/redux-study)

#### 提问：为什么说 redux 是 immutable 的，数据不可变的？

```js
// immutable
// const newState = f(state)
// state = newState;
// // mutable
// state.x.y
```

36:16

43:08

<strong>1:21:15</strong>

<strong>1:39:52</strong>

#### redux 补充说明

不考虑中间件的 redux 就这些。库：react-redux 。最早实现的就是这样的 api connect 。

redux 就是数据的状态管理，不涉及视图更新。dispatch action 触发 state 变化，state 变化，订阅它变化的人再去执行一下。

react-redux 这样的东西，提供了 connect 方法让我们可以触发视图更新，forceUpdate，本质上用 Consumer 和 Provider 提供了这样的全局的作用域。

#### mobx 补充说明：准备工作

##### 安装 mobx & mobx-react

teacher

- mobx@6.6.2
- mobx-react@7.5.3

myself

```bash
npm i mobx
npm install mobx-react --save
```

- mobx@6.9.0
- mobx-react@7.6.0

##### 使用装饰器报错

###### 原因

1. 我使用的 create-react-app 脚手架创建的项目。

2. react 本身不支持装饰器，需要通过一些方式进行编译。

3. 通过什么方式进行编译？babel。  
   使用 babel 需要安装 `@babel/plugin-proposal-decorators` 并且配置；
   详情见 [Babel 官网——Installation](https://babeljs.io/docs/babel-plugin-proposal-decorators#installation)

4. 由于 create-react-app 脚手架工具已经对 webpack 做了一层封装，所以不太好去配置.babelrc 文件。

5. 需要借助 react-app-rewired：扩展了 react-scripts 的包。

6. 然后在项目根目录新建 config-overrides.js 文件：  
   根据文件名（不能写错）编译代码。

###### 解决方案（没解决，碎觉）

【1】验证从 0-> 1，所以我把 node_modules 删除掉了。

【2】安装并使用 react-app-rewired

参考链接：https://www.npmjs.com/package/react-app-rewired

安装：

```bash
npm install react-app-rewired -D
```

根目录创建 `config-overrides.js`：

```js
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return config
}
```

修改 package.json：

```js
/* package.json */

  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```

启动开发服务器：

```bash
npm start
```

嗯，还是报错：

```text
redux-study\src\mobx\index.js: Support for the experimental syntax 'decorators' isn't currently enabled (8:3):

   6 |   }
   7 |   // 定义被观察的属性
>  8 |   @observable count = 0
     |   ^
   9 |
  10 |   // mobx其实很像 Vuex ，实现和 Vuex 也很像。
  11 |   @action.bound

Add @babel/plugin-proposal-decorators (https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-decorators) to the 'plugins' section of your Babel config to enable transformation.
If you want to leave it as-is, add @babel/plugin-syntax-decorators (https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-decorators) to the 'plugins' section to enable parsing.

...

ERROR in [eslint]
src\mobx\index.js
  Line 8:2:  Parsing error: This experimental syntax requires enabling one of the following parser plugin(s): "decorators", "decorators-legacy". (8:2)

webpack compiled with 2 errors and 1 warning
```

参考链接里提到 react-app-rewired@2.X 需要安装 customize-cra。

【3】所以继续，安装 [customize-cra](https://www.npmjs.com/package/customize-cra)：

```bash
npm i customize-cra
```

把那个 [For example](https://www.npmjs.com/package/customize-cra#with-webpack) 一粘，粘进`config-overrides.js`里，Ctrl + C 重启 npm start。

管用啦~
之前是：webpack compiled with 2 errors and 1 warning
现在是：webpack compiled with 1 error and 1 warning

我的代码里有个 `, { dataObj }` 没有使用，可能 ESLint 报错了，注释掉，重启。

wow~ ⊙o⊙

```text
Starting the development server...
Compiled successfully!
You can now view redux-study in the browser.
  Local:            http://localhost:3000
...
webpack compiled successfully
```

但是在 mobx/index.js 没有改动的保存又报错了

```text
ERROR in [eslint]
src\mobx\index.js
  Line 8:2:  Parsing error: This experimental syntax requires enabling one of the following parser plugin(s): "decorators", "decorators-legacy". (8:2)

webpack compiled with 1 error and 1 warning
```

【4】那就开始看参考链接：[React 的 decorators 装饰器报错@以及后续问题解决](https://blog.csdn.net/xh_jing/article/details/107570926)，本以为用不着了。

> config-overrides.js

```js
// 参考链接：https://blog.csdn.net/xh_jing/article/details/107570926
const path = require('path')
const {
  override,
  addDecoratorsLegacy
  // disableEsLint
} = require('customize-cra')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const customize = () => (config, env) => {
  config.resolve.alias['@'] = resolve('src')
  if (env === 'production') {
    config.externals = {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  }

  return config
}

module.exports = override(
  // enable legacy decorators babel plugin
  addDecoratorsLegacy(),

  // // disable eslint in webpack
  // disableEsLint(),
  customize()
)
```

运行后，继续报错，所以想知道 `addDecoratorsLegacy()` 是什么：

> 查看 node_modules 的 customize-cra：node_modules/customize-cra/dist/index.cjs.js ；  
> 搜索 addDecoratorsLegacy，共有 3 处

看到这句（第 1 处），这是个立即执行函数：

```js
addDecoratorsLegacy = () => (e) =>
  addBabelPlugin(['@babel/plugin-proposal-decorators', { legacy: !0 }])(e)

exports.addDecoratorsLegacy = addDecoratorsLegacy
```

【5】所以这个插件：[@babel/plugin-proposal-decorators](https://babeljs.io/docs/babel-plugin-proposal-decorators#installation)，必须得装了，还想偷懒不装（前面安装了给卸载了）。

```bash
npm install --save-dev @babel/plugin-proposal-decorators
```

那就是索性把跟 babel 相关的都安装上。。。

【6】失败。

哎，基础不扎实，得补前面的 babel，好好学学！

不管了，先把剩余看完，说不定是我写的有问题。

【7】终于给我看完了（2023-05-25 6:15）。

###### <strong style="color:red;">TODO：mobx 状态（A.js）</strong>

```bash
Compiled with problems:
×
ERROR
[eslint]
src\mobx\index.js
  Line 9:2:  Parsing error: This experimental syntax requires enabling one of the following parser plugin(s): "decorators", "decorators-legacy". (9:2)
```

# 其他

## 一个 VSCode 插件

ES7+ React/Redux/React-Native snippets

## next：

react@17.0.2

react@18

## 要领悟思想。

P7 框架无关，技术无关，

框架无关，信手拈来，不局限于某一个具体的技术。

# 参考链接

## Babel

[@babel/plugin-proposal-decorators](https://babeljs.io/docs/babel-plugin-proposal-decorators#installation)

## 装饰器

### 搜索方式

[Google：从 0 搭建 react 项目使用装饰器报错](https://www.google.com.hk/search?q=从0搭建react项目使用装饰器报错&oq=从0搭建react项目使用装饰器报错&aqs=chrome..69i57j0i546l5.36051j0j15&sourceid=chrome&ie=UTF-8)

### Stack Overflow

[Syntax error - Support for the experimental syntax 'decorators-legacy' isn't currently enabled](https://stackoverflow.com/questions/52262084/syntax-error-support-for-the-experimental-syntax-decorators-legacy-isnt-cur)

### 掘金

[React 装饰器报错](https://juejin.cn/post/6913900261060640781)

### CSDN

[React 的 decorators 装饰器报错@以及后续问题解决](https://blog.csdn.net/xh_jing/article/details/107570926)

### ES6 标准入门

[网站：ECMAScript 6 入门——装饰器](https://es6.ruanyifeng.com/#docs/decorator)

[GitHub：《ECMAScript 6 入门》](https://github.com/ruanyf/es6tutorial/blob/gh-pages/docs/decorator.md)是一本开源的 JavaScript 语言教程。

[书籍（当当）：《ES6 标准入门（第 3 版）》](https://item.jd.com/10067623955926.html?bbtf=1)我的要么京东要么当当买的，谁知道捏。

## [npmjs](https://www.npmjs.com/)

https://www.npmjs.com/package/mobx

https://www.npmjs.com/package/mobx-react

https://www.npmjs.com/package/babel-preset-react-app

https://www.npmjs.com/package/react-app-rewired

https://www.npmjs.com/package/customize-cra

## create-react-app

[官网：Create React App](https://create-react-app.dev/docs/getting-started)

# <span style="color:red;">总结</span>

经过以上整理，我对自己有如下要求（好难/(ㄒ o ㄒ)/~~）：

- [ ] 掌握状态管理方法论
- [ ] 能手写一个 redux

## 额外学习了

- [x] [一星期入不了门——React 进阶——react hook 用法详解](https://github.com/djsz3y/zhaowa-study-notes/blob/master/formal_lessons/react_0514_react-advanced-usage.md#react-hook-用法详解)

- [x] [《ES6 标准入门》读书笔记——第 21 章 修饰器](https://github.com/djsz3y/learning-notes/blob/master/book/es6-standards/README.md#第-21-章-修饰器)

- [x] [《JavaScript 设计模式与开发实践》读书笔记——第 8 章 发布-订阅模式](https://github.com/djsz3y/learning-notes/blob/master/book/javascript-design-pattern/README.md#第-8-章-发布-订阅模式)

# 友情链接

- [我的掘金主页](https://juejin.cn/user/1042768423037150)

- [我的 github 主页](https://github.com/djsz3y)

- [读书视频学习笔记](https://github.com/djsz3y/learning-notes)

- [爪哇学习笔记](https://github.com/djsz3y/zhaowa-study-notes)

- [bug 仓库](https://github.com/djsz3y/bug-repository)
