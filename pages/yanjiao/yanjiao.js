//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
  },
  //事件处理函数
  formSubmit: function (event) {
    const numbers = event.detail.value.input.split(" ").map(Number)
    let results = util.groupNumber(numbers)
    let msg = results.map((groups, i) => 
      "方案" + String(i+1) + ": " + groups[0].join(",") + " | " + groups[1].join(",") 
    ).join('\n')
    wx.showModal({
      icon: 'none',
      content: msg,
      showCancel: false
    })
  },
})
