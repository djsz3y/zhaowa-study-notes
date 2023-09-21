算法问题详解（2）0916——效率 & 策略

# 目录

数据结构与算法

一 前言

- 算法考察：算法考察开发人员对于代码/计算机语言熟悉&敏锐程度。

- **归纳**：从准备 -> 熟悉 -> 归纳，帮助更好的总结。

- **刷题**：代码的敏锐/熟练还是需要刷题。

<img src="./imgs/js_0909_algorithm_1/js_0909_algorithm_1.png" />

⼀、基础数据结构了解

    1.栈与队列
    2.数组和链表
    3.哈希表
    4.树结构

二 前言

⼆、数据结构分类实战

    5.栈的实现与应⽤
    6.单链表与双向链表
    7.树操作

三 & 四 前言

- 策略 -> 头绪 -> 找灵感

- 算法策略：四大策略类

- 回顾上节：  
  [1]算法在数据结构和需求之间，数据和需求的逻辑之间串通起了桥梁；  
  [2]算法最重要的一点是技巧和效率。

- 为什么需要这层，我们直接用数据结构做需求能做吗？  
  [1]绝大多数场景，日常工作中，很多时候我们屏蔽了这一层；我们直接拿数据结构做需求，数据结构不满足需求的，我们会跟后台/跟底层数据去沟通，把数据结构调整成当前需求所需要的。  
  [2]但是有些情况下，我们的确很需要在中间层做很多这样操作，算法就是这样很讲究策略和效率的。

- 那什么是策略？什么是效率？  
  [1]我们从后往前，先说效率。
  [2]再说策略。

三、算法复杂度概念

    8.时间复杂度
    9.空间复杂度
    10.复杂度计算
    11.复杂度场景

四、具体算法技巧与概念

    12.分治法
    13.贪婪
    14.动态规划
    15.图

- 预习参考⽂档：  
  https://juejin.cn/post/6844904111092006925

五、⾯试技巧&学习总结

- 预习总结⽂档：  
  https://juejin.cn/post/6844903509351989261

- 推荐参考书籍：  
  《⼤话数据结构》、 《数据结构与算法分析》、《算法图解》、《剑指 offer》

# 三、算法复杂度概念（效率）

时间复杂度 & 空间复杂度

> complexity.js

```js
// 算法复杂度 - 时间复杂度、空间复杂度

// 时间复杂度 - O(n)
// 1. 找寻循环体，找循环次数最多的代码块
// 2. 最大值原则：当算法中出现多个循环，总复杂度等于最大的代码块的复杂度
// 3. 乘法原则：当算法中出现嵌套循环，总复杂度等于嵌套内外代码的复杂度的乘积
function total(n) {
  let sum = 0                          // t

  for (let i = 0; i < n; i++) {        // nt = n次 * t时间
    sum += i                           // nt
  }

  return sum                           // t
}

total(10)
// total(10) 执行消耗了 t + nt + nt + t = 2(n + 1)t

function total2(n) {
  let sum = 0                          // t

  for (let i = 0; i < n; i++) {        // nt
    for (let j = 0; j < n; j++) {      // n * n * t
      sum = sum + i +j                 // n * n * t
    }
  }

  return sum                           // t
}

total2(10)
// total2(10) 执行消耗了 t+nt+n*n*t+n*n*t+t = 2(n*n + n + 2)t

// n => ∞ : O(n) O(n*n)

// 1 - 常数阶
const sum_plus function(){
  let i 1;
  let j 2;
  ++i;
  j+;
  return i j;
}
区
//0(1)

// 2
function total(n) {
  let sum = 0                          // t

  for (let i = 0; i < n; i++) {
    sum += i                           // nt
  }

  for (let j = 0; j < 3; j++) {
    sum += j                           // 2t
  }

  return sum                           // t
}
total() // n > 1


// 3 - 对数阶
const foo3 = function(n) {
  let i = 1
  while(i < n) {
    i = i*2
  }
}
// i 等比变化 2^n
// 2 的x次方等于 n => x = log2^n => 循环log2^n 次
// O(logN)
//    => O(nlogN)
//    y = 2^x
//    x=log2y

// 空间复杂度
// 区别：关注有没有增加新的空间占有

// 常量
const constant = function(n) {
  let j = 0
  for(let i = 0; i < n; i++){
    j++
  }
}

O{1}

// 线性增长
const line = function(n) {
  let j = []
  for(let i = 0; i < n; i++){
    j.push(i)
  }
}

O{n}
// 增长
```

