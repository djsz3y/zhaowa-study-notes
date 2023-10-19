### kbone
#### 1. 项目创建
```js
    // 1. 使用脚手架创建项目
    npm install -g kbone-cli
    // 2. 通过脚手架创建项目
    kbone init my-app
    cd xxx
    npm install
    // 3. 开发调试小程序端 => 开发者工具 dist/mp目录
    npm run mp
    // 4. 开发调试web端
    npm run web
```
#### 2. 核心 —— 运行时兼容，静态复制配置
miniprogram-render - 构造元素树
custom-dom: div >> input >> label

a. 转化树结构
view - dom-div
>> view - input
>> view - label

b. 结合自定义组件、自定义指令

b.1 合并创建  ： 静态节点复用 + 控制更新节点数量

miniprogram-element - 监听桥梁作用
事件监听： 无缝对接

#### 3. 优势
a. 支持多种框架 vue react preact
b. 支持更完整的原生指令
c. 提供了全局接口dom bom
d. 可以提供小程序本身的特性