function merge(left, right) {
  let res = []
  let i = 0
  let j = 0
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      res.push(left[i])
      i++
    } else {
      res.push(right[j])
      j++
    }
  }

  if (i < left.length) {
    res.push(...left.slice(i))
  } else {
    res.push(...right.slice(j))
  }

  return res
}

// 这个函数的功能，是不是就是排序？input arr， --> sorted arr
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr
  }

  const mid = Math.floor(arr.length / 2)
  // mergeSort 本身给出的就是一个有序数组。
  const left = mergeSort(arr.slice(0, mid))
  // mergeSort 本身给出的就是一个有序数组。
  const right = mergeSort(arr.slice(mid))

  // 合并两个有序数组。
  return merge(left, right)
}

const arr = [2, 6, 5, 9, 3, 1, 8, 4, 7]

console.log(mergeSort(arr))
