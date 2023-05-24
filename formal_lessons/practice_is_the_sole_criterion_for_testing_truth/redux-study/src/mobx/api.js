let deps = null
let reactions = []

// *3.1 我们定义一个函数 handler：
// 这是 Proxy 代理的写法。
const handler = () => {
  return {
    // ?5.1 我在执行 get 的时候，deps有值；
    get(target, key, descriptor) {
      if (deps) {
        reactions.push(deps)
      }
      return Reflect.get(target, key, descriptor)
    },

    // ?5.2 我在 set 的时候，做一些事情。所以上面要定义一个 reactions = []。
    // 把 reactions 拿出来执行，并且把res放进去item(res)（res变了，不用放了item()）
    set(target, key, value, descriptor) {
      const res = Reflect.set(target, key, value, descriptor)
      reactions.forEach((item) => item())
      return res
    }

    // ?6.执行 node 命令：redux-demo % node ./src/mobx/api.js

    // ?7.看打印：
    // { count: 0 } // * 先打印。
    // 0
    // 1
    // * 设置为 1，后再打印，共打印 2 次：0 1（看最后测试用例）。
    // * 再设置为 2，共打印 3 次：0 1 2（看最后测试用例）。

    // !8.总结：
    // ? 简单来说，状态管理就是这个思路，也是vue实现的思路：
    // reactions相当于depends，deps相当于watcher。
    // !（就是那个第二点）- 本质上，把 handler 放到一个地方，然后在一个合适的时间，执行一下。
    // observable 递归的加 Proxy。
    // autorun 类似于 createEffect

    // !9.再次总结：
    // * 怎么看是否精准收集依赖？看是否触发get。
    // （在autorun里）函数fn执行期间，触发get，收集函数。
    // * 怎么精准命中执行期间？deps有东西命中执行期间；
    // 那么函数fn执行期间如果触发了get，就把函数fn收集起来，在set的时候执行一下。

    // !10.再次回顾：
    // ? 什么是状态管理？
    // * 一段数据，它怎么样存储，在什么样的生命周期里。
    // ? 状态管理做了什么？
    // * 状态管理方法论（[1][2][3]）。
    // * 核心就是把handler放到一个地方，在合适的时间，执行一下：
    // mobx/api.js 里：set里的 reactions.forEach((item) => item()) ——合适的时间，执行一下。
    // store/redux.js 里：dispatch里的 listeners.forEach((fn) => fn()) ——合适的时间，执行一下。
    // *第三点：[3]状态修改，触发UI更新——这个就不是它本身做的了：
    // 不是 redux，也不是 mobx；而是react-redux，和 mobx-react。
    // Provider、Consumer、forceUpdate。
    // ?这就是状态管理，到实战课还会总结这个东西。

    // !11.一定要多看几遍！
    // 假如一节课100 2h，1h相当于值50，
    // 假如反复学反复学，一节课学了10h，那一小时的课相当于更便宜了，是不是相当于买到更多东西了。
    // 反正我的目标是这样，一节课的内容，大家尽可能地要下来再多学一学，这样才说明这一节课更有质量，我是这样认为的。
    // 。。。给我学的，我学了10h？通宵达旦地，噗哈哈。这鸟叫地声音真大，昨天早晨可给我吵得睡不着觉。
    // *这就是知识体系：
    // 学了一个东西，下次就套就行了。
    // 但是前提是，你必须对一两个知识库状态管理非常非常了解。那这样其他状态管理都是基于这一个逻辑。
    
    // zustand 的设计一样的，就是提供了很多的 hook。
  }
}

// *3.3 实现 walk
// 我们仅以对象为例：
// 对整个数据做一个代理。

// useReducer ，react 提供 api 比较多。
// *状态管理，个人觉得更多的是一种思路，并不倾向于一定要讲 redux 或者 mobx，还是思路比较重要。
// 这样的话，整个 observable 是不是就整个被拦截了。
function walk(data, handler) {
  if (typeof data !== 'object') return data
  for (let key in data) {
    data[key] = walk(data[key], handler)
  }
  return new Proxy(data, handler())
}

// ?3.怎么实现 observable？我们定义一个函数 handler。

function observable(data) {
  // *3.2 （那我在执行它的时候）创建可变对象的时候，我们要 return 一个 walk。
  return walk(data, handler) // proxy 实现
}

// *直接运行此文件：
// redux-demo % node ./src/mobx/api.js
// ?4.还需要实现 autorun。
// 现在本质上已经是一个代理了（autorun 函数里还没写那三行，可以用上述 node 命令运行了）。
// autorun 参数得是函数，autorun 执行的前后，把数据怎么样？
// autorun 用到了 store 的 count，我只有用到它，下次设置 store 的时候 autorun(fn) 的 fn 才会执行。
// *所以就是，autorun(fn)这个fn函数要作为依赖被收集起来。
// 但是我如何知道运行的autorun函数的参数fn，这个函数fn里有所依赖捏（store.count）？
// *所以我就需要（先存fn，再拿fn）。

// *5.1 我在执行 get 的时候，deps有值；
// *5.2 我在 set 的时候，做一些事情。所以上面要定义一个 reactions = []。
function autorun(fn) {
  // 先执行一段，先把这个fn，放到一个地方
  deps = fn
  fn()
  deps = null
  // 再执行一段，再把这个fn，拿出来
}

// *********************这里下面是测试用例。
// ?1.对于 mobx 来说，核心讲两个 API：observable、autorun。

// * observable（让数据变成可观察的数据）, autorun（是个什么函数呢？）
// import { observable } from 'mobx'
const data = {
  count: 0
}

// * 但凡用到了 observable观察到的那个对象，
const store = observable(data)
console.log(store)

autorun(() => {
  // 作为依赖被收集
  console.log(store.count)
})

// * 只要我下次修改了 count = 1，console.log(store.count)就会被重新执行一下。
store.count = 1
store.count = 2
// store.count = 3
// store.count = 4

// !2.我只要搞清楚这一块的原理（data、store、autorun(...)、store.count），我们是不是就能实现了，mobx核心就是这里。
