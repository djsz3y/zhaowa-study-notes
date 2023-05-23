// 1.定义一组数据，比如 createData，给一个初始值 init
export const createStore = function (reducer, initState) {
  let state = initState
  let listeners = [] // 3.定义一个数组

  // 2.定义几个函数
  function subscribe(listener) {
    // 我们希望，订阅了数据的 listener ，在数据改变时，都能执行。
    listeners.push(listener) // 把 listener push进来
  }

  // immutable
  // const newState = f(state)
  // state = newState;
  // // mutable
  // state.x.y

  // 通过一些动作 action 改数据（改数据不直接改，通过一些方式，通过一些动作action来改）
  function dispatch(action) {
    // !操作行为分类就是为了可预测

    // ?提问：为什么说 redux 是 immutable 的，数据不可变的？
    // * 就是在这里，每一次 redux 执行的时候，都生成了一个 newState ，
    // * 它不是 `state.a.x = 'cc';`——（**mutable**）
    // * 它是 `const newState = f(state);`
    // * `state = newState;`——（**immutable**）
    // ! 核心就是这两句。
    // * 为什么说不可变的，因为每次都是新生成一个值，而不是直接通过.的方式改变的原来的。

    // ?这两种方式就直接对应：发布-订阅 和 Proxy。
    // ! 本质上是，我改了值以后（不管怎么改），我都要让 listener 去执行一遍：`listeners.forEach((fn) => fn())`

    // ?就可以回答：
    // * “Vue 更倾向于mobx，React更倾向于Redux，
    // * Vue 是 mutable 的，React 是 immutable 的。”
    // ! 的原因！——就是你修改数据的方法不一样。

    const newState = reducer(state, action)
    // 此=左边的data是新的data
    state = newState
    listeners.forEach((fn) => fn())
    // 为的是让我们的数据变化是一件可预测的事情。
  }
  dispatch({ type: Symbol() }) // 这里暂时模拟实现，让初始化数据先过来，不用管。

  // 获取数据
  function getState() {
    return state
  }

  return {
    subscribe,
    getState,
    dispatch // 写完 _setData ，那么我们就不暴露 changeData 了，我们暴露 setDataByAction
  }
}

// !_setData就不需要了，这个是用户写的。
// 那么我们实现一下 _setData ：
// 观察在 index.jsx 里的数据 init ，我们假设只会进行 count 的加一、减一的这两种操作；
// 那么我们这样实现：
function _setData(data, action) {
  // ?使得数据变得可预测：
  // ?你要去处理 data，只能是这两种方式，如果不是，那就不让你改变。
  // !这就是redux
  switch (action.type) {
    case 'INCREMENT':
      return { ...data, count: data.count + 1 }
    case 'DECREMENT':
      return { ...data, count: data.count - 1 }
    default:
      return data
  }
}

// *4.我现在就要实现这样一个函数：（上接 index.js）
export const combineReducers = function (reducers) {
  // *reducers 就是那个对象，所以先取 keys；
  // keys现在就是数组 [counter, info]

  const keys = Object.keys(reducers) // [counter, info]
  return function (state = {}, action) {
    const nextState = {}
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const reducer = reducers[key] // 每个 reducer
      const prev = state[key] // 之前的数据结果，就是 state[key]
      const next = reducer(prev, action) // 那我 next 的结果，就是只把前面这一部分 prev 数据执行 action，
      nextState[key] = next // 下次状态的结果（对应上 key），就是根据之前计算出来 next
    }
    return nextState
  }
}
