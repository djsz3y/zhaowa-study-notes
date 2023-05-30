function quickSort(arr) {
  // if (!arr.length) return []
  if (arr.length <= 1) {
    return arr.slice()
  }

  const pivot = arr[Math.floor(Math.random() * arr.length)]

  let left = []
  let right = []
  let middle = []

  for (let i = 0; i < arr.length; i++) {
    const val = arr[i]
    if (val < pivot) {
      left.push(val)
    }
    if (val === pivot) {
      middle.push(val)
    }
    if (val > pivot) {
      right.push(val)
    }
  }

  return quickSort(left).concat(middle, quickSort(right))
}

function quickSort2(arr) {
  // if (!arr.length) return []
  if (arr.length <= 1) {
    return arr
  }

  const pivot = arr[arr.length - 1]
  const left = arr.filter((v, i) => v <= pivot && i !== arr.length - 1)
  const right = arr.filter((v) => v > pivot)

  return quickSort2(left).concat(pivot, quickSort2(right))
}

const arr = [2, 6, 5, 3, 3, 1, 8, 4, 7]

console.time('quickSort')
console.log(quickSort(arr))
console.timeEnd('quickSort')

console.time('quickSort2')
console.log(quickSort2(arr))
console.timeEnd('quickSort2')
