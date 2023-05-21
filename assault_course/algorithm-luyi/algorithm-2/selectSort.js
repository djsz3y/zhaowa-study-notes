function selectSort(arr) {
  const len = arr.length
  let minIdx
  for (let i = 0; i < len - 1; i++) {
    minIdx = i
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }
    if (minIdx !== i) {
      // 找到后面小的，交换（arr[minIdx] < arr[i]）

      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
    }
    console.log(arr.join())
  }
  return arr
}
const arr = [2, 6, 5, 9, 3, 1, 8, 4, 7]
selectSort(arr)