# 四. 具体算法技巧与概念（策略）

## 4.1 分治

> strategy/D&C.js

```js
// 分而治之 => 分治法
// 云 => yun => y => 788 ~ 888 => 800 - yan => 800 ~ 888 => 850 - yuan => 850 ~ 888

// 工作原理：
// 1. 找出基线条件
// 2. 不断的将问题进行分解 —— 和基线保持一致
// 3. 直到问题拆解的遗留项和基线条件本身一致（查找）
// 3’. 细化（遍历）

// 面试题：快排 / 快速排序
// 1. 数据结构：数组来进行排序和待排序
// 2. 运行方式：反复执行相同操作，传入值不同 - 递归 - 算法主体结构
// 3. 确定输入输出 - 确定流程

const quickSort = function (arr) {
  let xxx = []
  // 1. 对当前数组做基线条件定义=>在数组中找到一个值作为基线
  // 2. 根据基线条件对主体数组进行拆分 => 分别对前后两项进行基线条件定义
  // 3. 再回到第一步
  // 4. 退出条件 - 只剩下基线本身

  // 4. 退出条件 - 只剩下基线本身
  if (arr.length < 2) {
    return arr
  }

  // 1. 计算基线
  let pivotIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(pivotIndex, 1)[0]

  let left = []
  let right = []

  // 2. 拆分
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  // 3. 回到第一步 - 递归
  return quickSort(left).concat([pivot], quickSort(right))
}
// 最好：O(nlogn)，最坏：O(n^2)
// 快排复杂度 <= 冒泡复杂度
```

## 4.2 贪婪/贪心

> strategy/greedy.js

```js
// 贪婪 获取利益最大化，始终查找最大项目，尽可能快速满足需求

// 面试题
// 给定一个数组nums，找到一个具有最大和的连续子数组（子数组必须最少包含一个元素），返回其最大和
// [ 1,2,3,5,-9,2,10,22,-30 ] => 36（[1,2,3,5,-9,2,10,22]）

const maxSubArray = function (nums) {
  // 1. 数据结构：数组。栈？不。 => 确定数据结构为数组
  // 2. 遍历 => sum - 当前子序列的和；answer - 表示结果
  // 3. 如果 sum > 0，则说明 sum 对结果有整体增益效果 => sum 保留并且加上当前遍历数字
  // 4. 如果 sum <= 0，无增益效果，舍弃 => sum 则直接更新为当前遍历的数字即可
  // 5. 每次都比较 sum 和 ans 的大小，将最大值给到 ans

  let ans = nums[0]
  let sum = 0

  for (const num of nums) {
    if (sum > 0) {
      sum += num
    } else {
      sum = num
    }
    ans = Math.max(ans, sum) // 始终取最大值
  }
  return ans
}
```

## 4.3 动态规划

> strategy/dp.js

```js
// 动态规划一走一步看一步
// 更加灵活=>可划分职责领域，下一步规划

// 斐波那契数列 or 杨辉三角
// f(0) = 0, f(1) = 1
// f(n) = f(n - 1) + f(n - 2), 其中 n > 1

// 遍历
const fib = function (n) {
  if (n < 2) {
    return n
  }

  let pre = 0,
    next = 0,
    result = 1
  for (let i = 2; i < n; i++) {
    // 走一步看一步
    pre = next
    next = result
    result = pre + next
  }

  return result
}

// 递归
// 。。。
```
