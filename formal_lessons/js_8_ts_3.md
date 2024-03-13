# 快速上手 TypeScript

《前端工程化（基于 Vue.js 3.0 的设计与实践）》

## 不使用 TS 的问题：

- JS 没有类型的约束，程序运行时才能发现 可避免的导致的 BUG —— 类型变化
- 可以执行前增加判断/转换，但是增加工作量。
- TS 编译检查避免这些问题。

## 实战

> hello-ts/src/ts 作为测试文件

```

```

1. 项目初始化：`npm init`

2. 安装 ts

- typescript ：ts 编程语言依赖包
- ts-node：Node 运行 ts 的执行环境

```bash
npm install -D typescript ts-node
```

### 原始数据类型

- ts 对原始数据类型的定义全转为小写。

```ts
// ts
const str: string = 'Hello World' // string
const num: number = 1 // number
const bool: boolean = true // boolean
```

### 数组

【1】数组两种类型写法：

- 如字符串：string[] Array<string> ；

剩下的：

- 数值 number
- 布尔值 boolean
- 大整数 bigint
- 符号 symbol
- 不存在 null
- 未定义 undefined
- 都相同

举例：

```ts
const strs: string[] = ['Hello World', 'Hi World']

const nums: number[] = [1, 2, 3]

const bools: boolean[] = [true, true, false]
```

【2】省略类型定义的情况：

- 有初始项目的数组，ts 会推导类型；

举例：

```ts
const strs[] = ['Hello World', 'Hi World']

const nums[] = [1, 2, 3]

const bools[] = [true, true, false]
```

【3】显示指定数组类型的情况：

- 一开始是[]（取决于 `tsconfig.json`，可能报错）

举例：

```ts
const nums = [] // 被认为是 any[] never[] 类型
```

## todo P80
