13-1 uniapp 基础

# uniapp

## 课程分布

1. uniapp 是什么？
2. uniapp 能干什么？配置、原理。
3. uniapp 怎么干？实战。

## 生命周期

### App.Vue - 应用的生命周期

#### onLaunch

uniapp 初始化的时候触发

#### onShow

uniapp 启动，或者从后台进入前台显示

#### onHide

从前台进入后台。

#### onError

错误触发

#### others

onUnhandledRejection

- onPage

### 页面的生命周期

- Uniapp 在页面中，除了支持 VUE 的生命周期，还有一些自定义的生命周期。

#### 页面的时序描述

1. 根据 pages.json,启动容器-相当于打开浏览器
2. 读取 template 的内容。我先把静态的节点读出来，先创建一轮 dom;
3. onInit 生命幅期
4. onLoad 生命周期
   - 联网获取数据，更新 data
5. 执行转场动画
6. 动画之间，创建真实的 dom，onReady 执行 -- 相当于 didMount
   - 处理 dom，ref 等等

#### onInit - 百度小程序

#### onLoad

- 响应式数据、计算属性、方法、props slots 已经完成

#### onShow

#### onReady

页面初次渲染完成

##### onHide

##### onUnload

页面卸载时触发

##### onResize - 不包含

### 配置化

#### page.json
