算法问题详解（3）0917——树操作

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

# ⼆、数据结构分类实战——7.树操作

## 2.1 定义与分类

- 1. 二叉树 0r 多子树
- 2. 结构定义

* 树是非线性数据结构
* 每个节点都可能会有 0 个到多个后代
* 除了根节点，每个节点必须具备唯一父节点（若存在多个父节点，则变成有指向图）

## 2.2 常见的树结构

```js
// dom 树
;<html>
  <head></head>
  <body>
    <div id="app">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>
    </div>
  </body>
  <script></script>
</html>

const tree_obj = {
  id: 1,
  type: 'dom',
  children: [
    {
      id: 2,
      type: 'html',
      children: [
        {
          id: 3,
          type: 'head'
        },
        {
          id: 4,
          type: 'body'
        },
        {
          id: 5,
          type: 'script'
        }
      ]
    }
  ]
}

// Program
// VariableDeclaration
// tree_obj
// init
// key
// 抽象语法树 AST
```

## 2.3 树结构的遍历

```js
const tree = {
  value: 'A',
  children: [
    {
      value: 'B',
      children: [
        {
          value: 'E'
        },
        {
          value: 'F'
        }
      ]
    },
    {
      value: 'C'
    },
    {
      value: 'D',
      children: [
        {
          value: 'E'
        },
        {
          value: 'F'
        }
      ]
    }
  ]
}
```

### 2.3.1 深度优先遍历 - dfs

- 优先遍历节点的子节点，=》兄弟节点

```js
// 请分别用两种不同的方式进行深度优先遍历
// 1. 确认输入输出 - 入: tree | 出: void
// 2. 确认执行方式 - 遍历 & 递归
// 3. 先子后兄

// 递归方式
function dfs(node) {
  console.log(node.value)
  // 有子则子
  if (node.children) {
    node.children.forEach((child) => dfs(child))
  }
}

// 遍历方式 - 栈
function dfs(node) {
  const stack = [node]
  while (stack.length > 0) {
    const current = stack.pop()
    if (current.children) {
      current.children.reverse().forEach((child) => stack.push(child)) // 后处理的先入栈
    }
  }
}
// 输出 A B E F C D G H
```

### 2.3.2 广度优先遍历 - bfs

辈分 家族 长幼

```js
// 请分别用两种不同的方式进行广度优先遍历

// 递归
function bfs(node, queue = [node]) {
  // 退出条件
  if (queue.length === 0) {
    return
  }

  const current = queue.shift()
  console.log(current.value)
  if (current.children) {
    queue.push(...current.children)
  }
  bfs(null, queue)
}

// 遍历
function bfs(node) {
  const queue = [node]
  while (queue.length > 0) {
    const current = queue.shift()
    if (current.children) {
      current.children.forEach((child) => {
        queue.push(child)
      })
    }
  }
}
// 输出：A B C D E F G H
```

## 2.4 二叉树 & 平衡二叉树 & 红黑树

