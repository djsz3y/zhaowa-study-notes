算法问题详解（4）0923——

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

// 实例
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

let mergedList = mergeKLists([l1, l2, l3])

let currentNode = mergedList
while (currentNode != null) {
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
  输入：[5,5,5,10,20] true
  [5,20,5,10,20] false

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

### 题目三：爬楼梯问题 - 
* 题目描述：假设你正在爬楼梯。需要阶你才能到达楼顶。每次你可以爬1或2个台阶。请问，有多少种不同的方法
可以爬到楼顶？
* 实例：
输入：n个台阶，输出：方案数

* 思路：走一步看一步

