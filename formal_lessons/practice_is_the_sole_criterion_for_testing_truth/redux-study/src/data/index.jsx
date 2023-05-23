// 在 jsx 我们放什么东西，我们简单一点：
import React from 'react'
import { createData } from './data'

let init = {
  count: 1,
  info: {
    age: 18
  }
} // 先定义一个初始化的数据

export const dataObj = createData(init)

dataObj.subscribe(() => {
  let currentData = dataObj.getData()
  console.log('the subscribed data is: ', currentData)
})

// *把所有 changeData 修改为 setDataByAction
export default function Data() {
  const handleClick1 = () => {
    // dataObj.changeData({
    //   ...dataObj.getData(),
    //   count: dataObj.getData().count + 1
    // })
    dataObj.setDataByAction({ type: 'INCREMENT' })
  }
  const handleClick2 = () => {
    // dataObj.changeData({
    //   newKey: 'luyi'
    // })
    dataObj.setDataByAction({ type: 'DECREMENT' })
    // ?这样有什么好处？这样如果传入的是 { type: 'PLUS' }，数据始终是没有变化的
    // ?也就是通过这样一种方式，使得数据变得可预测了。
  }

  return (
    <div>
      <button onClick={handleClick1}>click1</button>
      {/* 假如说这里有个数据：获取.info.age，
      那么click2一点击，数据改变了不能取到.info.age了，数据就会报错了， */}
      {/* 那么如果这样，我现在写的就不行，我是不是应该做一些可预测的操作：
      让我每一次修改数据的方式，是可以感知到的。 */}
      {/* 那我的 changeData（data.js） 就要修改 */}
      {dataObj.getData().info.age}
      <button onClick={handleClick2}>click2</button>
    </div>
  )
}