```JS
// 面试：实现快速构造一个二叉树
// （1）若他的左子树非空，那么他的所有左子节点的值都应该小于根节点的值
// （2）若他的右子树非空，那么他的所有右子节点的值都应该大于根节点的值
// （3）他的左右子树各自又是一颗满足上面两个条件的二叉树

class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinaryTree {
  constructor() {
    // 根节点
    this.root = null
  },
  // 新增节点
  insert(key) {
    const newNode = new Node(key)

    // 约定右子节点都大于左子节点
    const insertNode = (node, newNode) => {
      // 小于参照物
      if(newNode.key < node.key) {
        // 1. 没有左节点的场景 => 则成为左节点
        // 2. 已有左节点的场景 => 递归改变参照物，与左节点进行对比判断插入位置
        if(node.left === null) {
          node.left = newNode
        } else {
          insertNode(node.left, newNode)
        }
      } else {
        // b. 大于参照物
        // 1. 没有右节点的场景 => 则成为右节点
        // 2. 已有右节点的场景 => 递归改变参照物，与右节点进行对比判断插入位置
        if(node.right === null) {
          node.right = newNode
        } else {
          insertNode(node.right, newNode)
        }
      }
    }

    // 判断是否为根节点
    if(this.root === null) {
      this.root = newNode
    } else {
      // 有参照物，则递归进入插入节点逻辑
      insertNode(node.right, newNode)
    }
  },
  // 查找
  // 最大值
  // 贪婪
  findMax() {
    let max = null

    // 深度优先遍历
    const dfs = node => {
      if(node === null) {
        return
      }
      if(max === null || node.key > max) {
        max = node.key
      }
      dfs(node.left)
      dfs(node.right)
    }

    dfs(this.root)
    return max
  },
  // 最小值
  findMin() {
    let min = null

    // 深度优先遍历
    const dfs = node => {
      if(node === null) {
        return
      }
      if(min === null || node.key < min) {
        min = node.key
      }
      dfs(node.left)
      dfs(node.right)
    }

    dfs(this.root)
    return min
  },
  // 值存在
  contains(key) {
    let found = false

    // 深度优先遍历
    const dfs = node => {
      if(node === null) {
        return
      }
      if(node.key === key) {
        found = true
        return
      }
      dfs(node.left)
      dfs(node.right)
    }

    dfs(this.root)
    return found
  }
  // 删除
  delete(key) {
    const deleteNode = function (node, key) {
      // 边缘检测
      if(node === null) {
        return
      }
      // 匹配
      if(key === node.key) {
        if( node.left === null && node.right ===null) {
          return null
        }
        if(node.left === null) {
          return node.right
        }
        if(node.right === null) {
          return node.left
        }

        // 左右都有
        let tmpNode = node.right
        while(tmpNode.left !== null) {
          tmpNode = tmpNode.left
        }
        node.key = tmpNode.key
        node.right = deleteNode(node.right, tmpNode.key)
      } else if(key < node.key) {
        // 走左
        node.left = deleteNode(node.left, key)
        return node
      } else {
        //走右路
        node.right = deleteNode(node.right, key)
        return node
      }
    }

    this.root = deleteNode(this.root, key)
  }
}


//       5
//     /   \
//    3     8
//   / \   / \
//  1   4 7   9
// 搜索二叉树

// => 拓展1，平衡二叉树
//       8
//     /   \
//    7     10
//   /
//  5
// / \
//3   6

// 每个节点的左子树和右子树高度因子差至多为1
// 旋转操作
//       7
//     /   \
//    5     8
//   / \     \
//  3   6     10


class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
    this.height = 1 //  rotateLeft & rotateRight & getHeight ——> 拓展1
    this.color = 'BLACK' // 红黑树 ——> 拓展2
  }
}

class AVL {
  constructor() {},
  rotateLeft(node) {
    const newNode = node.right
    node.right = newNode.left
    newRoot.left = node

    node.height = Math.max(
      this.getHeight(node.left),
      this.getHeight(node.right),
    ) + 1

    newRoot.height = Math.max(
      this.getHeight(newRoot.left),
      this.getHeight(newRoot.right),
    ) + 1

    return newRoot
  },
  rotateRight(node) {
    const newNode = node.left
    node.left = newNode.right
    newRoot.right = node

    node.height = Math.max(
      this.getHeight(node.left),
      this.getHeight(node.right),
    ) + 1

    newRoot.height = Math.max(
      this.getHeight(newRoot.left),
      this.getHeight(newRoot.right),
    ) + 1

    return newRoot
  },
  getHeight(node) {
    if(node === null) {
      return 0
    }
    return node.height
  }
  // => 拓展2：红黑树
  // 根节点是黑色
  // 当一个节点是红色的，那么他的两个子节点必须是黑色的
  // 从根节点到每个肚子的
}
```
