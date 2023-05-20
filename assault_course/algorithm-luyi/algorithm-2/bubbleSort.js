// function bubbleSort(arr) {
//   const len = arr.length
//   for (let i = 0; i < len; i++) {
//     for (let j = 0; j < len - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
//       }
//     }
//     console.log(arr.join(','))
//   }
//   return arr
// }

// 写冒泡：
function bubbleSort1(arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    console.log(arr.join(','))
  }
  return arr
}

// 优化 1：
// j < len - i - 1
function bubbleSort2(arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    console.log(arr.join(','))
  }
  return arr
}

// 优化 2：
// 每一轮迭代，已经不迭代了，可以直接break。
function bubbleSort3(arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    let unSwap = true
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        unSwap = false
      }
    }
    if (unSwap) break
    console.log(arr.join(','))
  }
  return arr
}

// 测试：
// const arr = [2, 6, 5, 9, 3, 1, 8, 4, 7]
const arr1 = [2, 6, 5, 9, 3, 1, 8, 4, 7]
const arr2 = [2, 6, 5, 9, 3, 1, 8, 4, 7]
const arr3 = [2, 6, 5, 9, 3, 1, 8, 4, 7]

// console.time('bubbleSort')
// bubbleSort(arr)
// console.timeEnd('bubbleSort') // 5.124ms

console.time('bubbleSort1')
bubbleSort1(arr1)
console.timeEnd('bubbleSort1') // 0.459ms

console.time('bubbleSort2')
bubbleSort2(arr2)
console.timeEnd('bubbleSort2') // 0.355ms

console.time('bubbleSort3')
bubbleSort3(arr3)
console.timeEnd('bubbleSort3') // 0.238ms

console.log('冒泡排序数组，优化后：', arr3)
