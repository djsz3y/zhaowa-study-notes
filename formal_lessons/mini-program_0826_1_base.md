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

|- app.json 全局配置选项：包括但不限于路由
  |- pages 页面路由
              * vue-router：url 路径和组件、具体文件 mapping
              * 小程序对于url无感知、弱感知，分享的认为是页面；路由路径和文件层级路径一一对应，所以只需要注册相干页面信息即可。
  |- window 窗口
  |- tabBar 底部tab

              > app.json
              `
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
              `

  |- entryPagePath 入口配置
  |- networkTimeout 网络超时配置
  |- style 组件库版本
  |- subpackages 分包路径

|- app.wxss 全局样式文件
|- project.config.json 项目配置文件（工程化角度的配置）
|- sitemap.json 微信索引配置文件
```

#### app.json

> app.json

```json
// pages:路由和文件层级一一对应 entryPagePath:默认页 window backgroundTextStyle light
{
  "pages": ["pages/index/index", "pages/logs/logs"], // 页面路由
  "entryPagePath": "", // 入口配置
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "Weixin",
    "navigationBarTextStyle": "black"
  }, // 窗口

  "tabBar": {
    // 底部 tab
    "color": "#626567",
    "selectedColor": "#2A8CE5",
    "backgroundColor": "#FBFBFB",
    "borderstyle": "white",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "images/eye.png",
        "selectedIconPath": "images/live.png"
      },
      {
        "pagePath": "pages/logs/logs",
        "text": "打印",
        "iconPath": "images/draft.png",
        "selectedIconPath": "images/star.png"
      }
    ]
  },
  "networkTimeout": {
    // 网络超时配置
    "request": 100000,
    "downloadFile": 100000,
    "uploadFile": 100000
  }
}
// 看官网，有许多配置。
```

#### 整体配置分为几大块：

1. navigationBar 导航栏配置
2. 背景配置
3. 当前页面配置
4. tabBar 底栏配置
5. 全局配置，比如超时配置

#### 官方文档：

设备、分包加载、webworker 等。

#### 小程序 & vue 都是数据驱动视图，但小程序没有 dom

#### 小程序最重要功能：

1. 快速分享引流
2. 账号体系
3. 快速启动

#### 面试点

1. 小程序和 H5 单位的区别：  
   index.wxss 样式（css） => rpx 单位区别 => 相对单位 => rem

   看给的设计稿是几倍设计稿。  
   750px 两倍设计稿。
   对于 375px: 1rpx = 375/750 = 0.5px

   rpx 是相对单位，px 是绝对单位；
   px 是跟像素相关的，rpx 是相对于像素的比例；
   rpx 在全局把页面分成了 750rpx，750 等分。
   根据设计稿/750 就可以换算出来 rpx 是几比几，1 比 0.5 还是 1 比 1；也跟屏幕相关。

   也会和 rem 结合问。

2. 面试题：结合 vue2&vue3 做感受性对比

### 2.App Service（App 服务相关）

应用层 生命周期

【1】两种生命周期：

- [全局生命周期：App(Object object) - 参数](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html)
- [页面生命周期回调：Page(Object object) - 参数](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)

【2】API 函数 hook

```bash
【1】两种生命周期：
              * 可以在不同生命周期钩子（全局、页面生命周期）做相应逻辑处理：

1）全局层面的生命周期（6/7）：
|- App 注册程序
  |- onLaunch       生命周期回调——监听小程序初始化。
  |- onShow         生命周期回调——监听小程序启动或切前台。
              * 一打开会打印 onLaunch、onShow，切换页面（点下方菜单首页->打印）不会触发，因为是全局app的展示和lang值的回调。
              * 整体来看，往深了想，它类似于单页应用，切换页面不会影响整体app的配置（当然不是单页应用）。
  |- onHide         生命周期回调——监听小程序切后台。
              * 点右上角关闭触发 onHide 生命周期。
  |- onError        错误监听函数。
              * 全局错误监听 => 小程序错误上报
              * （面试题：小程序如何做错误信息收集/错误信息上报？）
  |- onPageNotFound 页面不存在监听函数。
              * 页面不存在 => 404
  |- onThemeChange  监听系统主题变化。
              * 主题切换

2）页面级别的数据配置相关（5/6）：
|- Page 注册页面
  2-1）生命周期回调函数：
  |- onLoad       生命周期回调—监听页面加载
  |- onShow       生命周期回调—监听页面显示
  |- onReady      生命周期回调—页面的初始化渲染
              * 监听页面初次渲染完成（可以在渲染完成做后置操作）
  |- onHide       生命周期回调—监听页面隐藏
  |- onUnload     生命周期回调—监听页面卸载
  2-2）页面事件处理函数：
  |- onPageScroll 页面滚动
              * 页面滚动触发事件的处理函数
  |- onTabItemTap 点击tab出发
              * 当前是 tab 页时，点击 tab 时触发

