# redux and mobx


## 状态管理和这些库的应用。
### 我们在设计一个数据的时候，要考虑哪些问题？


### 这个生命周期， 还有什么？


## redux (面试问的最多 70-80%)
讲透 - 能面试遇到的东西

### createStore


### 有什么问题

### 精髓1
通过 reducer 来控制对数据的修改方式和预期。

### 精髓2
处理副作用

### 精髓3
react-redux 的核心就是
- redux 是全局数据
- redux 不会触发界面更新
- react-redux， 用 Context 的 provider 和 consumer 把 redux 的 store 串了起来。


## mobx (20-30%)
- Vue react 不是很喜欢用；
- mobx 源码中API太多了；
- mobx 不同的版本差异比较大；
