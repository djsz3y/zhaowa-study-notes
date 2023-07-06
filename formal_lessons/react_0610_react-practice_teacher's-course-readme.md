# 20:00 开始，有问题先问。
- 8 节课

2节。4节。

# Q&A
- flex-1
- flex order
- flex 左边占满，右边固定

## 35岁，你还在一线，是一个普通的编码人员。
- 10余年的工作，潜力和能力是不够的；
- 小组长、资深架构师。
  - 技术管理
  - 架构
  - 产品

## 技术经理
- 资源协调，
- 业务能力，
- 带人

## 如何转为技术管理
- 上升的事情。
- 先卷自己，再卷别人。
- 10个人，你带9个人干活 > 10个人一起干活。

   

# 第一讲，仓库构建

- A工程
- B工程
- C工程

- M工程
- N工程

假如，我们是一个 multirepo 的工程。
- 子git仓库
- M工程，发布，打包，提交，A工程反过来下载。

10个前端。

## 为什么要构建 monorepo， monorepo 是什么？

### monorepo 的含义

Monorepo 最早的出处是软件开发策略的一个分支，”mono” 表示单一 “repo” 是”repository”的缩写，意为多个项目共用一个代码库来管理依赖关系，同一套配置文件，统一构建部署流程等等。

- 如果各个项目之间没有明确定义的关系，仅仅是物理上是一个 git；
- 需要具备明确的关系，但是也需要良好的组织方式。

### 多仓的缺点在哪里


### mono 做了什么？

1. 更好的代码复用，可以让所有项目代码集中于单一仓库，易于抽离出共用的业务组件或工具。
2. 整体的构建、测试逻辑统一，方便协作。

## mono 构建有哪些方法？

### lerna
- 更倾向于去做一些版本的管理。
- 缺少库与库之间的软链。


### yarn / pnpm / npm 
- 会给你做link；
- 但是没有严格的包管理。

### 这两者之间不同点是？



## 使用 pnpm 构建 mono

### 主要步骤

1. 添加 yaml 文件

```yml
packages:
  - "packages/**"
```

2. 创建项目文件和第三方库文件夹

一般情况下：
- apps: web 项目
- components: 组件库
- libs: 工具

进行测试：

3. 共建软链接

`pnpm add @proj/react-components --filter @proj/react-x`

如果说自己构建
@proj/react-components: `pnpm link`
@proj/react-x: `pnpm link @proj/react-components`

### 安装测试环境
```sh
pnpm add eslint -D -w
npx eslint --init

# 由于命令行自动化，不给我们加 w
pnpm add @typescript-eslint/eslint-plugin @typescript-eslint/parser -D -w
pnpm add eslint-plugin-react -D -w

```


#### 安装 eslint 与 配置
- eslint 和 prettier 如何配置
  - eslint 一般多用来做代码的检测（逻辑、功能）
  - prettier 一般用来做代码的美化


### 安装 typescript 配置

- tsc, ts-loader, @babel/preset-typescript 有什么区别？

#### ts-loader 
他是在内部调用了 typescript 的官方编译器 tsc ，所以 ts-loader 和 tsc 是可以公用 tsconfig.json

#### @babel/preset-typescript
只会给你做编译，不做类型检查
所以，我们要自己做类型检查，就要用到 tsc 的配置了。


#### 结论
- 没有 babel，首选 tsc + ts-loader 
- 有 babel, @babel/preset-typescript + tsc 做类型检查

### 如何配置 react 环境？
```sh
pnpm add webpack webpack-cli webpack-merge webpack-dev-server @babel/core @babel/preset-react @babel/preset-typescript babel-loader css-loader less style-loader less-loader postcss postcss-loader tailwindcss autoprefixer html-webpack-plugin cross-env -D --filter @proj/react-x
```

# 第二讲 react 环境安装

## 如何选择合理的组件库？

### headless with styled ， 应该怎么选？

## 典型的 css 方案有哪些？

## 如何选择合理的状态管理？

- zustand ?
- redux ?
- mobx ?

## 如何构建一个组件库？

### 组件库打包的方案有哪些？

一般情况下，我们需要“三证齐全”

#### umd

#### cjs

#### esm 


### 组件库和前端项目，到底有什么区别？

### 使用 rollup 构建组件库。

