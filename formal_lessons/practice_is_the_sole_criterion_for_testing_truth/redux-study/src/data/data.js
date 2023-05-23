// 1.定义一组数据，比如 createData，给一个初始值 init
export const createData = function (init) {
  let data = init
  let deps = [] // 3.定义一个数组

  // 2.定义几个函数
  function subscribe(handler) {
    // 我们希望，订阅了数据的 handler ，在数据改变时，都能执行。
    deps.push(handler) // 把 handler push进来
  }

  /*
  ** // !使用了 setDataByAction，就不使用 changeData了。
  // 定义一个 changeData
  function changeData(newData) {
    // 我们提供一个，修改这个data的方法
    data = newData // 赋了一个新值
    // 赋了一个新值的时候，每一个订阅的数据，我希望他们感受到变化，
    // 那我是不是要这样做：
    deps.forEach((fn) => fn()) // 数据通过 changeData 已经修改了，那我是不是要通知所有的订阅者告诉他们，哦，我这个数据发生改变。
  }
  */

  // 通过一些动作 action 改数据（改数据不直接改，通过一些方式，通过一些动作action来改）
  function setDataByAction(action) {
    // 此=左边的data是新的data
    data = _setData(data, action)
    deps.forEach((fn) => fn())
    // 为的是让我们的数据变化是一件可预测的事情。
  }

  // 获取数据
  function getData() {
    return data
  }

  return {
    subscribe,
    // changeData,
    getData,
    setDataByAction // 写完 _setData ，那么我们就不暴露 changeData 了，我们暴露 setDataByAction
  }
}

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
