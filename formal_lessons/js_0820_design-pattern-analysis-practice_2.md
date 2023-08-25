设计模式解析与实战（下）

# 二、基础概念（之前的遗留问题）

## 2.3 什么时候需要设计模式？

任何时候。

## 2.4 设计模式需要掌握的程度如何？

取决于 组织**模块** 设计**沟通** **代码质量**的判断（基础那三点）。

# 设计模式——模式分类：

## 【创建型】（创建元素）

1. 工厂模式：生产同类型商品
2. 建造者模式：独立流程化生产商品
3. 单例：唯一性

> createPattern.js

```js
// 元素创建型
// 功能： 创建元素
// 目标： 规范元素创建步骤

// 工厂模式
// 隐藏创建过程、暴露共同接口
// 需求：游戏商店里下载初始化游戏，并且可以运行游戏
class Shop {
  create(name) {
    return new Game(name) // 游戏
  }
}

class Game {
  constructor(name) {
    this.name = name
  }
  init() {
    // 下载游戏
  }
  run() {
    // 运行游戏
  }
}

const shop = new Shop()
// const pubg = new Game('pubg')
const pubg = shop.create('pubg')
// 组织模块 设计沟通都得到了xx

// 工厂模式，创建过程都统一了。快速应用于xxx。

// 建造者模式--------------------------------------------------------
// 拆分简单模块 + 独立执行 => 注重过程与搭配
// 需求：优惠套餐单元，商品 + 皮肤 进行打折售卖
class Product {
  constructor(name) {
    this.name = name
  }
  init() {
    // 初始化商品模块
  }
}

class Skin {
  constructor(name) {
    this.name = name
  }
  init() {
    // 初始化皮肤模块
  }
}

// 包装建造者
class PackageBuilder {
  constructor(name) {
    this.game = new Product(name)
    this.skin = new Skin(name)
  }
  getPackage() {
    return this.game.init() + this.skin.init()
  }
}

class Shop {
  constructor(name) {
    this.package = name
  }
  create(name) {
    this.package = new PackageBuilder(name)
  }
  getGamePackage() {
    return this.package.getPackage()
  }
}

// 每个模块是独立解耦的，而建造者是负责串联创建整体系统

// 单例模式--------------------------------------------------------
// 全局只有一个实例
class PlayStation {
  constructor() {
    this.state = 'off'
  }
  play() {
    if (this.state === 'on') {
      console.log('别闹，已经在happy')
      return
    }
    this.state = 'on'
  }
  shutdown() {
    if (this.state === 'off') {
      console.log('已经关机了')
      return
    }
    this.state = 'off'
  }
  // static instance = undefined
  // static getInstance() {
  // }
}

// const ps1 = new PlayStation()
// const ps2 = new PlayStation()
PlayStation.instance = undefined
PlayStation.getInstance = function () {
  return (function () {
    if (!PlayStation.instance) {
      PlayStation.instance = new PlayStation()
    }
    return PlayStation.instance
  })()
}

const ps1 = PlayStation.getInstance()
const ps2 = PlayStation.getInstance()

// 静态 或者 单例处理都可以

// 模式场景
// 1. **批量生产****同类型应用**来满足频繁使用同一种类型的需求时 —— 工程
// 2. 当我们需要模块化拆分一个大模块，同时被拆分出来的模块互相解耦且独立分工 —— 建造者
// 3. 全局只需要一个实例，注重统一一体化 —— 单例
// 实际应用
// Button Producer：生产多种按钮 => 工厂模式
// 全局应用 router store => 单例
// 页头组件 包含了title、button、breadcum => 生产多重不同实例 => 建造者
```

## 【结构型】（代码结构）

1. 适配器：适配已有方案
2. 装饰器：增强拓展
3. 代理模式：集约流程

> constructionPattern.js

