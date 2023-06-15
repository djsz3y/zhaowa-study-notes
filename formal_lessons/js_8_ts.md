八、TypeScript 详解（上）

# 目标

- 基础理论及原理
- type 和 interface 的异同
- 如何基于一个已有类型, 扩展出一个大部分内容相似,
- 但是有部分区别的类型?
- 实现一个路由跳转通过 ts 约束参数的 routeHelper
- 实现一个基于 ts 和事件模式的 countdown 基础
- Scanner 扫描器
- Parser 解析器
- Binder 绑定器
- Checker 检查器
- Emitter 发射器

# 概述

- 几年前选考，2022 前端必备。
- 类库、超类
- js es 语法，类型检测，编译前检测。
- 工具。
- 很多领域、很多项目、面试必考。

# 一、TS 基础概念

## 1.1 什么是 TS？

### 1.1.1 对比原理

概述：

> 他是 Javascript 的一个超集，在原有的语法基础上，添加了**可选的静态类型**和**基于类的面向对象编程**

1. 近几年，随着项目体积越来越大，项目发展越来越复杂，需要类型限制，保证每次传参每种参数的类型准确，所以它添加了*静态类型的检测*。
2. 所有的业务越来越复杂之后，*面向对象*它的优势就体现出来了，基于类、基于对象的编程，所有都以对象为中心，这样的编程方式，更有利于后续拓展、可维护。

从几个维度来看：

> 面向项目：

- TS：面向于解决大型复杂项目中，架构以及代码维护复杂场景（特别是初期可能没有那么复杂，然而随着频繁的迭代的次数，和迅速增加的模块，而拥有了庞大的未来规划体系的时候，这样的项目更适合于 TS ，它更有利于未来的维护。）
- JS: 脚本化语言，用于**面向单一简单场景**（面向页面，面对庞大的体系，没有 TS 效果好，未来共建、共同开发没有 TS 更明确。）

> 自主检测（语法）：

- TS：编译期间，主动发现并纠正错误（书写 TS 语法，编译-》浏览器能够识别的语言，编译成 JS，再去做运行，所以有一个预编译的阶段，在这个阶段里，预制了很多自主检测的机制，所以我们不需要直接去运行，在编译期间就可以发现这些错误，运行时发现错误会浪费很多资源，一个项目的运行、启动是要消耗一定的资源的，但是编译时只是 TS 的编译器在工作，提前发现问题）
- JS: 运行时报错（脚本化语言，是执行时，没有编译这个步骤；直接执行，一行一行执行，执行到时才发现错误并报错。）

> 类型检测（类型）：

- TS: 弱类型，支持对于动态和静态类型的检测（强类型和弱类型最大的区分标准是有无隐式转换、是否会有类型的变换、自主转换；TS 虽然增加了自主检测、编译时、动态静态编译时报错，但是执行的机制仍然是依赖于 JS，本质上还是转化成 JS 去运行，所以不能称之为强类型，依旧是弱类型。）
- JS: 弱类型，无静态类型选项（典型的弱类型，不关注参数类型。）

> 运行流程

- TS: 依赖编译，依赖工程化体系（很和谐、愉快的利用 TS 开发，还是需要依靠引入 TS 的工程化体系。）
- JS: 直接在浏览器中运行

> 复杂特性

- TS - 模块化、泛型、接口  
  （TS 除了和编写 JS 一致的正常的逻辑之外，他还预制了一些复杂的特性来方便我们日常的开发和使用 TS，比如说，天然的模块化，泛型，接口 interface 预设数据的一种格式。）

所以：
（我们建议大家在项目之初就能引入 TS，对 TS 包容并且支持，在它的基础上搭建的项目往往具有更好的可维护性。）

### 1.1.2 安装运行

node@16.17.0
tsc：ts compiler

```bash
    npm install -g typescript
    tsc -v
    Version 5.1.3 # 安装成功

    tsc test.ts

# Unsupported engine {
#   package: 'typescript@5.1.3',
#   required: { node: '>=14.17' },
#   current: { node: 'v14.15.4', npm: '8.15.1' }
# }
```

### 1.1.3 TS 编译为 JS `tsc test.ts`

