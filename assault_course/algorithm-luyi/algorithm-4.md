# 算法与数据结构。

前端大厂面试 - 手写题 - 算法与数据结构。

- 数据结构
  - 数组、链表、hash、Tree、graph。
- 算法

  - 排序，双指针，
  - 四大算法

    - 二分
      - 快排、归并排序。
    - 回溯
      - 八皇后，排列，组合
    - 贪心

      - 人民币来说。318 块钱。所有的面值，可以无限取用，那么怎么样让这 318 块钱，用到最小的人民币的张数？
      - 贪在哪里？贪在我从最大的，去试。
      - 100, 100, 100, 10, 5, 1, 1, 1

    - 动规
      - 斐波那切数列。
      - N 层楼梯，一个人，一次只能走一层，或者只能走两层。问你，有多少种走法？

## 二分和回溯

在代码书写的维度，是有明确的公式的。

### 二分

```js
function search(arr, target) {
  let low = 0
  let high = arr.length - 1
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
  return -1 // return left / right + 1
}
```

### 回溯<span style="color:red;">（尤其常考）</span>

```js
// 排列组合。
// 在已有的集合中，寻找所有满足条件的子集合。
function combine(n, k) {
    const result = [], path = [];

    function backtrack(...rest) {
        if(condition) {
            result.push([...path]);
            return;
        };

        for(condition) {
            path.push();
            backtrack(...init ++);
            path.pop();
        }
    };

    backtrack(...init)

    return result;
}

```

# 贪心和动规

贪心和动规，动规还好，尤其是贪心。
是无法证实/证伪的。

## 本质

都是根据局部最优解，得出全局最优解。

## 具体步骤

### 贪心

1. 将大问题，划分成子问题；
2. 得到子问题的最优解；
3. 通过“叠加”得到全局最优解。

### 动规<span style="color:red;">（常考）</span>

1. 确定 dp 的递推公式；
2. 确定 dp 如何初始化；
3. 通过“递推”得到全局最优解。

## 饼干问题

### 455.分发饼干.js

#### 法 Ⅰ：

> 法 Ⅰ

```js
// 法Ⅰ：
var findContentChildren = function (g, s) {
  // 胃口值 g[i]
  // 饼干尺寸 s[j]
  // 要求：s[j] >= g[i]

  // 1. 先排序：从小到大
  g = g.sort((a, b) => a - b) // 胃口值排序
  s = s.sort((a, b) => a - b) // 饼干尺寸排序

  // 2. 看循环胃口（法Ⅰ）还是循环饼干（法Ⅱ）
  // 2.1法Ⅰ：满足胃口，从大到小，大饼干满足一个个的大胃口。
  //    即：从最大胃口开始计算，看饼干是否能满足胃口
  // 2.2
  let result = 0 // 满足越多数量的孩子的最大值
  let index = s.length - 1 // 饼干指针，最后一个饼干
  for (let i = g.length - 1; i >= 0; i--) {
    // 如果还有饼干，且当前饼干能满足当前胃口
    if (index >= 0 && g[i] <= s[index]) {
      // 2.3 饼干尺寸能满足胃口
      result++ // 饼干数量加 1
      index-- // 饼干指针，从大到小指，看是否符合
    }
  }
  // 2.4
  return result
}
```

#### 法 Ⅱ：

> 法 Ⅱ

```js
// 法Ⅱ：
var findContentChildren = function (g, s) {
  // 胃口值 g[i]
  // 饼干尺寸 s[j]
  // 要求：s[j] >= g[i]

  // 1. 先排序：从小到大
  g = g.sort((a, b) => a - b) // 胃口值排序
  s = s.sort((a, b) => a - b) // 饼干尺寸排序

  // 2. 看循环胃口（法Ⅰ）还是循环饼干（法Ⅱ）
  // 2.1法Ⅱ：饼干——物尽其用，从小到大。
  //      即：循环饼干，看是否能满足胃口，能满足，胃口数 index 加 1
  // 2.2
  let index = 0 // 胃口值
  for (let j = 0; j < s.length; j++) {
    if (g[index] <= s[j]) {
      // 2.3 饼干尺寸能满足胃口
      index++
    }
  }
  // 2.4
  return index
}
```

## 53.最大子数组和.js

[1]最大连续子数组的最大和。

- if 有负数，拉底总和。

[2]贪心贪在哪里？

- 只要你有负数，你就会拉低我的值，我就不要你。

```js
// 贪心贪在哪里？
// 只要你有负数，你就会拉低我的值，我就不要你。
// [-2,1,-3,4,-1,2,1,-5,4]
// result = 4-1+2+1 = 6
var maxSubArray = function (nums) {
  let result = nums[0]
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    if (sum > 0) {
      sum = sum + nums[i]
    } else {
      sum = nums[i]
    }
    result = Math.max(sum, result)
  }
  return result
}
```

