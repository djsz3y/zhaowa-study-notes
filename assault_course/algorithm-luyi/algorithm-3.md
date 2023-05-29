20:00 准时开始。

# 二分和回溯。

一个典型的二分的写法：

```js
function search(arr, target) {
  let low = 0
  let high = arr.length - 1 //
  while (low <= high) {
    let mid = low + ((high - low) >> 1)
    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] < target) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return -1
  // 如果说是找一个位置，return left ;   return right + 1
}
```

二分要注意的几个点：

1. low <= high, 而不是 low < high ， 如果数组的长度是偶数，倒数第二步，low = high.
2. mid = low + ((high - low) >> 1); 而不是 mid = (low + high) / 2; 因为两者之和，有可能会溢出。
3. low = mid + 1; high = mid - 1. 如果你直接写成 low = mid 或者 high = mid， 可能会发生死循环。

二分场景：

1. 二分依赖的是顺序表，是数组，而不是链表；
2. 二分查找的一定是有序数组；
3. 数据量一般比较大。

## leetcode 35. 搜索插入位置

```js
var searchInsert = function (nums, target) {
  let low = 0
  let high = nums.length - 1 //
  while (low <= high) {
    let mid = low + ((high - low) >> 1)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return high + 1
}
```

```js
var searchInsert = function (arr, target) {
  const search = function (arr, target, low, high) {
    let mid = low + ((high - low) >> 1)

    if (arr[mid] === target) {
      return mid
    }

    if (low > high) {
      return low
    }

    if (arr[mid] < target) {
      return search(arr, target, mid + 1, high)
    } else {
      return search(arr, target, low, mid - 1)
    }
  }
  return search(arr, target, 0, arr.length - 1)
}
```

## 求平方根

```js
var mySqrt = function (x) {
  let low = 1,
    high = x
  while (low <= high) {
    let mid = low + ((high - low) >> 1)
    if (mid * mid <= x) {
      if ((mid + 1) * (mid + 1) > x) {
        return mid
      }
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return 0
}
```

## 搜索旋转排序数组

```js
var search = function (nums, target) {
  let low = 0
  let high = nums.length - 1

  while (low <= high) {
    let mid = low + ((high - low) >> 1)

    if (nums[mid] === target) {
      return mid
    }

    if (nums[mid] >= nums[high]) {
      // 左边有序。[low, mid)
      if (nums[low] <= target && target < nums[mid]) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    } else {
      // 右边有序 -- (mid, high]
      if (nums[mid] < target && target <= nums[high]) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
  }

  return -1
}
```

## 在排序数组中查找元素的第一个和最后一个位置

```js
var searchRange = function (nums, target) {
  const search = function (fromLow) {
    let low = 0,
      high = nums.length - 1
    while (low <= high) {
      let mid = low + ((high - low) >> 1)
      if (nums[mid] < target) {
        low = mid + 1
      } else if (nums[mid] > target) {
        high = mid - 1
      } else {
        if (fromLow) {
          // 我的值，在我的左区间
          if (nums[mid] === nums[mid - 1]) {
            high = mid - 1
          } else {
            return mid
          }
        } else {
          if (nums[mid] === nums[mid + 1]) {
            low = mid + 1
          } else {
            return mid
          }
        }
      }
    }
    return -1
  }

  return [search(true), search(false)]
}
```

# 回溯<span style="color:red;">（常考，重点）</span>

大部分情况下，解决的都是一个广义搜索的问题，也就是，从一组可能满足需求的解中，找出一部分正解。

组合： N 个数，找 K 个数的集合；
排列： N 个数，有几种排列方式；
棋盘： N 皇后，数独。

```js
var combine = function(n, k) {
    const result = [];
    const path = [];

    function backtrack() {
        if(condition) {
            result.push([...path]);
            return;
        }

        for() {
            path.push();
            backtrack();
            path.pop();
        }
    }

    backtrack();

    return result;
};
```

## 组合 1：给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合

