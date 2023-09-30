// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
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
})
