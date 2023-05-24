import { useLocalObservable, Observer } from 'mobx-react'
import React from 'react'
import store from './index.js'

// ?组件怎么写的呢？
export default function A() {
  const r_store = useLocalObservable(() => store)
  // 使用  mobx-react 的 Observer，
  // 大家发现没，一旦涉及触发视图更新的逻辑，它和 mobx也没有太大关系，它还是得mobx-react。
  // 这些库，本质上都只是做了前两步，第三步它一般自己都不会做，都是第三方在做。
  return (
    <div>
      hello
      <Observer>
        {() => (
          <div>
            <h2>{r_store.count}</h2>
            <button onClick={() => r_store.add_count()}>+</button>
          </div>
        )}
      </Observer>
    </div>
  )
}
