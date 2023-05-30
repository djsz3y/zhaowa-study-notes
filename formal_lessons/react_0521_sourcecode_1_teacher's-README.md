# React 源码

## 关于源码的一些误区

1. react 源码，很多人都没读过；
2. 读过的，很写得好不好，其实没有什么太大的关系；
3. 就算不读，依然可以回答好问题。
4. 你读源码是为了什么？
   1. 假设你是一名 Vue 的同学，为什么要学 react 的源码？
      1. 构建知识体系，就是要发现一类解决方案的规律，-> 技术无关。
      2. react 和 vue 的对比，会让你更好地了解 vue。
      3. 技多不压身。

### 源码应该怎么学？

#### 最顶的

#### 部分理解

1. 我们了解整个 react 的执行流程，在大方向不出错。 - react 17 为例。
2. 了解一些细节，了解一些常见的面试题。 - react 18 的一些 API 为例。
3. 在使用上有自己的心得。

#### 问到源码就不会

## 关于 react 的一些问题

1. 包的版本
2. 包的内容
3. 什么是运行时框架

### 包的版本

#### react 15

stack reconciler
state* num -> 1
1,2,3 * num -> 2,4,6
223, 243, 246.

#### react 17.0.2

- lagacy -- 同步
- concurrent -- 异步，并发

#### react 18

- 同步的更新 -> 异步可中断的更新
  - 优先级 batchUpdate 的原理
  - Suspense 的实现
    - Promise 有关。

### 包的内容

#### react

#### react-reconciler

#### react-dom

#### scheduler

### 什么是运行时框架？

一般情况下，会和编译器，一起来说。

```js
function Test() {
  console.log('fn is starting...')
  // todo something...
  console.log('fn is ending...')
}

// 我们现在 Test 执行的前后，增加一些能力。比如，打印一些内容。
function warpped(fn) {
  return function (...rest) {
    console.log('fn is starting...')
    fn.apply(this, rest)
    console.log('fn is ending...')
  }
}

const NewTest = warpped(Test)
```

一般我们说，应用到一些编译器的能力，就是直接读写字符串。

```vue
<template>
  <div>
    <div v-for="item of xxx"></div>
  </div>
</template>
<script></script>
```

- vue 是一个半编译，半运行时的框架。
- react 除了 jsx， 是一个完全运行时的框架。

如果你是一个架构的设计人员。

```jsx
  <div>
  {
    (function(){
      return <div></div>
    })();
  }
  </div>
```

react 为了保证自己的灵活性，你就不能走编译，你所有的东西，基本上都要是运行时的。
运行时，是不可控的。
你只有全 diff。
所以说，openblock, patchFlag,
你的书写规则，react 是没有办法给你做优化的。 只能在 运行时 做优化。

FMP，CLS，FID，
FID：first input delay. 输入延时。

#### react 中，唯一的编译，就是让 babel 团队帮它做的，编译 jsx 为一个函数。

## react 源码

### 如何进入正题？

- render
  - legacyRenderSubtreeIntoContainer
    - legacyCreateRootFromDOMContainer 帮我们创建一个根的 fiber 节点
      - createLegacyRoot
      - unbatchedUpdates
        - updateContainer
          - scheduleUpdateOnFiber
            - performSyncWorkOnRoot
              - renderRootSync
                - workLoopSync
                  - performUnitOfWork
                    - beginWork
                    - completeWork
              - commitRoot -- 界面，就显示出来了
              -

#### beginWork

最核心的内容，就是根据当前的 fiber 节点，去创建第一个子节点。
beginWork 是根据当前的 currentFiber 对比你的 vdom, 生成 wipFiber

#### completeWork

给你创建相应的 dom，以及 diff 的操作。

- createInstance 方法，创建。

#### commitWork

- 同步执行更新。