```js
var combine = function (n, k) {
  const result = []
  const path = []

  function backtrack(path, startIndex) {
    if (path.length === k) {
      result.push([...path])
      return
    }

    for (let i = startIndex; i <= n; i++) {
      path.push(i)
      backtrack(path, i + 1)
      path.pop()
    }
  }
  backtrack(path, 1)
  return result
}
```

## 组合 2：找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合

```js
var combinationSum = function (candidates, target) {
  candidates = candidates.sort((a, b) => a - b)
  const result = []
  const path = []

  function backtrack(startIndex, sum) {
    if (sum === target) {
      result.push([...path])
      return
    }

    for (let i = startIndex; i < candidates.length; i++) {
      // 剪枝
      if (candidates[i] + sum > target) return
      path.push(candidates[i])
      backtrack(i, sum + candidates[i])
      path.pop()
    }
  }

  backtrack(0, 0)
  return result
}
```

## 组合 3：找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合， candidates 不重复

```js
var combinationSum2 = function (candidates, target) {
  candidates = candidates.sort((a, b) => a - b)
  const result = []
  const path = []

  function backtrack(startIndex, sum) {
    if (sum === target) {
      result.push([...path])
      return
    }

    for (let i = startIndex; i < candidates.length; i++) {
      // 剪枝
      if (candidates[i] + sum > target) return
      // 数组中可能有相同的数据，这个数据会影响最后的结果，有重复。
      if (i === startIndex || candidates[i] !== candidates[i - 1]) {
        path.push(candidates[i])
        backtrack(i + 1, sum + candidates[i])
        path.pop()
      }
    }
  }

  backtrack(0, 0)
  return result
}
```

## 全排列 1：数组 nums ，返回其 所有可能的全排列

```js
var permute = function (nums) {
  const result = []
  const path = []

  function backtrack(nums) {
    if (!nums.length) {
      result.push([...path])
      return
    }

    for (let i = 0; i < nums.length; i++) {
      const _nums = [...nums]
      const tmp = _nums.splice(i, 1)[0]
      path.push(tmp)
      backtrack(_nums)
      path.pop()
    }
  }

  backtrack(nums)
  return result
}
```

## 全排列 2：数组 nums ，返回其 所有可能的全排列，不重复

```js
var permuteUnique = function (nums) {
  nums.sort((a, b) => a - b)
  const result = []
  const path = []

  function backtrack(used) {
    if (nums.length === path.length) {
      result.push([...path])
      return
    }

    for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
        continue
      }
      if (!used[i]) {
        used[i] = true
        path.push(nums[i])
        backtrack(used)
        path.pop()
        used[i] = false
      }
    }
  }

  backtrack([])
  return result
}
```

## 8 皇后问题

```js
var solveNQueens = function (n) {
  const res = []
  const arr = Array(n)
    .fill(-1)
    .map(() => Array(n).fill('.'))
  function backtrack(arr, row) {
    if (row === n) {
      res.push(arr.map((i) => i.join('')))
      return
    }

    for (let i = 0; i < n; i++) {
      if (valid(arr, row, i)) {
        arr[row][i] = 'Q'
        backtrack(arr, row + 1)
        arr[row][i] = '.'
      }
    }
  }

  function valid(arr, row, col) {
    for (let i = 0; i < row; i++) {
      if (arr[i][col] === 'Q') return false
    }

    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (arr[i][j] === 'Q') return false
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (arr[i][j] === 'Q') return false
    }
    return true
  }

  backtrack(arr, 0)
  return res
}
```

# search.js

```js
function insertSearch(arr, target) {
  const search = function (arr, target, low, high) {
    let mid = low + ((high - low) >> 1)

    if (arr[mid] === target) {
      return mid
    }

    if (low > high) {
      return low
    }

    if (arr[mid] < target) {
      return search(arr, target, mid + 1, high)
    } else {
      return search(arr, target, low, mid - 1)
    }
  }
  return search(arr, target, 0, arr.length - 1)
}

console.log(bSearch([2, 3, 4, 5, 6, 7, 8, 9], 10))
```
