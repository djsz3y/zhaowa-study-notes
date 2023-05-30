/**
 * 基本二分搜索
 * 704.二分查找.js
 */
var search = function (nums, target) {
  let low = 0
  let high = nums.length - 1
  while (low <= high) {
    /**
     * // 防止 left & right 太大相加导致溢出
     * let mid = left + (right - left) / 2;
     * // JavaScript 向下取整，可是困难到我了，测试用例运行 Run Code 一直不出结果，因为别的语言自动取整了，我要手动取整。
     * mid = Math.floor(mid);
     */
    let mid = low + ((high - low) >> 1)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      low = mid + 1
    } else if (nums[mid] > target) {
      high = mid - 1
    }
  }
  return -1
  // 如果说是找一个位置，return left ;   return right + 1
}
