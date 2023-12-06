# 20:00 开始，当前静音，有问题先问。

1. 链式调用实现的关键步骤
2. 为什么在 filfulled, rejected ，用 Array ？

## 亮点

1. 细节
2. 一个表单，100 个数据。10s，
3. 输入日期，

```js

const defaultOpt = {}

function Engine(opt) {
    opt = {
        ...defaultOpt,
        ...opt
    };

    let _resolve;
    let _reject;

    let taskArr = [];
    // task -> 返回一个函数。

    new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
    }).then(res => {
       while(if(task instanceof Promise) && !shouldYield()) {
        task = tack.cb().then(res => {
            task = res;
        })
       }
    })

    function start() {
        resolve("START");
    }

    function suspense() {

    }

    return {
        start, end, suspense,
    }
}

const engine = new Engine();
engine.start()

const useFormState = (initState, key) => {
    const [state, setState] = useState(initState);

    const warppedSetState = () => {
        // 做校验。
        setState();
    }

    return [state, warppedSetState]
}

```

### umi

非常典型的微内核架构

### 基于 react 的 Fiber 异步可中断的原理，设计缓存中间层，异步实时校验变更数据，QPS 降低 30%， 给企业云服务器节约成本。

### Proxy 对数据变更做响应式更新。

### 什么是卷

业务需求， 技术需求 。

### 面向简历开发 。

## router

### 路由这个概念，跟着 SPA 出现的。

以前都是服务端控制跳转的。

### 路由分类

#### history 路由

history./\(go|back|replace|push|forward)/

#### hash 路由

window.location.hash

#### memory 路由

#### hash 路由 和 history 理由， 有什么区别？

- hash 路由一般会携带一个 # 号，不够美观； history 理由就不存在这种问题；
- 默认 hash 路由是不会像浏览器发出请求的，主要是用于锚点
  - history -> go back forward 前进后退，都会像服务器服气请求
- hash 模式一般是不支持 SSR 的，history 可以支持
- history 路由，再部署的时候，Nginx，需要自己去处理页面跳转。

```sh
location / {
    try_files uri $uri /xx/xxx/xx/index.html
}
```

#### 现在的路由，和以前的有啥区别？

以前是，服务端控制页面加载，现在是前端现在自己，控制组件渲染，来模拟跳转。
页面跳转的时候，浏览器要劫持这个 URL 的变化。

### react-router

V6

#### react-router

提供核心的 API 如：Router, Route, Switch 这些，但是没有提供有关 DOM 跳转的 API；

#### react-router-dom

提供 BrowserRouter, HashRouter, Link 这些 api, 可以通过 dom 操作触发事件控制路由。
BrowserRouter: pushState, popState 事件 构建路由。
HashRouter: hashchange 事件 构建路由

#### react-router-dom v6

### 核心原理

#### Router，派生 HashRouter 和 H5Router，主要给你提供 loaction , navigator 的上下文。

#### Routes，就是加载一个树，完了按照 Router 中的 loaction 的值，给你匹配到是哪个 {path, element }对象，渲染 element 就完事儿了。

#### Route，啥也不是，就是通过 props 提供 {path, element } 对象的

### 路由面试怎么问

路由原理
有哪几种

你们玩吧，我先走了。
