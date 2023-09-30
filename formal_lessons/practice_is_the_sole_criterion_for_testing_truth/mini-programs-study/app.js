// app.js
App({
  // 生命周期类
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
  },
  onShow() {
    console.log('onShow')
  },
  onHide() {
    console.log('onHide')
  },
  globalData: {
    userInfo: null
  }
})