#### 解释：

.ts ①=> .js ②=> 浏览器执行环境：

1. 这段代码如果 copy 到浏览器中是不认识`sth: string`这样的语法的，这时候我们就可以用`tsc demo.ts` 对它进行编译，把它从 ts 转化为 js ；
2. 此时我们看到多了一个同名的 js 文件；点开之后，可以发现，它已经被转化为我们浏览器可以认识的 js 语言了；
3. 这就是 ts 编译器它在这个过程中做了什么事情，做了一个转化工作；
4. 所以我们可以得出结论：他的运行流程是，先将 ts 文件转化为 js 文件（翻译成 js），然后再将它导入到浏览器执行环境当中。
5. （当工程化的 ② 这一步之后，它还会进行很多相应的配置，比如压缩、格式化等相应的处理，它的执行和 es 的 babel（把 es 的语言转化翻译成 js 之后，再给到各个浏览器去读 ） 是一致的，所以它更多的像是翻译官的工作。）

#### 举例

> demo.ts

```ts
function helloWorld(sth: string) {
  return 'helloworld zhaowa' + sth
}
console.log(helloWorld('ts'))
```

执行 tsc demo.ts ，生成

> demo.js

```js
function helloWorld(sth) {
  return 'helloworld zhaowa' + sth
}
console.log(helloWorld('ts'))
```

### 1.1.4 面试点：所有类型检测和语法检测 => 编译时

所有类型检测和语法检测，都是再什么时间段进行的？

- 都是在**编译时**进行的。

