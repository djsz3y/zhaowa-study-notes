算法问题详解（4）0923——实战

# 目录

## 实战

### 题目一：合并 k 个有序链表 - 分治

- 题目描述：输入 k 个有序的链表，输出合并后的排序链表。同类项不合并，产出依旧是链表
- 实例：输入：[1->4->5, 1->3->4, 2->6] 输出：1->1->2->3->4->4->5->6

- 思路：

1. 拆分 - 将多个链表合并 => 两两合并
2. 利用分治思想，做排序

流程：
链表 + 递归 + 链表元素组成的数组 / 链表

```js
// 接收链表数组
function mergeKLists(lists) {
  // 边缘检测
  if (lists.length === 0) return null

  return mergeLists(lists, 0, lists.length - 1)
}

// 分任务
function mergeLists(lists, left, right) {
  // '分'的处理
  if (left === right) return lists[left]

  const mid = Math.floor((left + right) / 2)

  const l1 = mergeLists(lists, left, mid)
  const l2 = mergeLists(lists, mid + 1, right)

  // 分后的链表进行分头处理
  return mergeTwoLists(l1, l2)
}

// 治任务：任务元（两两合并）
function mergeTwoLists(l1, l2) {
  if (l1 === null) return l2
  if (l2 === null) return l1
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
}

// 实例：
function ListNode(val) {
  this.val = val
  this.next = null
}

// 创建链表1
let l1 = new ListNode(1)
l1.next = new ListNode(4)
l1.next.next = new ListNode(5)

// 创建链表2
let l2 = new ListNode(1)
l2.next = new ListNode(3)
l2.next.next = new ListNode(4)

// 创建链表3
let l3 = new ListNode(2)
l3.next = new ListNode(6)

// 合并链表
let mergedList = mergeKLists([l1, l2, l3])

let currentNode = mergedList
while (currentNode !== null) {
  console.log(currentNode.val)
  currentNode = currentNode.next
}

// 1->1->2->3->4->4->5->6
```

### 题目二：柠檬水找零问题 - 贪婪

- 题目描述：
  买柠檬水的，每杯柠檬水售价 5 dollar。顾客排队买水，但是一次只能买一杯。现金面额有 5d、10d、20d。
  咱们出摊时候是没有现紧的，假设现在必须要给每个顾客正确找零，设计一个算法，判断任意排队的客户，是否可以完成正确找零
- 实例：
  输入：[5,5,5,10,20] 输出：true
  [5,20,5,10,20] 输出：false

- 思路：

1. 找到第一个没有被正确找零的人
2. 使用贪婪的方式，尽可能优先使用面值大的零钱找零

```js
function lemonadeChange(bills) {
  let five = 0
  let ten = 0

  for (const bill of bills) {
    if (bill === 5) {
      five++
    } else if (bill === 10) {
      if (five === 0) return false
      five--
      ten++
    } else {
      if (ten > 0 && five > 0) {
        ten--
        five--
      } else if (five >= 3) {
        five -= 3
      } else {
        return false
      }
    }
  }

  return true
}
```

### 题目三：爬楼梯问题 - dp

- 题目描述：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。请问，有多少种不同的方法可以爬到楼顶？

- 实例：
  输入：n 个台阶，输出：方案数

- 思路：走一步看一步
  对于第 n 个台阶，只能从 n-1 和 n-2 爬上来。用 dp[i] => dp[i] = dp[i - 1] + dp[i - 2]

```js
function climbStairs(n) {
  if (n === 1) {
    return 1
  }
}
let dp = new Array(n + 1)

dp[1] = 1
dp[2] = 2

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2]
}
return dp[n]
```

### 题目四：0-1 背包问题 - dp

- 题目描述：给定一组物品，每种物品都有自己的重量和价值，物品数量有限的。现在有一个背包，他能容纳的重量是有限的。问：如何选择物品放入背包，能够使得背包内物品的总价值最大？

- 实例：
  输入： values weights W，输出:

- 思路：走一步看一步
  a. dp[i][w] => 前 i 个物品放入容量为 w 的背包的最大价值
  b. 如果选择了放 => dp[i][w] = dp[i - 1]w - weights[i - 1]] + values[i - 1]
  c. 选择了不放 => dp[i][w] = dp[i - 1][w]
  => dp[i][w] = max(
  dp[i - 1][w],
  dp[i][w] = dp[i - 1]w - weights[i - 1]] + values[i - 1]
  )

```js
function knapsack(values, weights, W) {
  let n = values.length
  let dp = new Array(n + 1).fill(0).map(() => new Array(W + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= W; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        )
      } else {
        dp[i][w] = dp[i - 1][w]
      }
    }
  }
  return dp[n][W]
}
```

### 题目五：环游世界 - 贪婪

- 题目描述：假设你有一辆车，我们想开着他环游世界。发现很多环游路线，每一条路线都会经过 n 个加油站。
  假设咱们从第 i 个加油站道下一个加油站需要消耗 gas[i]单位的汽油，同时每个加油站的汽油库存为 gas[i]
  咱们要选择从某一个加油站开始进行环游，同时要环绕一圈回到起点。请找出可以完成这个任务的加油站的下标，如果不存在这个加油站，请返回-1
- 实例：
  输入： (gas, cost) => ([1, 2, 3, 4], [2, 3, 4, 1]) 输出: index

- 思路：
  a. 总的汽油供应和总的汽油消耗
  b. 计算当前油量，如果油量不足以到达下一个 => 更新起点到下一个加油站，并清零油量

```js
function canCompeleteCircuit(gas, cost) {
  let totalGas = 0
  let totalCost = 0
  let start = 0
  let tank = 0

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i]
    totalCost += cost[i]
    tank += gas[i] - cost[i]
    if (tank < 0) {
      start = i + 1
      tank = 0
    }
  }

  return totalGas >= totalCost ? start : -1
}
```
