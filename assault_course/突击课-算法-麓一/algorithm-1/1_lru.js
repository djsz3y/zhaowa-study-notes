// 函数的 get 和 put 必须以 O(1)的时间复杂度运行。
// get ，我是Hash, Map
// ES6 迭代器 iterator.

const LRUCache = function (capacity) {
  this.cacheQueue = new Map()
  this.capacity = capacity
}

LRUCache.prototype.get = function (key) {
  if (this.cacheQueue.has(key)) {
    // 如果我找到了，我是不是这个 key 对应的 value， 要提升新鲜度。
    const result = this.cacheQueue.get(key)
    this.cacheQueue.delete(key)
    this.cacheQueue.set(key, result)
    console.log(16, this.cacheQueue)
    return result
  }
  console.log(19, this.cacheQueue)
  return -1
}

LRUCache.prototype.put = function (key, value) {
  if (this.cacheQueue.has(key)) {
    this.cacheQueue.delete(key)
  }

  if (this.cacheQueue.size >= this.capacity) {
    // 删除 map 的第一个元素，即最长未使用的。
    this.cacheQueue.set(key, value)
    this.cacheQueue.delete(this.cacheQueue.keys().next().value)
  } else {
    this.cacheQueue.set(key, value)
  }
  console.log(35, this.cacheQueue)
}

// 测试用例：
const lru = new LRUCache(2)
lru.put(1, 1) // { 1 => 1 }
lru.put(2, 2) // { 1 => 1, 2 => 2 }
console.log(lru.get(1)) // { 2 => 2, 1 => 1 }
// 1
lru.put(3, 3) // { 1 => 1, 3 => 3 }
console.log(lru.get(2)) // { 1 => 1, 3 => 3 }
// -1
lru.put(4, 4) // { 3 => 3, 4 => 4 }
console.log(lru.get(1)) // { 3 => 3, 4 => 4 }
// -1

// 输出：
// 35 Map(1) { 1 => 1 }
// 35 Map(2) { 1 => 1, 2 => 2 }
// 16 Map(2) { 2 => 2, 1 => 1 }
// 1
// 35 Map(2) { 1 => 1, 3 => 3 }
// 19 Map(2) { 1 => 1, 3 => 3 }
// -1
// 35 Map(2) { 3 => 3, 4 => 4 }
// 19 Map(2) { 3 => 3, 4 => 4 }
// -1
