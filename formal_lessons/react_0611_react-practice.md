二十八、react 实战- 玩转 react 全家桶（第二讲 react 环境安装）

# 前言

多个条件，多项选择。

## 什么是亮点？

### 学术性

- 现在，行业的解决方案就是 A，你创造了一个 A+；
- svelte, solid.
- SCI

### 稀缺性

- 你用了一个东西，这个东西是新的，一般人不知道的。
- 小众。

### 组合性

- EI
- 现在有一个解决方案 A，但是有 m 缺点，有 p 优点
- 有另一个解决方案 B，但是有 n 缺点，有 m 优点
- 你搞了一个 A+B，针对你项目的特点

  - 可以接收 n 缺点，但是不能接受 m 缺点，而且需要 p 解决问题。

- 微前端，改了一些使用方法。让一部分能力增强了，但是可能会引入新的问题。

### X 是不是亮点 ？

防抖节流不是亮点

- 换个人想出来 X 方案，需要多少技术积累。
- 如果不需要想很久，做出来，落地，有多困难。

<!--
### rollup

- rollup 有一些问题，js 写的，不够快， rust 写一个。
- rust: swc ？ ->
- go: esbuild ? ->

### 优化

优化啥？

- FMP
  - 根据你的需求去优化
    - I/O 角度： 让你的 bundlesize 最小
      - minimize, terser, gzip
    - CDN,
    - DNS,
    - webp,
    - 加 key,
- FID -->

# 开始

## 一、css 解析

### 什么是 loader？

```js
import styles from './index.less';
import pkg from './mock.json';
import img from './assert/img1.png';

.xxx {

}
```

本质：

本质上 js 是不支持，浏览器不认识 `.xxx{}` ，只认识 `<style></style>` 和 `<link>`；所以需要 something 解析 this。

### 测试：浏览器不认识，需要解析的情况

【1】新建 index.less ：

> react-x/src/index.less

```less
.title {
  font-size: 20px;
  background-color: aqua;
}
```

【2】导入到 index.tsx ：

> react-x/src/index.tsx

```tsx
// ...
import './index.less'

// ...
```

【3】App.tsx 给 div 添加 title 类名：

> react-x/src/App.tsx

```tsx
// ...
return <div className="title">App--hello1</div>
// ...
```

【4】项目启动后显示：

<img src="./imgs/react_0611/react_0611_1-what-is-loader.png" />

### 解决：浏览器不认识，需要解析的情况（<span style="color: red;">不生效，就重启</span>）

【5】不管所有文件后缀是什么，都需要 babel 解析。所以打开 webpack.base.js ，在 module rules 里 ：

> webpack.base.js

```js
// ...
module: {
  rules: [
    {
      test: /.(ts|tsx)$/,
      use: {
        loader: 'babel-loader' // 需要配置一下：所以得创建 react-x/.babelrc
      }
    },
    {
      test: /.(css|less)$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    }
  ]
}
// ...
```

【5.1】style-loader ：如果去掉，页面没有 style 标签的样式了；

<img src="./imgs/react_0611/react_0611_3-no-style-loader.png" />

【5.1.1】此时可以尝试**安装**另一种插件 **mini-css-extract-plugin** ：

```bash
pnpm i mini-css-extract-plugin -D --filter @proj/react-x
```

【5.1.2】修改 webpack.base 配置 的 module rules ：

<strong style="color: red;">结论</strong>：为了方便**开发环境的热更新**：

- 生产环境：使用 MiniCssExtractPlugin.loader 抽离成文件
- 开发环境：使用 style-loader 页面使用 style

> webpack.base.js

```js
//...
	module: {
		rules: [
			{
				test: /.(ts|tsx)$/,
				use: {
					loader: 'babel-loader' // 需要配置一下：所以得创建 react-x/.babelrc
				}
			},
			{
				test: /.(css|less)$/,
				use: [
					// 法Ⅰ：'style-loader'
					// 法Ⅱ：MiniCssExtractPlugin.loader

					// 我们一般情况下，在开发环境中，我们用 'style-loader', 方便我们做热更新。
					// 生产环境下，我们要放在单独的文件里。
					!isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'less-loader'
				]
			}
		]
	},
  //...
```

【5.1.3】此时启动，报错：

<img src="./imgs/react_0611/react_0611_4-no-mini-css-extract-plugin-in-plugins.png" />

