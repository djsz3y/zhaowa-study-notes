二十九、React 实战-项目开发(1)-页面展示实现（第三讲 组件库）

# 一、创建几个文件

创建 my_proj/packages/components/vue-components 文件夹
创建 src/button/index.tsx、src/input/index.tsx、src/image/index.tsx

# 二、如何选择合理的组件库？

- 一般会直接构建成一个大的 bundle ；
- 但是，组件库要按需引入，没有用到就不要引用，所以构建出的产物，应该和上面这个目录一致的；
- 按照一定的规则，对 src 下的东西分开打包，我可以用 typescript tsc 。但 tsc 不支持 css ，所以可以用 gulp 。

# 三、如何构建一个组件库？

要么用 gulp （是一个很好的选择），要么用 rollup （分文件夹，一起构建）。

webpack 多个 entry ，webpack 太大了，构建组件库没有必要；而且要换一个讲。

## 3.1 组件库打包的方案有哪些？（比如 antd 的构建：“三证齐全”；）

一般情况下，我们需要“三证齐全”

【1】umd

- 方便 script 标签直接引用 cdn ：`<script src="xxxx.xxx.xxx.cdn.xxx.js"></script>`

【2】cjs

- 方便使用 require 引入：`const xxx = require('xxxx')`

【3】esm

- import 引入，只引入 Button ：`import { Button } from '@proj/components'`

## 3.2 组件库和前端项目，到底有什么区别？

## 3.3 使用 rollup 构建组件库。

# 四、实践

修改 App.tsx

```tsx
import React from 'react'
import { css } from '@emotion/css'
import styles from './app.module.less'
import { BrowserRouter } from 'react-router-dom'

const App: FC = () => {
  return <BrowserRouter></BrowserRouter>
}
```

运行

> react-x

```bash
npm run start:prod
```

router config

> react-x/src/utils/store/index.js

```js

```

> react-x/src/router/index.tsx

```tsx
import { RouteObject } from 'react-router-dom'

interface extraBizObject {
  biz_code?: string
}

export const router: Array<RouteObject & extraBizObject> = [
  {
    path: '/',
    biz_code: 'root' // 加一些额外字段，肯定要组合一下。
  }
]
```

看知乎：

------------------------下面是课件第三讲---------------------

# 第三讲 组件库

src/button/index.tsx
src/input/index.tsx
src/image/index.tsx

构建成要给大的 bundle 。

组件库要按需引入，没有用到就不要引用，所以构建出的产物，应该和上面这个目录一致的。

按照一定的规则，对 src 下的东西分开打包，我可以用 typescript tsc 。但 tsc 不支持 css ，所以可以用 gulp 。

比如 antd 的构建：

## 如何选择合理的组件库？

## 如何构建一个组件库？

gulp 是一个很好的选择
rollup 分文件夹，一起构建。
antd 的构建：

### 组件库打包的方案有哪些？

一般情况下，我们需要“三证齐全”

#### umd

方便 script 标签直接引用 cdn 。

`<script src="xxxx.xxx.xxx.cdn.xxx.js"></script>`

#### cjs

require 引入
`const xxx = require('xxxx')`

#### esm

import 引入
`import { Button } from '@proj/c'`

### 组件库和前端项目，到底有什么区别？

### 使用 rollup 构建组件库。
