App({
  onLaunch: function () {
      var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setEnableDebug({
      enableDebug: false
    })
  },
  globalData: {
    userInfo: null
  }
})