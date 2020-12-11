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
  tapGeweishu: function () {
    wx.showModal({
      icon: 'none',
      content: String(util.getRandomInt(0, 9)),
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
  tapShanghaipai: function () {
    const choice = util.getRandomInt(1, 5);
    let msg;
    switch (choice) {
      case 1:
        msg = '杀'
        break
      case 2:
        msg = '万箭齐发'
        break
      case 3:
        msg = '决斗'
        break
      case 4:
        msg = '火攻'
        break
      case 5:
        msg = '南蛮入侵'
        break
    }
    wx.showModal({
      icon: 'none',
      content: msg,
      showCancel: false
    })
  },
  tapJingong: function () {
    const choice = util.getRandomInt(1, 2);
    let jinnang = [
      '桃园结义',
      '万箭齐发',
      '南蛮入侵',
      '火攻',
      '五谷丰登',
      '调虎离山',
      '过河拆桥',
      '火烧连营',
      '借刀杀人',
      '决斗',
      '顺手牵羊',
      '铁索连环',
      '逐鹿天下',
      '无中生有',
    ]
    let jn1 = jinnang.splice(Math.random() * (jinnang.length - 1), 1).pop();
    let jn2 = jinnang.splice(Math.random() * (jinnang.length - 1), 1).pop();
    let spjn;
    switch (choice) {
      case 1:
        spjn = '笑里藏刀\n对一名其他角色使用，其摸X张牌（X为其已损失体力值且最大为5），你对其造成1点伤害。'
        break
      case 2:
        spjn = '美人计\n对一名有手牌的其他男性角色使用，每名女性角色各获得其一张手牌并交给你一张手牌，然后你与其手牌数少的角色对手牌数多的角色造成1点伤害。'
        break
    }
    let msg = jn1 + '\n\n' + jn2 + '\n\n' + spjn
    wx.showModal({
      icon: 'none',
      content: msg,
      showCancel: false
    })
  },
  tapCaoyi: function () {
    let jineng = [
      '（曹昂）慷忾\n当一名角色成为杀的目标后，若你与其距离1以内，则你可以摸一张牌，然后交给其一张牌并展示之。若此牌为装备牌，该角色可以使用此牌。',
      '（台·曹昂）孝廉\n当其他角色成为杀的唯一目标时，你可转移给自己。当你受到此杀的伤害后，你可将一张牌置于其武将牌旁（称为“马” ）。所有角色至武将牌旁有“马” 的角色的距离 + “马” 数） 。',
      '（用间·曹昂）血拼\n出牌阶段限一次，你可失去 1 点体力并选择攻击范围内的一名角色。你弃置其至多两张牌，若这两张牌类别相同，你回复1点体力。',
      '（用间·曹洪）历锋\n①出牌阶段限一次，你可获得弃牌堆的一张武器牌。    ②你可赠予你的装备牌。',
      '(界·曹操）奸雄',
      '(界·曹操）护驾',
      '(神·曹操）归心',
      '(神·曹操）飞影',
      '(君·曹操）建安\n暗置武将来获得突袭·骁果·巧变·节钺·断粮',
      '(君·曹操）挥鞭',
      '(君·曹操）总御\n①当爪黄飞电移至其他角色的装备区后，若你的装备区有坐骑牌，你可交换你与其装备区的所有坐骑牌。②当你使用坐骑牌时，若一名角色的装备区或弃牌堆有爪黄飞电，你将此牌置入弃牌堆，将爪黄飞电置入你的装备区。',
      '(曹冲）称象',
      '(曹冲）仁心',
      '(曹纯）缮甲',
      '(曹洪）援护\n结束阶段，你可以将一张装备牌置入一名角色的装备区，若此牌是：武器牌，你弃置其距离为1的一名角色区域里的一张牌；防具牌，该角色摸一张牌；坐骑牌，该角色回复1点体力。',
      '(台·曹洪）护主\n出牌阶段限一次，若你的装备区有牌，你可令一名角色交给你一张手牌,其获得你装备区的一张牌,若其体力值不大于你，你可令其回复 1 点体力。',
      '(台·曹洪）敛财\n①结束阶段，你可叠置▶你获得一名角色装备区的一张牌。②当你叠置后，你可将手牌补至体力值。',
      '（曹杰）守玺',
      '（曹杰）惠民',
      '（曹丕）行殇',
      '（曹丕）放逐',
      '（曹丕）颂威',
      '（神·曹丕）储元\n受伤贴牌',
      '（神·曹丕）登极\n觉醒技，没用',
      '（曹仁）据守',
      '（曹仁）解围',
      '（SP·曹仁）伪溃\n失去体力看牌，有闪出杀，没闪弃牌',
      '（SP·曹仁）励战\n受伤角色摸牌',
      '（曹叡）恢拓',
      '（曹叡）明鉴',
      '（曹叡）兴衰',
      '（曹休）千驹',
      '（曹休）倾袭',
      '（曹彰）将驰',
      '（曹真）司敌',
      '（曹植）落英',
      '（曹植）酒诗',
      '（曹植）成章\n觉醒技，受到造成1点伤害拿章，7章觉醒回血摸1牌。',
      '（曹婴）凌人\n猜牌',
      '（曹婴）伏间\n看牌',
      '（曹爽）托孤',
      '（曹爽）擅专',
      '（曹性）流矢',
      '（曹性）斩腕\n没用',
      '（曹坚）佛系',
      '（曹坚）曹裔',
    ]
    let jn1 = jineng.splice(Math.random() * (jineng.length - 1), 1).pop();
    wx.showModal({
      icon: 'none',
      content: jn1,
      showCancel: false
    })
  },
  tapShanli: function () {
    const choice = util.getRandomInt(1, 2);
    let jineng = [
      '曹操护驾',
      '曹丕颂威',
      '曹叡兴衰',
      '刘备激将',
      '刘禅若愚',
      '刘谌勤王',
      '孙权救援',
      '孙策制霸',
      '孙休诏缚',
      '孙皓归命',
      '孙亮立军',
      '袁绍血裔',
      '董卓暴虐',
      '张角黄天',
      '袁术伪帝',
      '司马师睿略',
      '司马昭成务',
    ]
    let jn1 = jineng.splice(Math.random() * (jineng.length - 1), 1).pop();
    let jn2 = jineng.splice(Math.random() * (jineng.length - 1), 1).pop();
    let jn3 = jineng.splice(Math.random() * (jineng.length - 1), 1).pop();
    let msg = jn1 + '\n\n' + jn2 + '\n\n' + jn3
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
