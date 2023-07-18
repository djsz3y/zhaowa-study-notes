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

### 四、实战：使用 pnpm 构建 mono

#### 4.1 主要步骤

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

> my_proj/packages/components/react-components/package.json

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

【6.1】在 react-components 项目，新建 src/index.js

> react-components/src/index.js

```js
export const getID = () => `${Math.random()}`
```

【6.2】一会要用 node 启动，所以给 react-components 以及 react-x 的 package.json 一个内容 `"type": "module",`

【6.3】共建软链接：

法 Ⅰ：  
把 react-components 安装在 react-x 里，运行命令：

```bash
pnpm add @proj/react-components --filter @proj/react-x
```

法 Ⅱ（如果说自己构建）：

```bash
# @proj/react-components:
pnpm link

# @proj/react-x:
pnpm link @proj/react-components
```

此时，可以看到，react-x/package.json 里多了如下代码：

> react-x/package.json

```js
{
  "name": "@proj/react-x",
  // ...
  "dependencies": {
    "@proj/react-components": "workspace:^"
  }
}
```

【6.4】引用组件 & 使用组件：

> react-components/src/index.js

```js
import { getID } from '@proj/react-components'

console.log(getID())
```

【6.5】修改 package.json `"main": "index.js",`，  
为 `"main": "src/index.js",` 。

【7】运行代码，得出结果：

- 右键——Run Code 或者 `node src/index.js`，这样这两个工程相互独立。
- 公共组件库，发包：修改一个内容，两边同步，并且这两个工程是相互独立的。

#### 4.2 monorepo 方案更适用于什么开发？

- 本身工程很庞大，本身项目需要多个工程，并且工程之间要协作，有一些管理方面的关系。
- 比如，有三个平台项目，有一个共同的公共组件库，发包，Ctrl + C 、V 这样用。
- 做公共组件和做项目的是同一人，公共组件发包，私有 npm。  
  比如，高德地图、蚂蚁金服使用 Ant-D ，本身之间没有什么关系，所以使用 npm 发包没有问题；  
  高德地图做了高德的组件，团队平时只有 20~30 人维护，此时使用 monorepo 更好一些。  
  比如，当领导布置两个工作，在同一个项目里，改两个就没事了；  
  但是如果使用 npm 发包的方式，改完一个项目后（测试-发包）；再改另一个项目（安装依赖-再处理、再更新-再发包）。

#### 4.3 外层如何安装依赖？

根目录安装依赖，运行 `pnpm add lodash`，报错：

```
 ERR_PNPM_ADDING_TO_ROOT  Running this command will add the dependency to the workspace root, which might not be what you want - if you really meant it, make it explicit by running this command again with the -w flag (or --workspace-root). If you don't want to see this warning anymore, you may set the ignore-workspace-root-check setting to true.
```

怎么办呢？

例子 1：给 react-x 安装依赖 lodash：

```bash
pnpm add lodash --filter @proj/react-x
```

例子 2：全局安装依赖 husky ：

```bash
pnpm add husky -D -w
```

#### 4.4 安装测试环境——安装 ESLint 、TS、Typescript、prettier、冲突插件并设置默认格式化 prettier

##### 安装 eslint 与 配置——eslint 和 prettier 如何配置：

- eslint 一般多用来做代码的检测（逻辑、功能）
- prettier 一般用来做代码的美化

##### 步骤：

【1】安装 eslint 并初始化：

```sh
pnpm add eslint -D -w # 安装
npx eslint --init # 初始化
```

【2】注意执行 `npx eslint --init` 命令完毕后（TS 选 yes，后面装）会报错（ERR_PNPM_ADDING_TO_ROOT），因为安装这两个它不会给我们加 -w

