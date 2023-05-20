const arrayLike = document.querySelectorAll('div')

// 1.扩展运算符
const arr = [...arrayLike]
// 2.prototype
Array.prototype.slice.call(arrayLike)
Array.prototype.concat.apply([], arrayLike)
Array.apply(null, arrayLike) // Array 是构造函数
// 3.JS 权威指南 7.1.5 Array.from() P146
Array.from(arrayLike)

// -------------------------------------------

function test() {
  // console.log(typeof arguments)
  const arr = Array.apply(null, arguments)
  console.log(arr, arguments)
}
test(1, 2, 3, 4)