【2】API 函数 hook
|- API
  |- 实例相关：
  |- getApp / getCurrentPages 获取当前app实例 / 获取当前页面栈
              * 比如：
                1.index.js页面获取全局app：
                  `const app = getApp()
                   Page({ data: { userInfo: {} } })`
                2.从而，在app.js里就可以获取 挂载app之下的 globalData：
                  `App({ globalData: { userInfo: null } })`
  |- 路由相关
    |- wx.navigateTo / redirectTo / switchTab / reLaunch => 区别和使用场景
      navigateTo: 保留当前页面，跳转到指定页面
                  <=> navigateBack 返回（孪生兄弟）
              * 点击一下，左上角-返回
      redirectTo: 关闭当前页，跳转到指定页面
              * 比较：navigateTo 是栈，能返回；redirectTo 删掉了，无法返回。
              * 点击一下，左上角-房子
      switchTab:  只能用于跳转到tabbar页面（模拟用户切换tab的操作）
      reLaunch:   关闭所有页面，并跳转到指定页
              * 点击一下，先刷新，再跳转。说明重启了应用，释放内存。
              * reLaunch 有哪些坑？
              * 比如：
                1.有一些全局监听、全局监控的操作；
                2.页面跳转多了之后，理论上，每切换页面要清空一些计时器；
                3.小程序集成了一些第三方或其他的SDK，拿进来之后发现，很多时候随着我们的操作，页面内存越来越大 => 产生内存泄漏；
                4.也不可能每切换一个页面重置一下，因为它的逻辑是以session/回合为一个节点数据收集的；
                5.所以我们就人为的规定：当前的用户，如果离开了某几个页面，这几个页面就是一个阈值/一个范围 => 离开它了之后 reLaunch。
              * 所以：
                - 跨页面级别，要做隔离，防止数据泄露！
      * （面试：有个小程序 无返回按钮？ => 调用栈（场景：上面4个对比））

  |- 页面
    |- wx.showToast / wx.showLoading / wx.showModal
    |- wx.hideToast / wx.hideLoading / wx.hideModal

              > logs.js
              `
              // 进入页面5s内禁止操作。
              onLoad() {
                // wx.showToast({
                //   title: 'toast',
                // })
                wx.showLoading({
                  title: 'title',
                })
                wx.showModal({
                  title: '123',
                  content: '一个modal框',
                  complete: (res) => {
                    if (res.cancel) {
                    }
                    if (res.confirm) {
                    }
                  }
                })
                this.setData({
                  logs: (wx.getStorageSync('logs') || []).map(log => {
                    return {
                      date: util.formatTime(new Date(log)),
                      timeStamp: log
                    }
                  })
                })
                setTimeout(() => {
                  wx.hideLoading({
                    title: 'title',
                  })
                }, 5000)
              }
              `

  |- 网络层
    |- wx.request / downloadFile / uploadFile / socket
  |- 数据缓存
    |- setStorage / getStorage - 存储全局关键信息（可加密，对称加密）
                * 比如：身份、提交、id等信息。
  |- 开放接口
    |- wx.login / authorize / getUserProfile - 用户信息、用户鉴权、获取用户相关身份
              * 通过 wx.login 获取 code，换取后台的 openId、sessionKey、unionId。
              * 通过 wx.getSetting 授权、通过 wx.authorize 获取录音权限。
              > app.js
              `
              App({
                onLaunch() {
                  // 展示本地存储能力
                  const logs = wx.getStorageSync('logs') || []
                  logs.unshift(Date.now())
                  wx.setStorageSync('logs', logs)

                  // 登录
                  wx.login({
                    success: res => {
                      console.log(res)
                      // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    }
                  })
                  // 授权
                  wx.getSetting({
                    success(res) {
                      // 确认我的配置
                      if (!res.authSetting['scope.record']) {
                        // 如果没有录音权限
                        wx.authorize({
                          scope: 'scope.record',
                          success() {
                            // 继续逻辑
                          }
                        })
                      }
                    }
                  })
                  console.log('onLaunch')
                }
              })
              `

              * 通过 wx.getUserProfile 获取用户登录信息、用户基本信息
              > index.js
              `
              Page({
                  getUserProfile(e) {
                    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
                    wx.getUserProfile({
                      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                      success: (res) => {
                        console.log('getUserProfile', res)
                        this.setData({
                          userInfo: res.userInfo,
                          hasUserInfo: true
                        })
                      }
                    })
                  },
              })
              `

  |- WXMl
    根据文件类型，也提供了相应的接口：
    |- wx.createSelectorQuery - 获取小程序中具体渲染的某个节点（注意：按照节点渲染，但不是按照 dom 渲染的。）
    |- page data + {{}}

              * 打印了 userInfo
              > index.js
              `
              onLoad() {
                if (wx.getUserProfile) {
                  this.setData({
                    canIUseGetUserProfile: true
                  })
                }
                console.log(app)
                // 获取节点
                const query = wx.createSelectorQuery()
                console.log('node', query.select('#userinfo'))
              },
              `
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
