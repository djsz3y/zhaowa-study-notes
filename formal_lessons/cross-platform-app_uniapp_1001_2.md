UniApp 基础

# UniApp

## 课程分布

1. uniapp 是什么？背景。
2. uniapp 能干什么？配置、原理。
3. uniapp 怎么干？实战。

## 生命周期

### App.vue - 应用的生命周期

> 官方地址：

#### onLaunch

- uniapp 初始化的时候触发
- 通用

#### onShow

- uniapp 启动，或者从后台进入前台显示
- 通用

#### onHide

- 从前台进入后台。
- 通用

#### onError

- 错误触发

#### onExit

- 应用退出
- 只在 android 上有。

#### others

- onUnhandledRejection
- onPageNotFound
- onLastPageBackPress

- onPage

```vue
<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { defineExpose } from 'vue'
onLaunch(() => {
  console.log('app launch')
})

onShow(() => {
  console.log('App show', getApp().globalData)
})

onHide(() => {
  console.log('App hide')
})

// 这种写法在 vue3 中支持导出，但是uniapp 不支持
// defineExpose({
// 	globalData: {
// 			text: "mytext"
// 		}
// })
</script>
<script>
export default {
  globalData: {
    text: 'mytext'
  }
}
</script>
```

### 页面的生命周期

- Uniapp 在页面中，除了支持 VUE 的生命周期，还有一些自定义的生命周期。
  > 官方地址：

#### 页面的时序描述

1. 根据 pages.json,启动容器-相当于打开浏览器
2. 读取 template 的内容。我先把静态的节点读出来，先创建一轮 dom；
3. onInit 生命周期
4. onLoad 生命周期
   - 联网获取数据，更新 data
5. 执行转场动画
6. 动画之间，创建真实的 dom， onReady 执行 -- 相当于 didMount
   - 处理 dom，ref 等等

##### onInit - 百度小程序

##### onLoad

- 响应式数据、计算属性、方法、props、slots 已经完成

##### onShow

##### onReady

- 页面初次渲染完成

##### onHide

##### onUnload

- 页面卸载时触发

##### onResize - 不包含 H5

##### onPullDownRefresh

##### onReachBottom

##### onTabItemTap

##### onBackpress

## 配置化

### pages.json 配置

> 官方地址：
> 主要配置页面的各种信息，包含 tabBar, 具体的页面 pages 的相关信息等。

### manifast.json 配置

> 官方地址：
> 主要配置构建与工程相关的内容，包括每一种小程序、app 的一些特有的配置。

### androidManifest.xml

安卓的原生配置，需要自己手动添加

### easycom 配置

1. 安装在 components 目录下，以 components/组件名称/组件名称.vue
1. 安装在 uni_modules 目录下，以 uni_modules/插件名称/components/组件名称/组件名称.vue

以上两种，无需导入。

### API

#### 导航相关

```js
uni.redirectTo({
  url: '/pages/news/news'
})

uni.switchTab({
  url: '/pages/index/index'
})

uni.navigateTo({
  url: '/pages/news/news',
  success() {
    uni.showToast({
      title: '跳转成功',
      icon: 'fail'
    })
  }
})
uni.navigateBack()
```

#### 全局提示

```js
uni.showToast({
  title: '跳转成功',
  icon: 'fail'
})

uni.showLoading()

uni.hideLoading()
```

#### 数据

```js
uni.request()

uni.setStorage({
  key: 'settings',
  data: 'mySettings',
  success() {
    uni.switchTab({
      url: '/pages/index/index'
    })
  }
})

uni.getStorage({
  key: 'settings',
  success(res) {
    console.log(res.data)
  }
})

console.log(uni.getStorageInfoSync())
```

## Q&A

### DB

- 关系型数据库
- 非关系型数据库
- 图数据库
- ...

MySQl, mongoDB, redis

### node 全栈

nest.js - typeORM  
 koa - sequelize
