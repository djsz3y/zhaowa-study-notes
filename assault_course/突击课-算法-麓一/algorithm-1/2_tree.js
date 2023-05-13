const treeRoot = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4
    },
    right: {
      val: 5
    }
  },
  right: {
    val: 3,
    left: {
      val: 6
    },
    right: {
      val: 7
    }
  }
}

const preOrder = function (node) {
  if (node) {
    console.log(node.val)
    preOrder(node.left)
    preOrder(node.right)
  }
}

const inOrder = function (node) {
  if (node) {
    inOrder(node.left)
    console.log(node.val)
    inOrder(node.right)
  }
}

const postOrder = function (node) {
  if (node) {
    postOrder(node.left)
    postOrder(node.right)
    console.log(node.val)
  }
}

console.log(preOrder(treeRoot)) // 前序：1 2 4 5 3 6 7
console.log(inOrder(treeRoot)) // 中序：4 2 5 1 6 3 7
console.log(postOrder(treeRoot)) // 后序：4 5 2 6 7 3 1
