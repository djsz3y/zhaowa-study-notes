// 手写 call
Function.prototype.call2 = function (context, ...args) {
  if (typeof context === 'undefined' || context == null) {
    context = window
  } // 判
  let fnSymbol = Symbol() // Symbol
  context[fnSymbol] = this // 获
  let fn = context[fnSymbol](...args) // 执（参）
  delete context[fnSymbol] // 删
  return fn // 返
}
// 手写 apply
Function.prototype.apply2 = function (context, args) {
  if (typeof context === 'undefined' || context === null) {
    context = window
  } // 判
  let fnSymbol = Symbol() // Symbol
  context[fnSymbol] = this // 获
  let fn = context[fnSymbol](...args) // 执（参）
  delete context[fnSymbol] // 删
  return fn // 返
}
// 手写 bind
Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind-what is trying to be bound is not callable!'
    )
  } // 绑定必须是函数
  var self = this // 获取绑定函数
  var args = Array.prototype.slice.call(arguments, 1) // 获取bind参数
  var fNOP = function () {} // 空函数-中转
  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments) // 获取执行参数
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    ) // 1.执行时-构造函数形式：this指向实例，否则还是bind绑定时的context；2.传参。
  }
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP() // 使用中转空函数，防止修改返回函数的原型时，也修改了绑定函数的原型。
  return fBound
}
// 手写 new
function objectFactory() {
  var obj = new Object(), // 返回实例对象
    Constructor = [].shift.call(arguments) // 获取构造函数
  obj.__proto__ = Constructor.prototype // obj 继承原型属性
  var ret = Constructor.apply(obj, arguments) // obj 继承构造函数的属性
  return typeof ret === 'object' ? ret : obj // 构造函数有返回值且是对象，实例获得的属性是构造函数返回值；否则，是新创建的实例对象。
}
// 手写 Promise
class MyPromise {
  constructor(executor) {
    this.initValue()
    this.initBind()
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  initValue() {
    this.PromiseResult = null
    this.PromiseState = 'pending'
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
  }
  resolve(value) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'fulfilled'
    this.PromiseResult = value
    while (this.onFulfilledCallbacks.length) {
      console.log(this.onFulfilledCallbacks)
      this.onFulfilledCallbacks.shift()(this.PromiseResult)
    }
  }
  reject(reason) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'rejected'
    this.PromiseResult = reason
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (val) => val
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }

    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        setTimeout(() => {
          try {
            console.log(this)
            const x = cb(this.PromiseResult)
            if (x === thenPromise && x) {
              throw new Error('不能返回自己哦~')
            }
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          } catch (e) {
            reject(e)
            throw new Error(e)
          }
        })
      }

      if (this.PromiseState === 'fulfilled') {
        resolvePromise(onFulfilled)
      } else if (this.PromiseState === 'rejected') {
        resolvePromise(onRejected)
      } else if (this.PromiseState === 'pending') {
        console.log(this)
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
        // this.onFulfilledCallbacks.push(resolvePromise(onFulfilled))
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
        this.onRejectedCallbacks.push(resolvePromise(onRejected))
      }
    })

    return thenPromise
  }
  static all(promises) {
    const result = []
    let count = 0
    return new MyPromise((resolve, reject) => {
      const addData = function (value, index) {
        result[index] = value
        count++
        if (count === promises.length) resolve(result)
      }
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData(res, index)
            },
            (err) => {
              reject(err)
            }
          )
        } else {
          addData(promise, index)
        }
      })
    })
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              resolve(res)
            },
            (err) => {
              reject(err)
            }
          )
        } else {
          resolve(promise)
        }
      })
    })
  }
  static allSettled(promises) {
    const result = []
    let count = 0
    return new MyPromise((resolve, reject) => {
      const addData = function (status, value, index) {
        result[index] = {
          status,
          value
        }
        count++
        if (count === promises.length) resolve(result)
      }
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData('fulfilled', res, index)
            },
            (err) => {
              addData('rejected', err, index)
            }
          )
        } else {
          addData('fulfilled', promise, index)
        }
      })
    })
  }
  static any(promises) {
    let count = 0
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              resolve(res)
            },
            (err) => {
              count++
              if (count === promises.length) {
                reject(new AggregateError('All promises were rejected!'))
              }
            }
          )
        } else {
          resolve(promise)
        }
      })
    })
  }
}
