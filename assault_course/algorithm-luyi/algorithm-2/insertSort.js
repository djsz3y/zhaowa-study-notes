function insertSort(arr) {
  const len = arr.length
  for (let i = 1; i < len; i++) {
    let j = i // j 倒着走
    let target = arr[j] // 记录要往前插入的值
    while (j > 0 && arr[j - 1] > target) {
      arr[j] = arr[j - 1]
      j--
    } // 目标前所有大于目标的往后移一位
    arr[j] = target // 此时 j 即插入位
    console.log(arr.join())
  }
  return arr
}
const arr = [2, 6, 5, 9, 3, 1, 8, 4, 7]
insertSort(arr)
