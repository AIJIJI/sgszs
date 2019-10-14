//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tapLangxi: function () {
    wx.showModal({
      icon: 'none',
      content: String(util.getRandomInt(0, 2)),
      showCancel: false
    })
  },
  tapXionghuo: function () {
    const choice = util.getRandomInt(1, 3);
    let msg;
    switch(choice){
      case 1:
        msg = '受到1点火焰伤害且本回合不能对你使用【杀】'
        break
      case 2:
        msg = '失去1点体力且本回合手牌上限-1'
        break
      case 3:
        msg = '你随机获得其一张手牌和一张装备区里的牌。'
        break
    }
    wx.showModal({
      icon: 'none',
      content: msg,
      showCancel: false
    })
  },
  tapJuexiang: function () {
    const choice = util.getRandomInt(1, 4);
    let msg;
    switch (choice) {
      case 1:
        msg = '当你受到伤害后，若没有角色处于濒死状态，你可以令伤害来源失去1点体力，随机使用一张装备牌。'
        break
      case 2:
        msg = '当你回复体力后，若没有角色处于濒死状态，你可以令一名其他角色失去1点体力，随机使用一张装备牌。'
        break
      case 3:
        msg = '当你受到伤害后，若没有角色处于濒死状态，你可以令伤害来源回复1点体力，弃置一张装备牌。'
        break
      case 4:
        msg = ' 当你回复体力后，若没有角色处于濒死状态，你可以令一名其他角色回复1点体力，弃置一张装备牌。'
        break
    }
    wx.showModal({
      icon: 'none',
      content: msg,
      showCancel: false
    })
  },
  tapYanjiao: function () {
    wx.navigateTo({
      url: '../yanjiao/yanjiao',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
