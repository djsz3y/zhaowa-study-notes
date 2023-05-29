function search(arr, target) {
  let low = 0
  let high = arr.length - 1
  while (low <= high) {
    let mid = low + ((high - low) >> 1)
    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] < target) {
      low = mid + 1
    } else if (arr[mid] > target) {
      high = mid - 1
    }
  }
  return -1
}
