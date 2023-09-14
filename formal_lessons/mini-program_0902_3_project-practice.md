小程序项目实战（小程序：实战）

# 小程序实战

- 从面试开始？  
  问：为什么不用原生开发？kbone 开发？uniApp 开发？mock 数据如何做？为什么要这么做？  
  从需求 + 开发角度

1. 需求  
   体验？复杂的功能？多端拓展？快速迭代？=> 灵活、拓展、代码通用（多平台）、是否集成 hybrid
2. 开发  
   经验上：技术栈框架（说一下框架优缺点）、结合自身项目（自身经验）  
   协作上：上手......

今天做 C 侧，没有复杂交互逻辑，没有协作，用原生开发。

三个功能：

1. 标准列表
2. 探索
3. 个人详情页

## 鉴权

- 面试题：简单说下小程序的鉴权逻辑  
  静默 + 混合  
  结合了 小程序 client | dev_svr | wx_svr  
  打通已有服务 & 小程序

> more/more.wxml

```html
<view class="user">
  <view class="avatar">
    <image
      class="userInfo-avatar"
      src="{{userInfo.avatarUrl}}"
      background-size="cover"
    />
  </view>
  <view class="user-info flex-item" bindtap="bindNameTap">
    <text class="userinfo-nickname">{{userInfo.nickname}}</text>
    <text class="edit">查看或编辑个人信息</text>
  </view>
</view>
```

> login/login.js

```js
// login js
var app = getApp()
Page({
  data: {
    userInfo: {},
    code: '-'
  },
  // 获取 code
  tapGetCode(){
    wx.login({
      success: res => {
        const _code = res.code
        app.globalData.code = _code;
        this.setData({
          code: _code
        })
        console.log('wx.login', res)
      }
    })
  }
  tapGetInfo() {
    wx.getUserProfile({
      desc: 'desc',
      success: res => {
        console.log('wx.getUserProfile', res)
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  }
})
```

> login/login.json

```js
{
}
```

> login/login.wxml

```html
<view class="login">
  <view class="login avator">
    <image class="userinfo-avator" src="{{userInfo.avatorUrl}}" />
  </view>
  <view class="opt-area">
    <button class="opt-button" type="primary" bindtap="tapGetCode"></button>
    <button class="opt-button" type="primary">获取用户信息</button>
  </view>
  <view>
    <text>code: {{ code }}</text>
    <text>name: {{ userInfo.nickname }}</text>
  </view>
</view>
```

> login/login.wxss

```css
.login {
  width: 100%;
}
.login .avatar {
  display: flex;
}
.login .userinfo-avatar {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin: 20rpx auto;
}
```

注册页面

## 云开发

云数据库 + 云函数 + 云存储 + 云托管

app 入口判断是否支持云服务

本地数据云化：

```js
getData: function() {
  // 云化
  util.getData('list').then(feed => {
    let feed_data = feed
  })
}
```

> utils/util.js

```js
const db = wx.cloud.database() // 连接远端
function getData(db_name) {
  return new Promise(function (resolve, reject) {
    //查询当前用户所有的数据信息
    db.collection(db_name).where({
      _openid: 'user_openId'
    }).get({
      success: res => {
        console.Log('云数据库查询成功'，res)
        let data = res.data[0].data

        resolve(data)
      },
      fail: err => {
        wx.showToast({
          title:'查询失败'
        })
        reject(err)
      }
    })
  })
}
function getData2() {
  return index.index
}
```

# 最后，面试问

- 技术栈选型（必须）
- 鉴权（必须）
- 云开发（可能）