## 跳跃游戏

[1]思路：  
从头开始 for 循环，  
记录每次循环 下标与当前值的和 的最大值，  
当 最大值大于等于长度 时，  
（因为每个值都是跳跃的步数，所以是 max >= len ）  
返回 true ，说明能否到达最后一个下标。

[2]题目：  
给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。  
数组中的每个元素代表你在该位置可以跳跃的最大长度。  
判断你是否能够到达最后一个下标。

### 55.跳跃游戏.js

```js
// 非负整数数组 nums ，
// 你最初位于数组的 第一个下标
// 每个元素-该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个下标

// nums        [2,   3,    1,    1,    4]
// nums[i] + i  2+0, 3+1,  1+2,  1+3,  4+4
// nums[i] + i  2,   4,    3,    4,    8
// max          2    4     4     4     8 stop
//                                     >=4 true

// nums        [3,   2,    1,    0,    4]
// nums[i] + i  3+0, 2+1,  1+2,  0+3,  4+4
// nums[i] + i  3    3     3     3     8
// max          3    3     3     3 stop
//                               >=4 false
var canJump = function (nums) {
  const len = nums.length - 1 // 注意
  let max = 0
  // 为什么是 max， 不是len， 因为当我跳到 max 时，没法往下跳了，后面是不能继续的。
  for (let i = 0; i <= max; i++) {
    max = Math.max(max, nums[i] + i)
    if (max >= len) return true
  }
  return false
}
```

# <span style="color:red;">48:39</span>

## 跳跃游戏 2

```js
var jump = function (nums) {
  let curIndex = 0 // 当前覆盖的最远的下标
  let nextIndex = 0 // 下一步覆盖的最远下标
  let steps = 0
  for (let i = 0; i < nums.length - 1; i++) {
    nextIndex = Math.max(nums[i] + i, nextIndex)
    if (i === curIndex) {
      curIndex = nextIndex
      steps++
    }
  }
  return steps
}
```

## 买入股票的最佳时机

```js
var maxProfit = function (prices) {
  if (prices.length === 0) return 0

  // 最低的买点
  let min = prices[0]
  // 最大的收入
  let max = 0

  for (let i = 0; i < prices.length; i++) {
    min = Math.min(min, prices[i])
    max = Math.max(max, prices[i] - min)
  }
  return max
}
```

## 买入股票的最佳时机 2

```js
// 贪心贪在哪？
// 贪在，只要一涨，我就卖。只要一跌，我就不买。
var maxProfit = function (prices) {
  let result = 0
  for (let i = 1; i < prices.length; i++) {
    result += prices[i] > prices[i - 1] ? prices[i] - prices[i - 1] : 0
  }

  return result
}
```

## 爬楼梯

```js
var climbStairs = function (n) {
  let dp = new Array(n)
  dp[1] = 1
  dp[0] = 1
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
```

## 不同路径

```js
var uniquePaths = function (m, n) {
  let dp = Array.from(Array(m), () => Array(n).fill(1))
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }

  return dp[m - 1][n - 1]
}
```

## 不同路径 2

```js
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  let dp = Array.from(Array(m), () => Array(n).fill(0))

  for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) {
    dp[i][0] = 1
  }

  for (let i = 0; i < n && obstacleGrid[0][i] === 0; i++) {
    dp[0][i] = 1
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1]
    }
  }

  return dp[m - 1][n - 1]
}
```

```js
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  if (obstacleGrid[0][0] === 1) return 0

  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  let dp = Array.from(Array(m), () => Array(n).fill(0))

  dp[0][0] = 1
  for (let i = 1; i < m; i++) {
    dp[i][0] = obstacleGrid[i][0] === 1 || dp[i - 1][0] === 0 ? 0 : 1
  }

  for (let i = 1; i < n; i++) {
    dp[0][i] = obstacleGrid[0][i] === 1 || dp[0][i - 1] === 0 ? 0 : 1
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1]
    }
  }

  return dp[m - 1][n - 1]
}
```

## 最小路径和

```js
var minPathSum = function (grid) {
  const m = grid.length
  const n = grid[0].length

  let dp = Array.from(Array(m), () => Array(n).fill(0))

  let sum = 0
  for (let i = 0; i < m; i++) {
    dp[i][0] = sum + grid[i][0]
    sum += grid[i][0]
  }
  sum = 0
  for (let i = 0; i < n; i++) {
    dp[0][i] = sum + grid[0][i]
    sum += grid[0][i]
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }

  return dp[m - 1][n - 1]
}
```

## 最大和的连续子数组

```js
// dp[i] 一直到 下标i 的最大连续子数组之和。

var maxSubArray = function (nums) {
  let dp = []
  dp[0] = nums[0]
  let max = dp[0]

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
    max = Math.max(max, dp[i])
  }
  return max
}
```
