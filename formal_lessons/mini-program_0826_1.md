小程序：基础

# 课程安排

1. 第一节课：小程序基础，官方文档，基础拓展；面试中容易遗忘点，面试 mapping（**哪些着重关注，为什么关注，以及面试过程中考察知识点时如何串联**）；
2. 第二节课：实际业务中的场景：跨平台开发，跨平台方案对比，kbone，前端开发如何进入小程序开发心路历程；
3. 第三节课：小程序实战：全局的，用户信息管理、用户信息交互，云开发等；

## 小程序基础——（类似 脚手架生成的空白页面）

```bash
|- pages 页面目录 - 通常用来以页面维度进行复制新增
  |- index 某一个页面的全部内容
    |- index.js 逻辑 - **
      随意书写逻辑、配置类、
      事件处理 生命周期
      选项式和逻辑并存，做全局选项式配置
    |- index.json 页面配置（导航栏名称）
    |- index.wxml 模板：绑定事件 绑定属性 传递参数
    |- index.wxss 样式 => rpx单位区别 => 相对单位 => rem
  |- logs

|- app.js 全局入口文件：全局逻辑、方案、存储，App 全局配置
|- app.json 全局配置选项：包括但不限于路由
  |- pages 页面路由
  |- window 窗口
  |- tabBar 底部tab
  |- entryPagePath 入口配置
  |- networkTimeout 网络超时配置
  |- style 组件库版本
  |- subpackages 分包路径
|- app.wxss 全局样式文件
|- project.config.json 项目配置文件
|- sitemap.json 微信索引配置文件
```

> app.js

```js
  "tabBar": {
    "color": "#626567",
    "selectedColor": "#2A8CE5",
    "backgroundColor": "#FBFBFB",
    "borderStyle": "white",
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": "images/eye.png",
      "selectedIconPath": "images/live.png"
    }, {
      "pagePath": "pages/logs/logs",
      "text": "打印",
      "iconPath": "images/draft.png",
      "selectedIconPath": "images/star.png"
    }]
  },
```

> app.json

```json
// pages:路由和文件层级一一对应 entryPagePath:默认页 window backgroundTextStyle light
{
  pages: {}, // 页面路由
  entryPagePath: "", // 入口配置
  window: {} // 窗口
  navigationBarTitleText: "Weixin"
  navigationBarTextStyle: "black"

  tabBar: { // 底部 tab
    "color": "#626567",
    "selectedColor": "#2A8CE5",
    "backgroundColor":"#FBFBFB",
    "borderstyle":"white",
    "list":[{
      "pagePath":"pages/index/index",
      "text":"首顶"，
      "iconPath":"images/eye.png
      "selectedIconPath":"images/star.png
    }]
  },
  "networkTimeout": { // 网络超时配置
    "request":100000,
    "downloadFile":100000,
    "uploadFile":100000
  }
}
// 看官网，有许多配置。
```

- 看官网，有许多配置。

小程序 & vue 都是数据驱动视图，但没有 dom 。

### App Service

```bash
|- App 注册程序
  |- onLaunch 小程序初始化
  |- onShow  小程序启动或者被切到前台
  |- onHide  小程序被切到后台
  |- onError   全局错误监听  => 小程序错误上报
  |- onPageNotFound  页面不存在 => 404
  |- onThemeChange 主题切换
|- Page 注册页面
  |- onLoad / onUnload 页面的加载 / 卸载
  |- onReady 页面的初始化渲染
  |- onPageScroll 页面滚动
  |- onTabItemTap 点击tab出发
|- API
  |- getApp / getCurrentPages  - 获取当前app实例 / 获取当前页面栈
  |- 路由
    |- wx.navigateTo / redirectTo / switchTab / reLaunch => 区别和使用场景
      navigateTo: 保留当前页面，跳转到指定页面 <=> navigateBack
      redirectTo: 关闭当前页，跳转到指定页面
      switchTab: 只能用于跳转到tabbar页面
      reLaunch: 关闭所有页面，跳转到指定页
    面试： 有个小程序 无返回按钮？ => 调用栈  （场景）
  |- 页面
    |- wx.showToast / wx.showLoading / wx.showModal
  |- 网络层
    |- wx.request / downloadFile / uploadFile
  |- 数据缓存
    |- setStorage / getStorage - 存储全局关键信息（可加密）
  |- 开放接口
    |- wx.login / authorize / getUserProfile
  |- WXMl
    |- wx.createSelectorQuery
    |- page data + {{}}
  |- WXS
    |- 不是真正的js，不支持es6
    |- 无法直接调用js的api
  |- 模块化能力 => 组件化
  |- 事件
    |- bind 冒泡
    |- capture-bind 捕获事件
    |- catch 阻止事件继续冒泡
```

小程序双线程模型：

```bash
渲染层         逻辑层
webview       JSCore
  ｜｜          ｜｜
++++++++Native+++++++
```