【5.1.4】所以还需要：在 plugins 里加入以下代码：

> webpack.base.js

```js
//...

plugins: [
  //...
  new MiniCssExtractPlugin({
    // [content hash] - chunk hash - hash : 内容变了，我才有消除缓存的意义和价值。
    filename: 'static/css/[name].[contenthash:8].css'
  }) // 重点
]
//...
```

- [content hash] - chunk hash - hash : 内容变了，我才有消除缓存的意义和价值。

【5.1.5】使用 mini-css-extract-plugin 插件，使得 css 以单文件用 link 引入页面。

<img src="./imgs/react_0611/react_0611_5-use-mini-css-extract-plugin-main-css-link.png" />

<img src="./imgs/react_0611/react_0611_6-use-mini-css-extract-plugin-main-css-network.png" />

【5.2】css-loader ：把 css 和 css 文件，插入到 script 标签里。

【5.3】postcss-loader

【5.4】less-loader ：把 less 语法解析成 css 。

【6】postcss 是 css 届的 babel ，可以配置——新建 .postcssrc.json ：

> .postcssrc.json

```json
{
  "plugins": {
    "autoprefixer": {}
  }
}
```

【7】浏览器兼容配置，新建 .browserslistrc :

> .browserslistrc

```
IE 8
chrome 20
```

<img src="./imgs/react_0611/react_0611_2-browserslistrc.png" />

【8.1】使用 tailwindcss 时，也在 .postcssrc.json 里添加：

> .postcssrc.json

```json
{
  "plugins": {
    "autoprefixer": {},
    "tailwindcss": {}
  }
}
```

【8.2】后面：

1. tailwindcss 需要 config ，所以先不加；否则可能报错。

2. 后面会有两节针对 postcss 写一些插件。

## 二、典型的 css 方案有哪些？（css 模块化方案、css 隔离方案有哪些？）

### 1.css in js

#### 1.1 emotion

优缺点：

- 好处：更灵活；
- 坏处：代码更复杂、没有提示。

安装：

```bash
pnpm i @emotion/css -D --filter @proj/react-x
```

使用：

> App.tsx

```tsx
// ...
import { css } from '@emotion/css'
// ...
const color: string = 'white'
// ...
      <div
        className={css`
          padding: 32px;
          background-color: pink;
          &: hover {
            color: ${color};
          }
        `}
      >
        hello -emotion
      </div>
// ...
```

#### 1.2 styled-component

这个可以自己查询使用方法。

#### 1.3 css in js 总结：

做技术选型的时候，可以有 css module 的方案/css 样式隔离方案：  
可以说自己之前调研过几种：  
我觉得这种怎么样，  
那种怎么样，  
后来我们选择了哪一种；  
这比直接说一个结果要好（因为这个嵌套了你的技术选型了）。

### 2.css module（\*.module.less 以模块化解析）

对于 css module 我们一般情况下使用 css module。我们来配置一下。

【1】配置 module rules ：

注意：  
处理 .module.(less|css) 、 .less 以及 .css 的时候，要用 oneOf: 包裹（代表任选一个）；  
否则显示 一串乱序字符串的样式名称；  
正确应该显示为：

<img src="./imgs/react_0611/react_0611_7-css-module.png" />

> webpack.base.js

```js
			{
				oneOf: [
					{
						// 定义，使用 xxx.module.(less|css)
						test: /.module.(less|css)$/,
						include: [path.resolve(__dirname, '../src')],
						use: [
							// 法Ⅰ：'style-loader'
							// 法Ⅱ：MiniCssExtractPlugin.loader

							// 我们一般情况下，在开发环境中，我们用 'style-loader', 方便我们做热更新。
							// 生产环境下，我们要放在单独的文件里。
							!isDev
								? 'style-loader'
								: MiniCssExtractPlugin.loader,
							{
								// 'css-loader',
								loader: 'css-loader',
								options: {
									importLoaders: 2,
									// 开启 css modules
									modules: {
										localIdentName:
											'[path][name]__[local]--[hash:base64:4]' // css module 最后生成什么文件
									}
								}
							},
							'postcss-loader',
							'less-loader'
						]
					},
					{
						test: /.(less)$/,
						use: [
							// 法Ⅰ：'style-loader'
							// 法Ⅱ：MiniCssExtractPlugin.loader

							// 我们一般情况下，在开发环境中，我们用 'style-loader', 方便我们做热更新。
							// 生产环境下，我们要放在单独的文件里。
							!isDev
								? 'style-loader'
								: MiniCssExtractPlugin.loader,
							'css-loader',
							'postcss-loader',
							'less-loader'
						]
					},
					{
						test: /.(css)$/,
						use: [
							// 法Ⅰ：'style-loader'
							// 法Ⅱ：MiniCssExtractPlugin.loader

							// 我们一般情况下，在开发环境中，我们用 'style-loader', 方便我们做热更新。
							// 生产环境下，我们要放在单独的文件里。
							!isDev
								? 'style-loader'
								: MiniCssExtractPlugin.loader,
							'css-loader',
							'postcss-loader'
						]
					}
				]
			},
```

