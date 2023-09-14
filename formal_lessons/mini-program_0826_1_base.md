小程序开发基础（小程序：基础）

# 课程安排

1. 第一节课：小程序基础，官方文档，基础拓展；面试中容易遗忘点，面试 mapping（**哪些着重关注，为什么关注，以及面试过程中考察知识点时如何串联**）；
2. 第二节课：实际业务中的场景：跨平台开发，跨平台方案对比，kbone，前端开发如何进入小程序开发心路历程；
3. 第三节课：小程序实战：全局的，用户信息管理、用户信息交互，云开发等；

## 小程序基础——（类似 脚手架生成的空白页面）

下载微信开发者工具，使用微信登录后，创建一个小程序测试号项目 MINIPROGRAM-1；  
可看到如下目录：

```bash
|- components 组件目录
|- pages 页面目录
|- .eslintrc.js
|- app.js
|- app.json
|- app.wxss
|- project.config.json
|- project.private.config.json
|- sitemap.json
```

### 1.小程序**基本项目目录**介绍

```bash
|- pages 页面目录 - 通常用来以页面维度进行复制新增
  |- index 目录，某一个页面的全部内容
    |- index.js 逻辑 - ** 【面试题：结合vue2&vue3做感受性对比】
              * 分两大类记忆：
                1. 纯js逻辑/纯脚本类：
                    - 随意书写js逻辑；
                    - 开启es6转义后书写es6语法的js逻辑；
                2. 配置类：
                    - vue3 组合式（全局js、es 形式组装一个个配置，每个配置以 function 函数 hook 形式去做）
                        —— Composition API 更贴近日常写js逻辑。
                    - vue2 选项式（选项内部写js）
                        —— 以配置形式，将 data、methods、computed 以一个个选项配置进去。
             【重要】- 小程序 **选项式和逻辑并存，既可以随意书写自定义逻辑，又可以通过Page与页面关联做全局选项式配置。**
                        ——1.逻辑 `const app = getApp() // 获取应用实例`
                        ——2.选项式 `Page({
                            data, // 局部数据
                            bindViewTap, // 事件处理
                            onLoad(){}, // 生命周期
                            getUserProfile(e){} & getUserInfo(e){} // 事件所绑定的回调函数
                          })`——通过Page与页面关联，配置参数集，做全局选项式配置
    |- index.json 页面配置：当前页面相关信息内容进行全局配置
              * （可以配置：navigationBarTitleText导航栏名称、导航栏icon、导航栏颜色、当前页面下背景色等）
                  {
                    "navigationBarTitleText": "首页"
                  }
    |- index.wxml 模板（html）
              * 纯粹的模板，可以：
                  绑定类 class 和 id，
                  绑定事件 bindtap="bindViewTap"
                  传递属性 type="userNickName"
                  传递参数 src="{{userInfo.avatarUrl}}"
              * 小程序模板 VS vue 模板？
                  和 vue 比较像，本质思想都是数据驱动试图；
                  没有采取 dom，没有多 dom、父 dom 这种概念，
                  纯粹以数据驱动试图来处理的。
    |- index.wxss 样式（css） => rpx单位区别 => 相对单位 => rem
  |- logs 目录，日志模块，同上。

|- utils 目录，工具类函数

|- app.js 全局入口文件
              * （类比 每个页面内的js `index/index.js`）
              ——1. 全局逻辑、全局方案、全局存储。
              ——2. `App({
                onLaunch(){}, // 生命周期
                globalData:{}, // 全局data
                func1(){} // 注册全局方法
              })`——App 全局入口，选项式配置

              > app.js
              {
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
              }

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

19:28


#### app.json

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

### 2.App Service

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

### 小程序双线程模型：

```bash
渲染层         逻辑层
webview       JSCore
  ｜｜          ｜｜
++++++++Native+++++++
```
