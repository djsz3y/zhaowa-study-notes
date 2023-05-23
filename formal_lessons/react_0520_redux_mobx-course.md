# 状态管理

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
2. Comsumer 和 provider
3. data.x = Math.random()

### 编码

> redux-study

- 仓库地址：[redux-study](https://github.com/djsz3y/zhaowa-study-notes/tree/master/formal_lessons/practice_is_the_sole_criterion_for_testing_truth/redux-study)

### 提问：为什么说 redux 是 immutable 的，数据不可变的？

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

react@17.0.2

P7 框架无关，技术无关

# 其他

一个 VSCode 插件：ES7+ React/Redux/React-Native snippets
