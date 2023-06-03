// [1]编译前：
function App() {
  return (
    <div className="app">
      <h2>hello</h2>
      <div id="list">
        <ul>
          <li>list 1</li>
          <li>list 2</li>
          <li>list 3</li>
          <li>list 4</li>
          <li>list 5</li>
        </ul>
      </div>
    </div>
  )
}
// [2]编译后：
import React from 'react'
function App() {
  return React.createElement(
    'div',
    { className: 'app' },
    React.createElement('h2', null, 'hello'),
    React.createElement(
      'div',
      { id: 'list' },
      React.createElement(
        'ul',
        null,
        React.createElement('li', null, 'list 1'),
        React.createElement('li', null, 'list 2'),
        React.createElement('li', null, 'list 3'),
        React.createElement('li', null, 'list 4'),
        React.createElement('li', null, 'list 5')
      )
    )
  )
}
// [3]执行完，得到一个 vDom：
const vDom = {
  type: 'div',
  props: {
    className: 'app',
    children: [
      {
        type: 'h2',
        props: {
          value: 'hello' // 文本
        }
      }
      // ...
    ]
  }
}
