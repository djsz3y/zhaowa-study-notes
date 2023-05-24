// ?1.用过 redux 的都用过 connect(){} 这样一个高阶函数，实现一下。

// ?2.先来说说这个函数怎么用：
// *2.1 一般情况下，有一个 `function App() {}`
// function App() {}
// *2.2 最后有一个：`connect(mapStateToProps, mapDispatchToProps)(<App />)`
// 这样就可以在App里通过props拿到state数据，同时通过props来传递给dispatch。
// connect(mapStateToProps, mapDispatchToProps)(<App />)

import { useContext, useEffect, useState } from 'react'
import ReduxContext from './context'

// ?3.所以，connect必须是一个高阶函数。
export const connect = (mapStateToProps, mapDispatchToProps) => (Component) => {
  // ?3.1 定义一个 Connect
  function Connect(props) {
    // *3.1.1 先定义一个store，在这里可以拿到；
    // 我用 ReduxContext 先得创建一个，上面 import。
    const store = useContext(ReduxContext)
    const [, setBool] = useState(true) // 定义一个 useState

    // *3.1.4 所以在这里是一样的：
    // 每次我更新的时候，我订阅了，更新的时候就会执行。
    // 这样的话我们，基本上一个简单的 redux 就已经完成了。
    const forceUpdate = () => setBool((val) => !val)
    useEffect(() => {
      // eslint-disable-next-line
      store.subscribe(forceUpdate)
    }, []) // ! 注意：传两个参数——第二个是空数组 []

    // *3.1.5 接下来写一个测试用例测一测（reduxTest.jsx）。

    // *3.1.2 我们先看返回什么东西：
    // 我们最后给用户返回的肯定是 `<ReduxContext.Consumer></ReduxContext.Consumer>`
    // 里面有 store...
    return (
      <ReduxContext.Consumer>
        {(store) => (
          <>
            <Component // *...这个 Component，
              // 我们除了传它本身的 props 以外
              {...props}
              // 我们还要传在这里边，我们给到的 props
              {...mapStateToProps(store.getState())}
              {...mapDispatchToProps(store.dispatch)} // ! 注意：这里 store.dispatch 无()
            />
            {/* //*为了方便看，我们再给一个： */}
            {/* <div>{JSON.stringify(store.getState())}</div> */}
          </>
        )}
      </ReduxContext.Consumer>
    )

    // *3.1.3 之前说过，我们要触发组件的更新：
    // 除了在全局上面注入数据（2. Comsumer 和 provider），
    // 我们还要手动的去更新（1. forceUpdate）。
  }

  // ?3.2 最后 return 这个 Connect
  return Connect
}
