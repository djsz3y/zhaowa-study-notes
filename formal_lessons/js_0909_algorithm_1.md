算法问题详解（上）——0909

# 目录

数据结构与算法

⼀. 基础数据结构了解

    1.栈与队列
    2.数组和链表
    3.哈希表
    4.树结构

⼆、数据结构分类实战

    5.栈的实现与应⽤
    6.单链表与双向链表
    7.树操作

三、算法复杂度概念

    8.时间复杂度
    9.空间复杂度
    10.复杂度计算
    11.复杂度场景

四. 具体算法技巧与概念

    12.分治法
    13.贪婪
    14.动态规划
    15.图

- 预习参考⽂档：  
  https://juejin.cn/post/6844904111092006925

五. ⾯试技巧&学习总结

- 预习总结⽂档：  
  https://juejin.cn/post/6844903509351989261

- 推荐参考书籍：  
  《⼤话数据结构》、 《数据结构与算法分析》、《算法图解》、《剑指 offer》

# 前言

- 算法考察：算法考察开发人员对于代码/计算机语言熟悉&敏锐程度。

- **归纳**：从准备 -> 熟悉 -> 归纳，帮助更好的总结。

- **刷题**：代码的敏锐/熟练还是需要刷题。

18:19

# 数组 & 链表

> array_link.js

```js
// 数组 & 链表
// 相连性 | 指向性 -> 两种操作不同
// 查找：数组连续，效率更高
//      数组可以迅速定位到数组中某一个节点的位置
//      链表则需要通过前一个元素指向下一个元素，需要前后依赖顺序查找，效率较低
// 插入：
//      数组插入元素后，后续所有元素的索引都会收到影响，进而改变。
//      链表由于其指向属性的原因，只要改变前一项和当前被插入项的next指向即可
// （2指向5，5指向3，改动两个节点就能完成一次插入）

// 面试题：实现链表（数组=>链表）（只有数组的js系统里，如何实现一个频繁插入且能够提升效率的高效系统呢？）（【笔试】）
// head => node1 => node2 => ... => null
class LinkedList {
  // 题目：1 2 3 4 5 6 7
  constructor() {
    this.length = 0
    // 1.空链表特征 => 判断链表长度
    this.head = null
  }
  getElementAt(position) {} // 2.返回索引对象的元素
  indexOf(element) {} // 3.查找元素所在位置

  append(element) {} // 4.添加节点
  insert(position, element) {} // 5.指定位置插入节点

  removeAt(position) {} // 6.删除指定位置元素
  remove(element) {} // 7.删除指定元素
}

// 辅助类
class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

// 1. 定位节点 => 前置节点
function getElementAt(position) {
  // 边缘检测
  if (position < 0 || position >= this.length) return null

  let _current = this.head
  for (let i = 0; i < position; i++) {
    _current = _current.next
  }

  return _current
}

// 2. 判断当前节点位置
function indexOf(element) {
  let _current = this.head

  for (let i = 0; i < this.length; i++) {
    if (_current.element === element) return i

    _current = _current.next
  }

  return -1
}

// 3. 添加节点 => 找到尾巴
function append(element) {
  let _node = new Node(element)

  if (this.head === null) {
    this.head = _node
  } else {
    let _current = this.getElementAt(this.length - 1)
    _current.next = _node
  }

  this.length++
}

// 4. 插入节点 => 找到前一位（找到前置节点）
function insert(position, element) {
  if (position < 0 || position >= this.length) return false // 边缘检测

  let _node = new Node(element) // 构造新节点

  if (position === 0) {
    _node.next = this.head
    this.head = _node
  } else {
    let _previous = this.getElementAt(position - 1) // 找到前一位
    // 插入
    _node.next = _previous.next
    _previous.next = _node
  }
  this.length++ // 长度++
  return true
}

// 5. 删除节点 => 找到前置节点
function removeAt(position) {
  if (position < 0 || position >= this.length) return false // 边缘检测

  let _current = this.head

  if (position === 0) {
    this.head = _current.next
  } else {
    let _previous = this.getElementAt(position - 1)
    // 删除
    _current = _previous.next
    _previous.next = _current.next
  }
  this.length-- // 长度--
  return _current.element // 返回删除的位置
}

// 双向链表
// head <=> node1 <=> node2 <=> ... <=> null
// tail | prev
class DoubleLink extends LinkedList {
  // ......
}
```

# 栈 & 队列

> stack_queue.js

```js
// 栈和队列
// 执行顺序：栈 - 先入后出，队列 - 先入先出
// （如何实现一个栈）
1:11:52

```