经常准备的面试题/**面试宝典**会有这样的题：

- 这样执行会不会报错的情况，是 error 还是 warning？  
  如果不报错，返回的是 undefined 还是什么？  
  如果没有报错返回什么？  
  如果报错，报什么错误？

经常会有这样的面试题。

现在多了 ts 这样的语言之后，会有：

- 这个错误是在 ts 阶段报错还是在具体的 js 执行态时报错？

这样类似的题目，只要知道的**区分点**是：

- 所有的类型检测和语法检测，它们错误的时候才会在 ts 报错，剩下的还是在 js 执行态报错。

## 1.2 TS 基础类型与写法

### 1.2.1 基础类型：

布尔值、字符串、数字、数组、null、undefined 这些耳熟能详的基础类型，ts 都是有的。

- boolean、string、number、array、null、undefined

### 1.2.2 TS 的书写方式

TS 的书写方式，也是类似的：

[1]es、js 实现基础类型的书写方法：

```js
    // es
    let isEnabled = true;
    let class = 'zhaowa';
    let classNum = 2;
    let u = undefined;
    let n = null;
    let classArr = ['basic', 'execute'];
```

[2]TS 的书写方法：

`变量: 变量补充`

```ts
    // TS
    let isEnabled: boolean = true;
    let class: string = 'zhaowa';
    let classNum: number = 2;
    let u: undefined = undefined;
    let n: null = null;
    let classArr: string[] = ['basic', 'execute'];
    let classArr: Array<string> = ['basic', 'execute'];
```

上述只能描述数组内类型相同的场景。如果数组内类型不同怎么办？假设数组内有字符串、数字、undefined、null 怎么办？

TS 新增加了一种类型叫元组（元素的组成） tuple ：

### 1.2.3 tuple - 元组

逐个声明

```ts
let tupleType: [string, boolean]
tupleType = ['zhaowa', true]
```

### 1.2.4 enum - 枚举

常见的数据存在形态

```ts
// 1.数字类型枚举（默认） - 默认从0开始，依次递增
enum Score {
  BAD, // 0
  NG, // 1
  GOOD, // 2
  PERFECT // 3
}

let sco: Score = Score.BAD // sco 美剧类型 Score ，值为 Score.BAD 这个分数

// 2.字符串类型枚举
enum Score {
  BAD = 'BAD',
  NG = 'NG',
  GOOD = 'GOOD',
  PERFECT = 'PERFECT'
}

// 3.反向映射（TS 原生支持反向映射； JS 中要把 0 bad bad 0 都写在 hash 表里/映射的对象里，这样正向、反向都可以取到。）
enum Score {
  BAD,
  NG,
  GOOD,
  PERFECT
}

let scoName = Score[0] // BAD - 反向
let scoVal = Score['BAD'] // 0 - 正向

// 4.异构（混合类型）
enum Enum {
  A, // 0
  B, // 1
  C = 'C',
  D = 'D',
  E = 6,
  F // 7
}

// 5.面试题/笔试题：指出异构的枚举值（异构类型值的补充，可能会考）

// 6.面试题: 手写将其转化为JS实现
let Enum
;(function (Enum) {
  // 正向
  Enum['A'] = 0
  Enum['B'] = 1
  Enum['C'] = 'C'
  Enum['D'] = 'D'
  Enum['E'] = 6
  Enum['F'] = 7

  // 反向
  Enum[0] = 'A'
  Enum[1] = 'B'
  Enum[6] = 'E'
  Enum[7] = 'F'
})(Enum || (Enum = {}))

// 6.2
var Enum
;(function (Enum) {
  Enum['A'] = '0'
  Enum[(Enum['B'] = 3)] = 'B'
  Enum['C'] = 'C'
  Enum['D'] = 'D'
  Enum[(Enum['E'] = 6)] = 'E'
  Enum[(Enum['F'] = 7)] = 'F' // 7
})(Enum || (Enum = {}))
console.log(Enum.A)

// 枚举值遍历等问题

// 逐步考察相关联知识点。
```

### 1.2.5 any unknown void never - 四种空类型

#### 1.2.5.1 any - 忽略所有类型检查（类型检测、编译筛查全部失效）：

```ts
// 1.any - 绕过所有类型检查 => 类型检测和编译筛查都全部失效
let anyValue: any = 123

anyValue = 'anyValue'
anyValue = false

let value1: boolean = anyValue // anyValue 必须是 布尔值，不然通不过 value1 的类型检测。
```

#### 1.2.5.2 unknown - 忽略赋值检查：

- 赋值检查不做类型检测。

- 但是，赋值的时候：  
  unknown 类型的 unknownValue 在赋值给其他变量也要进行类型检测  
  （先检测 unknownValue 类型是否可以赋值给 value1 ，因为 unknownValue 是字符串，而 value1 是布尔）。

```ts
// 2.unknown - 绕过了赋值检查 => 禁止更改传递
let unknownValue: unknown

unknownValue = true
unknownValue = 123
unknownValue = 'unknownValue'

let value1: unknown = unknownValue // OK
let value1: any = unknownValue // OK
let value1: boolean = unknownValue // NOK
```

#### 1.2.5.3 void - 声明函数的返回值：

```ts
// 3.void - 声明函数的返回值
function voidFunction(): void {
  console.log('void function')
} // void 告诉编译器 此函数无 return
```

#### 1.2.5.4 never - 函数永不返回：

```ts
// never - 函数永不返回
function error(msg: string): never {
  throw new Error(msg)
}

function longlongLoop(): never {
  while (true) {}
} // 死循环，维持永不出来
```

### 1.2.6 object / {} - 对象

TS 将 js 的 object 分成两个接口来定义

#### 1.2.6.1 对 Object 做了一些预设：

```ts
interface ObjectConstructor {
  create(o: object | null): any
}

const proto = {}

Object.create(proto)
Object.create(null)
Object.create(undefined) // Error 不支持传 undefined
```

#### 1.2.6.2 Object.prototype 上属性：

对象的属性要在 interface 里声明，否则 obj.prop 直接用会报错。

```ts
// Object
// Object.prototype上属性
interface Object {
  constructor: Function
  toString(): string
  toLocaleString(): string
  valueof(): Object
  hasOwnProperty(v: PropertyKey): boolean
  isPrototypeOf(v: Object): boolean
}

// {} - 空对象定义空属性
const obj = {}

obj.prop = 'zhaowa' // Error
// 可以使用Object上的所有方法的
obj.toString() // OK
```

# 二、接口 - interface

## 2.1 基本使用

interface ：对行为的一种抽象，具体行为由类实现

```ts
interface Class {
  name: string
  time: number
}

let zhaowa: Class = {
  name: 'ts',
  time: 2
}
```

## 2.2 readonly ：只读-只能读取

### 2.2.1 readonly

```ts
interface Class {
  readonly name: string // 只读
  time: number
}
```

### 2.2.2 面试题：ReadonlyArray VS const

=> 执行阶段  
只读和 JS 的引用是不同的

```ts
let arr: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = arr

// 以下这些情况都报错：ERROR
ro[0] = 12
ro.push(5)
ro.length = 100
arr = ro
```

## 2.3 任意

```ts
// 任意
interface Class {
  readonly name: string
  time: number
  [propName: string]: any // 标识 可能会 多一些 属性，比如 level
}
const c1 = { name: 'JS', time: 1 }
const c2 = { name: 'browser', time: 1 }
const c3 = { name: 'ts', level: 1, time: 1 }
```

# 三、交叉类型 - &

```ts
// 合并
interface A {
  x: D
}
interface B {
  x: E
}
interface C {
  x: F
}

interface D {
  d: boolean
}
interface E {
  e: string
}
interface F {
  f: number
}
```

[1]合并：

```ts
// A-D-d B-E-e C-F-f 合并起来
type ABC = A & B & C
let abc: ABC = {
  x: {
    d: false,
    e: 'zhaowa',
    f: 5
  }
}
```

[2]合并冲突：

A B 都有 c ，合并 &  
 => 丢失、不可存在的状态  
 => 且关系  
 => c: never

```ts
// 合并冲突
interface A {
  c: string
  d: string
}
interface B {
  c: number
  e: string
}

type AB = A & B
let ab: AB = {
  // => 且关系 => c: never
  d: 'class',
  e: 'class'
}
```

js 中 A B 动态合并冲突（都有 c 且类型不同），后者会覆盖前者；  
TS 中 A B 动态合并冲突（都有 c 且类型不同），没有同时满足两个方法，会消失；  
所以要补充说明、单独领出来。

原始逻辑代码要更改，要测试，这就是 某 js 项目改成 ts 的成本。

# 四、断言 - 类型声明、转换（开发者和编译器的预先告知交流）

- 编译状态在产生作用

```ts
// 尖括号形式声明
let anyValue: any = 'hi zhaowa'
let anyLength: number = (<string>anyValue).length

// as声明
let anyValue: any = 'hi zhaowa'
let anyLength: number = (anyValue as string).length

// 非空 - 只判断不为空
type ClassTime = () => number

const start = (classTime: ClassTime | undefined) => {
  let num = classTime!() // 具体类型待定，但是非空确认
}
// 使用场景 - 通用中台数据处理逻辑
const tsClass: number | undefined = undefined
const zhaowa: number = tsClass!

// 底层实现后，上层应用1
const tsClass = undefined
const zhaowa = tsClass
// => 产出undefined可能

// 肯定化保证
let score: number
startClass()
console.log(2 * score)

function startClass() {
  score = 5
}
let score!: number // 告知编辑器，运行时会被赋值的
```

# 五、类型守卫 - 保障语法规定的范围内，额外的确认

- 多态 - 多重状态类型

## 5.1 interface Teacher | Student

```ts
interface Teacher {
  name: string
  courses: string[]
  score: number // 打分
}
interface Student {
  name: string
  startTime: Date
  score: string // 优 良 及格
}
type Class = Teacher | Student
```

## 5.2 in 守卫 - 是否包含某种属性

```ts
function startCourse(cls: Class) {
  if ('courses' in cls) {
    // 老师
  }
  if ('startTime' in cls) {
    // 学生
  }
}
```

## 5.3 typeof / instanceof - 类型分类场景下的身份确认

```ts
// typeof
function startCourse(cls: Class) {
  if (typeof cls.score === 'number') {
    // 老师
  }
  if (typeof cls.score === 'string') {
    // 学生
  }
}
// instanceof
function startCourse(cls: Class) {
  if (cls instanceof Teacher) {
    // 老师
  }
  if (cls instanceof Student) {
    // 学生
  }
}
```

## 5.4 自定义类型：

```ts
// 自定义类型
const isTeacher = function (cls: Teacher | Student): cls is Teacher {
  // 老师……
}

const getInfo = (cls: Teacher | Student) => {
  if (isTeacher(cls)) {
    return cls.courses
  }
}
```

# 六、TS 进阶方案

## 6.1 函数重载

基于类型守卫之上的函数重载——函数重写方案：

```ts
class Class {
  start(name: number, score: number): number
  // 又增加一种可能性
  start(name: string, score: string): string // 后台接口 来自于 不同的方案
  // 又增加一种可能性
  start(name: string, score: number): number
  // 复合类型，重载，利用守卫 进行函数重载，做处理；
  // 也就是基于类型守卫之上的函数重载：
  start(name: Comnbinable, score: Comnbinable) {
    if (typeof name === 'number' || typeof score === 'number') {
      // 处理
    }
    if (typeof name === 'string' || typeof score === 'string') {
      // 处理
    }
    if (typeof name === 'string' || typeof score === 'number') {
      // 处理
    }
  }
}
```

## 6.2 泛型（模块支持多种类型数据） - 重用

泛型侧重点：**重用**（重复使用）（一个函数适用多种类型的处理）

- **类型和值一样可以被赋值传递**；
- 函数传值，形参、实参进行值的传递；
- **阶段性方式限制类型**，后期好维护。

这种思路可以用在类型上：

```ts
// T number U number T number => 就是上面 => 函数重载的第一种情况。
function startClass<T, U>(name: T, score: U): T {
  // 逻辑
}
function startClass<T, U>(name: T, score: U): string {
  // 逻辑
}
```

加上 阶段性方式 断言：

- 使用泛型，最好限制某几个参数，不要全部都泛型，
- 根据经验，**越开放，后期维护成本越高**。
- 采取阶段性开放的策略  
  （6 个参数：1,2 个用泛型放开，剩下的不管用重载还是什么方式，先阶段性的限制一下；）  
  （不然时间久了，就失去了 TS 对类型严格限制的优秀的特质了。）  
  （不然类型，全部写全了，后面想分开，也会变得比较痛苦）

```ts
// 加上 阶段性方式 断言：
function startClass<T, U>(name: T, score: U): T {
  return (name + String(score)) as any as T
}
// => 更好理解：
function startClass<T, U>(name: T, score: T): T {
  return (name + score) as T
}
```

某方法、某类，包裹一些能力复用，更好的方式进行类型的添加和合并，还有装饰器。

## 6.3 装饰器 - decorator

有了装饰器（只要加上 @Zhaowa ），Course 带有了 Zhaowa 里写的 target 所带有的能力。

- 类装饰器
- 属性装饰器
- 方法装饰器

```ts
// 类装饰器
function Zhaowa(target: Function): void {
  target.prototype.startClass = function (): void {
    // 逻辑
  }
}

@Zhaowa
class Course {
  constructor() {
    // 内部自身业务逻辑
  }
}

// 属性/方法装饰器
function nameWrapper(target: any, key: string): void {
  Object.defineProperty(target, key, {}) // 类似 vue 数据劫持
}

class Course {
  constructor() {
    // 业务逻辑
  }

  @nameWrapper
  public name: string
}
```

# 七、TS 原理流程

1. 源码
2. scanner 扫描器生成令牌流
3. parser 解析器
4. binder 绑定器
5. 5  
   [1]校验器 checker  
   [2]发射器 emitter

```ts
// 1. 源码
var a = 2;

// 2. scanner扫描器生成令牌流
[
    'var': 'keyword',
    'a': 'identifier',
    '=': 'assignment',
    '2': 'integer',
    ';': 'eos' // end of statement
]

// 3. parser 解析器
{
    operation: '=',
    left: {
        keyword: 'var',
        right: 'a'
    }
    right: '2'
}

// 4. binder绑定器
// AST节点 node.symbol <=> 辅助校验器

// 5.1 校验器checker
// ts节点语法检查 => 类型检查

// 5.2 发射器emitter
// 翻译完成每个node节点的内容，翻译成js => 输出
```

# 八、面试情况

一般 TS 语法考点不那么多，一般会基于自身项目的理解，遇到的问题。

比如：

- 你在项目里使用 TS 的过程中，遇到了哪些问题，它的难点是什么，你是怎么解决的？

根据这些问题扩散问 TS 的基础理论。