```js
// 结构型
// 功能：优化结构的实现方式

// 适配器模式 - adapter
// 适配独立模块，保证模块间的独立解耦且连接兼容
// 需求：买了一个港行PS，插座国标
class HKDevice {
  getPlug() {
    return '港行双圆柱插头'
  }
}

class Target {
  constructor() {
    this.plug = new HKDevice()
  }
  getPlug() {
    return this.plug.getPlug() + '+港行双圆柱转换器'
  }
}

// 使用中间适配层，完成对历史已有的适配。
const target = new Target()
target.getPlug()

// 装饰器模式-------------------------------------------
// 动态将责任附加到对象之上
// 设备升级
class Device {
  create() {
    console.log('PlayStation4')
  }
}

class Phone {
  create() {
    console.log('iPhone18')
  }
}

class Decorator {
  constructor(device) {
    this.device = device
  }
  create() {
    this.device.create()
    this.update(this.device)
  }
  update(device) {
    console.log(device + 'pro')
  }
}

const device = new Device()
device.create()

const newDevice = new Decorator(device)
newDevice.create()

// 代理模式
// 使用代理人来替代原始对象处理更专业的事情
// 需求：游戏防沉迷系统
class Game {
  play() {
    return 'playing'
  }
}

class Player {
  constructor(age) {
    this.age = age
  }
}

// 游戏代理商 玩家信息管理
// 管理 是否通过认证
class GameProxy {
  constructor(player) {
    this.player = player
  }
  play() {
    return this.player.age < 16 ? 'too young to play' : new Game().play()
  }
}

const player = new Player(18)
const game = new GameProxy(player)

game.play()

// 模式场景
// 中间转换参数、保持模块间独立的时候 —— 适配器
// 附着于多个组件上，**批量****动态赋予**额外的增强能力的时候 —— 装饰器
// 将代理对象与调用对象分离，不直接调用目标，让专业的人做专业的事 —— 代理

// 实际应用
// 1. 两个模块：筛选器 + 表格 => 独立的模块 => 适配器
// 2. 按钮 title、icon 三个组件 => 增强模块，增强能力的拓展 => 装饰器模式
// 3. 事件委托(利用冒泡进行事件委托) => 代理模式
```

## 【行为型】（模块行为总结）

1. 命令模式：包裹 + 集合传递指令（规范传递指令）
2. 模板：重编排，易拓展
3. 观察者：自动化的模块间的实时变化。

发出者，传递，接收——命令
流程平等——模板

> behaviorPattern.js

```js
// 行为型
// 不同对象之间责任的划分和算法的抽象化

// 命令模式
// 请求以指令的形式包裹在对象中，并传给调用对象
// 需求：游戏角色的控制

// 接受者
class Receiver {
  execute() {
    // 奔跑
  }
}

// 操控者
class Operator {
  constructor(command) {
    this.command = command
  }
  run() {
    this.command.execute()
  }
}

// 指令器
class command {
  constructor(receiver) {
    this.receiver = receiver
  }
  execute() {
    // 逻辑：做一些逻辑，校验参数，传给多个接收者等。
    this.receiver.execute()
  }
}

const soldier = new Receiver()
const order = new command(soldier)
const player = new Operator(order)
player.run()

// 模板模式-----------------------------------
// 在模板中，定义好每个方法的执行步骤。方法本身关注于自己的事
//想要吃个鸡，大概分几步
class Device {
  constructor(executePipeLine) {
    // executePipeLine
  }
  powerOn() {
    // 开机
  }
  login() {
    // 登录
  }
  enterGame() {
    // 进入游戏
  }
  jump() {
    // 进入战场
  }

  play() {
    // executePipeLine.forEach((exe) => {
    //   exe()
    // })
    this.powerOn()
    this.login()
    this.enterGame()
    this.jump()
  }
}

// 观察者模式

// 当一个属性发生变化时，观察者会连续引发所有的相关状态变更
// 通过智能家居中心一键控制系统
class MediaCenter {
  constructor() {
    this.state = ''
    this.observers = []
  }
  attach(observers) {
    this.observers.push(observers)
  }
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
    this.notifyAllobservers()
  }
  notifyAllobservers() {
    this.observers.forEach((ob) => {
      ob.update()
    })
  }
}

class observers {
  constructor(name, center) {
    this.name = name
    this.center = center
    this.center.attach(this)
  }
  update() {
    // 更新状态
    this.center.getState()
  }
}

// 模式场景
// 发出指令，中间层传递命令，严格层级发送关系 —— 命令
// 通过模版定义顺序，让多个平级模块做独立顺序操作 —— 模版
// 通过观察者，让被观察值发生变化后统一触发所有观察人的响应变更 —— 观察者

// 实际应用
// 1. echarts 准备工作：canvas、config、init、draw => 模板模式
// 2. 调度器接收到新的数据，通过计算传输，给到展示模块 => 命令模式
// 3. 输入框改变值，动态改变其他地方的展示 => 观察者
```

E.g. Vue 数据劫持（观察者）