【2】创建 app.module.less ：

> app.module.less

```less
.hello {
  background-color: blue;
}
```

【3.1】引用：

> App.tsx

```tsx
// ...
import styles from './app.module.less'
// ...
```

【3.2】但显示：

已声明“styles”，但从未读取其值。ts(6133)
找不到模块“./app.module.less”或其相应的类型声明。ts(2307)

所以需要声明文件。

【4】创建声明文件 global.d.ts ：

> global.d.ts

```ts
declare module '*.module.less'
```

【5】使用 css module （使用 app.module.less）

> App.tsx

```tsx
// ...
import { css } from '@emotion/css'
import styles from './app.module.less'
// ...
;<div className={styles.hello}>hello - css module</div>
// ...
```

### 3.utility css （以 tailwindcss 为例）

原子化 css

- tailwindcss （已安装）
- unoCss

【1】初始化，生成配置文件 tailwind.config.js ，并编辑 content 为 `content: ['./src/**/*.{tsx, ts, jsx, js}'],`：

```bash
npx tailwindcss init

# Created Tailwind CSS config file: tailwind.config.js
```

> tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx, ts, jsx, js}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

【2】只要根目录有 tailwind.config.js ，且安装插件 Tailwind CSS IntelliSense ；  
那么就可以这样使用 tailwindcss ：

> App.tsx

```tsx
<div className="text-blue-600 text-lg">hello - tailwindcss</div>
```

【3】修改 index.less ：

> index.less

```less
// .title {
// 	font-size: 20px;
// 	background-color: aqua;
// 	transform: scale(0.5);
//   opacity: 0.6;
// }

@tailwind base;
@tailwind components;
@tailwind utilities;
```

【4】修改 .postcssrc.json 添加 tailwindcss ：

> .postcssrc.json

```json
{
  "plugins": {
    "autoprefixer": {},
    "tailwindcss": {}
  }
}
```

## 三、其他

### ts 声明文件 global.d.ts 添加-其他文件的声明 ：

> global.d.ts

```ts
declare module '*.module.less'
declare module '*.less'
declare module '*.svg'
declare module '*.png'
declare module '*.gif'
declare module '*.webp'
declare module '*.jpg'
declare module '*.css'
```

现在，开发环境的 css 、静态文件已经配置好了。

### headless with styled ， 应该怎么选？

## 如何选择合理的状态管理？

- zustand ?
- redux ?
- mobx ?

- zustand ?
- solid.js
- @reduxjs/toolkit
- redux ?
- mobx ?

状态管理的核心，就是我有一个统一的数据储存，完了修改的时候，可以触发更新。
react - vue
vue: 我在修改了数据的时候，让界面更新了。

- document.createElement()
- 我在什么时候，为什么能触发界面更新
- data.x -> set -> get -> observers -> notifyAll
  react: 我在 setState 的时候，让界面更新了。
- render -> 对比 -> effects -> 界面更新。

- 修改一个数据
- 数据的改变，触发某些函数的执行
- 这些函数，能够调用 setState

# 总结

# 第三讲 组件库

## 如何选择合理的组件库？

## 如何构建一个组件库？

gulp 是一个很好的选择
rollup 分文件夹，一起构建。
antd 的构建：

### 组件库打包的方案有哪些？

一般情况下，我们需要“三证齐全”

#### umd

`<script src="xxxx.xxx.xxx.cdn.xxx.js"></script>`

#### cjs

`const xxx = require('xxxx')`

#### esm

`import { Button } from '@proj/c'`

### 组件库和前端项目，到底有什么区别？

### 使用 rollup 构建组件库。
