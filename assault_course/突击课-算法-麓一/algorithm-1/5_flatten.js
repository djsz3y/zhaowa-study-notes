// 数组打平
const arr = [1, 2, 3, [4, 5, [6, 7, 8], 9, 20]]

function flattenArray(arr) {
  if (!arr.length) return
  return arr.reduce(
    (pre, cur) =>
      Array.isArray(cur) ? [...pre, ...flattenArray(cur)] : [...pre, cur],
    []
  )
}

console.log(flattenArray(arr))

// 对象打平
const obj = {
  a: {
    b: {
      c: 1,
      d: 2,
      e: 3
    }
  }
}
// -->
// {
//   'a.b.c': 1,
//   'a.b.d': 2,
//   'a.b.e': 3
// }

function flattenObject(obj) {
  if (typeof obj !== 'object' || obj == null) return
  let res = {}
  const dfs = function (cur, prefix) {
    if (typeof cur === 'object' && cur != null) {
      for (let k in cur) {
        dfs(cur[k], `${prefix}${prefix ? '.' : ''}${k}`)
      }
    } else {
      res[prefix] = cur
    }
  }
  dfs(obj, '')
  return res
}

console.log(flattenObject(obj))
