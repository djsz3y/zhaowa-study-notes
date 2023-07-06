react 实战-现代 web 开发的工程搭建

# 概述——接下来 8 节课

8 节课

2 节，4 节

- 第一讲 仓库构建

- 第二讲 react 换进安装

- 第三讲

- 第四讲

- 第五讲

- 第六讲

- 第七讲

- 第八讲

## Q&A

### 1、flex

- flex-1
- flex order
- flex 左边占满，右边固定

### 2、35 岁，你还在一线，是一个普通的编码人员。

- 10 余年的工作，潜力和能力是不够的；
- 小组长、资深架构师。
  - 技术管理
  - 架构
  - 产品

### 3、技术经理

- 资源协调（10 项目 8 个人，公共模块怎么做，与其他人怎么配合）
- 业务能力（业务理解、业务做过什么、业务发展、业务瓶颈是什么）
- 带人（每个人的特点、适合什么事）

### 4、如何转为技术管理

- 上升的事情（领导提拔）。
- 先卷自己，再卷别人（核心）。
- 10 个人，你带 9 个人干活 > 10 个人一起干活（要求高）。

# 开始

## 第一讲，仓库构建

### 一、为什么要构建 monorepo， monorepo 是什么？

#### 1.1 举例：什么是 monorepo？

简述：

- A 工程
- B 工程
- C 工程

- M 工程
- N 工程

一个 multirepo 的工程：

- 嵌入到子 git 仓库
- M 工程，发布，打包，提交，A 工程反过来下载

10 个前端。

<img src="./imgs/react_0610/what-is-monorepo.png"/>

答：什么是 monorepo？

1. 有一个 A 工程，有一个 B 工程，现在又有一个公共组件库 M 工程。假如，一个 multirepo 多工程项目（每一个都有自己独立的 git 仓库），我如何让 A 和 B 使用 M 呢？
2. 我现在有两种方法，第一种是嵌入子 git 仓库，第二种就是把 M 工程发布、打包、提交，然后让 A 工程反过来下载 M 工程。
3. 假如 A 工程某个组件有一个 bug，给 M 工程提出、排期、发包、做；再重新安装、使用，这个过程会浪费一定的人力。
4. 现在有一个场景，公司 10 个前端，管理组件库，这个组件库要同时给各个项目使用。假如又出现一个 N 工程，这种情况下，在一起写更合适，A、B、C 都在使用；
5. 此时，我们就可以构建一个 monorepo （ monorepo 是单仓库，通过多个项目一起管理依赖关系，同一套配置文件，同一套部署构建的流程）；工程化统一，依赖管理可以部分统一；依赖管理可以部分统一，也可以是全部统一的。
6. 可以这样理解：一个文件夹下有多个项目，这些项目的依赖关系统一管理。
7. 对于 node_modules 可以统一管理，这些项目之间的关系也可以统一管理。
8. 常用的 monorepo 管理工具：react-dom、react-concicler、包括 babel；国内用的比较多的：lerna、yarn ，并且他们之间也有区别。

#### 1.2 monorepo 的含义

Monorepo 最早的出处是软件开发策略的一个分支，”mono” 表示单一 “repo” 是”repository”的缩写，意为多个项目共用一个代码库来管理依赖关系，同一套配置文件，统一构建部署流程等等。

#### 1.3 注意

- 如果各个项目之间**没有明确定义的关系**，仅仅是物理上是一个 git （反而会增加项目的耦合程度）；
- 需要具备**明确的关系**，但是也需要**良好的组织方式**（这是一个比较合格的 monorepo）。

#### 1.4 多仓的缺点在哪里？

#### 1.5 mono 做了什么？

1. 更好的代码复用，可以让所有项目代码集中于单一仓库，易于抽离出共用的业务组件或工具。
2. 整体的构建、测试逻辑统一，方便协作。

### 二、mono 构建有哪些方法？

#### 2.1 lerna

- 更倾向于去做一些**版本的管理**（一个文件夹下，A 项目、B 项目是同一版本，A 项目版本更新了，B 项目也更新）。
- **缺少**库与库之间的**软链**（需要自己做软链）。

#### 2.2 yarn / pnpm / npm

- 会给你做 link （软链）；
- 但是**没有严格的包管理**。

### 三、这两者之间不同点是？

### 四、实战：

#### 使用 pnpm 构建 mono

##### 主要步骤

【1】安装 pnpm ：`npm install pnpm -g`

【2】创建一个 my_proj 项目并初始化

```bash
mkdir my_proj
cd my_proj
pnpm init
```

> package.json

```json
{
  "name": "my_proj",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

【3】注意 yarn & pnpm 使用方式不一样：

- 如果是 yarn ，需要添加 "workspaces"
- pnpm 要在文件夹下添加一个 pnpm-workspace.yaml 文件：

【3.1】添加 yaml 文件

> pnpm-workspace.yaml

```yml
packages:
  - 'packages/**'
```

【4】创建项目文件和第三方库文件夹

```js
|- my_proj
  |- packages
    |- apps
      |- react-x
    |- components
    |- libs
```

【4.1】一般情况下：

- apps: web 项目
- components: 组件库
- libs: 工具

【5】创建 my_proj/packages/apps/react-x 文件夹，并且 pnpm init 初始化项目

【5.1】修改 package.json ，给 react-x 项目一个命名规范；  
**代码为：`"name": "@proj/react-x",` 。**

```bash
cd ...\zhaowa-study-notes\formal_lessons\practice_is_the_sole_criterion_for_testing_truth\my_proj\packages\apps\react-x
cd ../..
cd components
mkdir react-components # 创建 项目文件夹
```

【5.2】初始化 my_proj/packages/components/react-components 项目；  
`pnpm init` 并且修改名称 `@proj/react-components`：

```json
{
  "name": "@proj/react-components",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

【6】

进行测试：

【3】共建软链接

`pnpm add @proj/react-components --filter @proj/react-x`

如果说自己构建
@proj/react-components: `pnpm link`
@proj/react-x: `pnpm link @proj/react-components`

##### 安装测试环境

```sh
pnpm add eslint -D -w
npx eslint --init

# 由于命令行自动化，不给我们加 w
pnpm add @typescript-eslint/eslint-plugin @typescript-eslint/parser -D -w
pnpm add eslint-plugin-react -D -w

```

###### 安装 eslint 与 配置

- eslint 和 prettier 如何配置
  - eslint 一般多用来做代码的检测（逻辑、功能）
  - prettier 一般用来做代码的美化

##### 安装 typescript 配置

- tsc, ts-loader, @babel/preset-typescript 有什么区别？

###### ts-loader

他是在内部调用了 typescript 的官方编译器 tsc ，所以 ts-loader 和 tsc 是可以公用 tsconfig.json

###### @babel/preset-typescript

只会给你做编译，不做类型检查
所以，我们要自己做类型检查，就要用到 tsc 的配置了。

###### 结论

- 没有 babel，首选 tsc + ts-loader
- 有 babel, @babel/preset-typescript + tsc 做类型检查

##### 如何配置 react 环境？

```sh
pnpm add webpack webpack-cli webpack-merge webpack-dev-server @babel/core @babel/preset-react @babel/preset-typescript babel-loader css-loader less style-loader less-loader postcss postcss-loader tailwindcss autoprefixer html-webpack-plugin cross-env -D --filter @proj/react-x
```
