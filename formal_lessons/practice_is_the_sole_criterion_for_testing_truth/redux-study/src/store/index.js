import { createStore, combineReducers } from './redux'

// ?combineReducers 是什么？

let initState = {
  counter: { count: 0 },
  info: { age: 18 }
} // 1.先定义一个初始化数据

// 2.我们现在希望有两个 reducer
function counterReducer(state, action) {
  switch (action.type) {
    case 'ADD_COUNT':
      return { count: state.count + 1 }
    case 'MINUS_COUNT':
      return { count: state.count - 1 }
    default:
      return state
  }
}

function infoReducer(state, action) {
  switch (action.type) {
    case 'ADD_AGE':
      return { age: state.age + 1 }
    case 'MINUS_AGE':
      return { age: state.age - 1 }
    default:
      return state
  }
}

// 3.我想对 initState 里的数据：counter、info，这两块的作用域进行隔离，
// 这个隔离我希望通过 combineReducers 实现，
// ADD_COUNT 这一部分的 action ，我只处理 `counter: { count: 0 },` 这一部分东西，
// ADD_AGE 这一部分的 action ，我只处理 `info: { age: 18 }` 这一部分东西，

// *4.我现在就要实现这样一个函数：（移动到 redux.js 里了）

// 5.使得：
// counter 的数据用 counterReducer，
// info 的数据用 infoReducer，
// 来实现作用域的隔离。
const reducers = combineReducers({
  counter: counterReducer, // 这个 counter 和 initState.counter 对应的。
  info: infoReducer
})

// 6.至此，一个标准版的 redux 就实现完了。
// redux 的核心就是发布订阅。
// reducer、combineReducers，让操作可预测。

// 7.接下来该处理：第三点：修改状态，触发UI更新。
// [3]修改状态，会触发 UI 同步更新；
// 1. forceUpdate
// 2. Comsumer 和 provider
// 3. data.x = Math.random()

const store = createStore(reducers, initState)

export default store
