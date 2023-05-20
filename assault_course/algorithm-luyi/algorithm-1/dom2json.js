const dom = document.getElementById('wrapper')

function dom2json(dom) {
  let obj = {}
  obj.name = dom.tagName // dom.nodeName 范围更大
  obj.children = []
  dom.childNodes.forEach((child) => obj.children.push(dom2json(child)))

  return obj
}

dom2json(dom)