```bash
...\my_proj>npx eslint --init
# You can also run this command directly using 'npm init @eslint/config'.
# Need to install the following packages:
#   @eslint/create-config@0.4.5
# Ok to proceed? (y) y
# √ How would you like to use ESLint? · problems
# √ What type of modules does your project use? · esm
# √ Which framework does your project use? · none
# √ Does your project use TypeScript? · No / Yes（选Yes）
# √ Where does your code run? · browser
# √ What format do you want your config file to be in? · JSON
# The config that you've selected requires the following dependencies:

# @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
# √ Would you like to install them now? · No / Yes
# √ Which package manager do you want to use? · pnpm
# Installing @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest
# ERR_PNPM_ADDING_TO_ROOT  Running this command will add the dependency to the workspace root, which might not be what you want - if you really meant it, make it explicit by running this command again with the -w flag (or --workspace-root). If you don't want to see this warning anymore, you may set the ignore-workspace-root-check setting to true.
# Successfully created .eslintrc.json file in ...\my_proj
```

所以需要我们自己安装 Typescript ：

```bash
# 由于命令行自动化，不给我们加 w ，所以需要我们自己安装
pnpm add @typescript-eslint/eslint-plugin @typescript-eslint/parser -D -w
```

【3.1】安装 prettier ：

```bash
pnpm add prettier -D -w
```

【3.2】配置 .prettierrc.json 文件：

> .prettierrc.json

```json
{
  "printWidth": 80,
  "tabWidth": 4,
  "useTabs": true,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none"
}
```

【4.1】重新初始化一下吧：

```bash
npx eslint --init
#  To check syntax and find problems(√ How would you like to use ESLint? · problems)
#  JavaScript modules (import/export)(√ What type of modules does your project use? · esm)
#  React(√ Which framework does your project use? · react)
#  Yes(√ Does your project use TypeScript? · No / Yes(选) )
#  Node(Where does your code run?)(√ Where does your code run? · browser)
#  JSON(√ What format do you want your config file to be in? · JSON)
#  Yes(@typescript-eslint/eslint-plugin@latest eslint-plugin-react@latest @typescript-eslint/parser@latest)  (? Would you like to install them now? » No / Yes(选) )
#  pnpm(√ Which package manager do you want to use? · pnpm)
```

报错：

```bash
# Installing @typescript-eslint/eslint-plugin@latest, eslint-plugin-react@latest, @typescript-eslint/parser@latest
# ERR_PNPM_ADDING_TO_ROOT  Running this command will add the dependency to the workspace root, which might not be what you want - if you really meant it, make it explicit by running this command again with the -w flag (or --workspace-root). If you don't want to see this warning anymore, you may set the ignore-workspace-root-check setting to true.
# Successfully created .eslintrc.json file in D:\workspaces\codeOrgan\zhaowa-study-notes\formal_lessons\practice_is_the_sole_criterion_for_testing_truth\my_proj
```

【4.2】继续加 `-D -w` 安装 eslint-plugin-react ：

```bash
pnpm add eslint-plugin-react -D -w
```

【5.1】还要再安装两个插件，避免 eslint 和 prettier 的冲突：

```bash
pnpm add eslint-plugin-prettier eslint-config-prettier -D -w
```

【5.2】修改 .eslintrc.json ，给 plugins 数组添加 "prettier" ：

> .eslintrc.json

```json
{
  //...
  "plugins": ["@typescript-eslint", "react", "prettier"]
  //...
}
```

【6】设置默认格式化为 prettier 格式，打开设置，搜索：eslint: default format 。

#### 4.4 安装测试环境——安装 git hooks

【1】初始化 git 仓库：`git init`，并且添加 .gitignore

> .gitignore

```
node_modules/

dist/
```

【2】安装 husky：

```bash
npx husky-init && pnpm i
```

【3】安装 pre-commit post-commit 钩子，提交前后要执行的命令（注意使用双引号，单引号无效）：

```bash
npx husky add .husky/pre-commit "npm run link"
npx husky add .husky/post-commit "npm run publish"
```

安装后，都先修改为 `"npm run test"` 以免影响 ：

【4】提交检测，还有 commit-lint，先不安装。

#### 4.5 安装测试环境——安装 webpack

#### 4.6 安装测试环境——安装 TS

#### 安装 typescript 配置

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
