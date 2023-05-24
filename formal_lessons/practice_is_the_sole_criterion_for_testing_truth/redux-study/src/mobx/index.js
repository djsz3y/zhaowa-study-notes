import { action, makeObservable, observable } from 'mobx'
// 1:42:23
class Store {
  constructor() {
    makeObservable(this)
  }

  // 定义被观察的属性
  @observable count = 0

  // mobx其实很像 Vuex ，实现和 Vuex 也很像。
  @action.bound
  add_count() {
    this.count = this.count + 1
  } // 定义一些 action 动作，这些 acton 可以让我修改它，同时触发视图更新。
  // minus_count() {
  //   this.count = this.count - 1
  // }
}

export default new Store()
