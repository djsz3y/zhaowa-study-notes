const root = [
  {
    id: 1,
    text: '根节点',
    // parentId: 0,
    children: [
      {
        id: 2,
        text: '一级节点1'
        // parentId: 1
      },
      {
        id: 3,
        text: '一级节点2',
        // parentId: 1,
        children: [
          {
            id: 5,
            text: '二级节点2-1'
            // parentId: 3
          },
          {
            id: 6,
            text: '二级节点2-2'
            // parentId: 3
          },
          {
            id: 7,
            text: '二级节点2-3'
            // parentId: 3
          }
        ]
      },
      {
        id: 4,
        text: '一级节点3'
        // parentId: 1
      }
    ]
  }
]

function treeToList(root) {
  let res = []

  const dfs = function (data, parentId) {
    data.forEach((item) => {
      if (item.children) {
        dfs(item.children, item.id)
        delete item.children
      }
      item.parentId = parentId
      res.push(item)
    })
  }

  dfs(root, 0)

  return res
}

console.log(treeToList(root))

const list = [
  { id: 2, text: '一级节点1', parentId: 1 },
  { id: 5, text: '二级节点2-1', parentId: 3 },
  { id: 6, text: '二级节点2-2', parentId: 3 },
  { id: 7, text: '二级节点2-3', parentId: 3 },
  { id: 3, text: '一级节点2', parentId: 1 },
  { id: 4, text: '一级节点3', parentId: 1 },
  { id: 1, text: '根节点', parentId: 0 }
]

function listToTree(data) {
  let deps = {}
  let result = []

  // 依赖收集一遍。
  data.forEach((item) => {
    deps[item.id] = item
  })

  // 设置孩子
  for (let i in deps) {
    // 不是根节点
    if (deps[i].parentId !== 0) {
      // 项item的parentId对应到的deps无children，即子节点的父节点没有孩子
      if (!deps[deps[i].parentId].children) {
        deps[deps[i].parentId].children = [] // 给父节点弄children做准备
      }
      deps[deps[i].parentId].children.push(deps[i]) //  给父节点的children推子节点
    } else {
      result.push(deps[i]) // 根节点放到结果里
    }
  }

  return result
}

console.log(JSON.stringify(listToTree(list)))
