const app = getApp()
const util = app.require('utils/util.js')
const xushaoSkill = app.require('constants/skill.js')
const CARDS = app.require('constants/card').CARDS

var SIPlugin = requirePlugin("WechatSI")

Page({
  data: {
    yongjianEnabled: false,
    yingbianEnabled: false,
    DIYEnabled: false,
    currentNav: '群',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    xushao: {
      pool: JSON.parse(JSON.stringify(xushaoSkill.XUSHAO_SKILL_POOLS)),
      options: [],
      showModal: false,
      currentPoolIndex: '',
      TEXTS: xushaoSkill.XUSHAO_SKILL_TEXTS,
      OWNERS: xushaoSkill.XUSHAO_SKILL_OWNERS
    },
    zhongyan: {
      TEXTS: xushaoSkill.ZHONGYAN_SKILLS,
      options: [],
      showModal: false,
    },
    caoying: {
      numberCheckBox: [1, 1, 1, 1, 1, 1, 0, 0],
      showModal: false,
    },
    tiansuan: {
      numberChecked: -1,
      showModal: false,
      labels:  ["上上签","上签","中签","下签","下下签"],
    },
    chengyu: {
      cardCheckBox: undefined,
      showModal: false,
      displayCards: [],
    },
    caojie: {
      cardCheckBox: undefined,
      showModal: false,
      displayCards: [],
    },
    zhangrang: {
      cardCheckBox: undefined,
      showModal: false,
      displayCards: [],
    }
  },

  /* ⬇⬇⬇ 工具函数 ⬇⬇⬇ */
  /* 卡牌过滤器 */
  filteredCards(skill) {
    let cards = []
    cards.push.apply(cards, Array.from(CARDS).filter(([key, value]) => value.package == '军争'))
    if (this.data.yongjianEnabled) {
      cards.push.apply(cards, Array.from(CARDS).filter(([key, value]) => value.package == '用间'))
    }
    if (this.data.DIYEnabled) {
      cards.push.apply(cards, Array.from(CARDS).filter(([key, value]) => value.isMine))
    }
    if (this.data.yingbianEnabled) {
      cards = []
      cards.push.apply(cards, Array.from(CARDS).filter(([key, value]) => value.isYingbian))
    }
    cards = cards.filter(([key, value]) => {
      switch(skill) {
        case '设伏':
          return (value.type == '基本' || value.type == '锦囊') && value.name != '毒' 
        case '守玺':
          return value.type == '基本' || value.type == '锦囊'
        case '滔乱':
          return (value.type == '基本' && value.name != '毒') || (value.type == '锦囊' && value.subtype == '普通') 
        case '连计':
          return value.isDamage
      }
    }) 
    return cards
  },

  /* 初始化技能 cardbox, 重新计算要展示的牌，清空被选中的牌 */
  resetCardbox(key, skill) {
    let newbox = this.filteredCards(skill).map(([key, value]) => [key, 0])
    this.setData({
      [`${key}.cardCheckBox`]:
      Object.fromEntries(newbox)
    })
  },
  /* ⬆⬆⬆ 工具函数 ⬆⬆⬆ */


  /* ⬇⬇⬇ 生命周期函数 ⬇⬇⬇ */
  /* 初始化数据 */
  onReady() {
    this.setData({CARDS: Object.fromEntries(CARDS)})
    this.resetCardbox('chengyu', '设伏')
    this.resetCardbox('caojie', '守玺')
    this.resetCardbox('zhangrang', '滔乱')
  },
  /* ⬆⬆⬆ 生命周期函数 ⬆⬆⬆ */
 

  /* ⬇⬇⬇ 技能事件监听 ⬇⬇⬇ */
  /* ⬇ 设伏 ⬇ */
  tapShefu: function (event) {
    this.setData({['chengyu.showModal']: true})
  },

  tapShefuCard: function (event) {
    let cardName = event.target.dataset.cardname
    let currentFlag = this.data.chengyu.cardCheckBox[cardName]
    let audio = wx.createInnerAudioContext()
    let content = ''
    if (currentFlag == 0) {
      content = '发动设伏'
    } else {
      content = `取消${cardName}`
    }
    SIPlugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: content,
      success: function(res) {
        audio.src = res.filename
        audio.play()
      },
      fail: function(res) {
          console.log("fail tts", res)
      }
    })
    this.setData({
      [`chengyu.cardCheckBox.${cardName}`]:
        1 - this.data.chengyu.cardCheckBox[cardName],
      "chengyu.showModal": false,
      })
  },

  tapShefuReset: function (event) {
    this.resetCardbox('chengyu', '设伏')
  },

  tapShefuClose: function (event) {
    this.setData({
      "chengyu.showModal": false,
      })
  },

  /* ⬇ 守玺 ⬇ */
  tapShouxi: function (event) {
    this.setData({['caojie.showModal']: true})
  },

  tapShouxiCard: function (event) {
    let cardName = event.target.dataset.cardname
    let currentFlag = this.data.caojie.cardCheckBox[cardName]
    let audio = wx.createInnerAudioContext()
    let content = ''
    if (currentFlag == 0) {
      content = `申明${cardName}`
      SIPlugin.textToSpeech({
        lang: "zh_CN",
        tts: true,
        content: content,
        success: function(res) {
          audio.src = res.filename
          audio.play()
        },
        fail: function(res) {
            console.log("fail tts", res)
        }
      })
    }

      
    this.setData({
      [`caojie.cardCheckBox.${cardName}`]:
        1 - this.data.caojie.cardCheckBox[cardName],
      })
  },

  tapShouxiReset: function (event) {
    this.resetCardbox('caojie', '守玺')
  },

  tapShouxiClose: function (event) {
    this.setData({
      "caojie.showModal": false,
      })
  },

    /* ⬇ 滔乱 ⬇ */
    tapTaoluan: function (event) {
      this.setData({['zhangrang.showModal']: true})
    },
  
    tapTaoluanCard: function (event) {
      let cardName = event.target.dataset.cardname
      let currentFlag = this.data.zhangrang.cardCheckBox[cardName]
      let audio = wx.createInnerAudioContext()
      let content = ''
      if (currentFlag == 0) {
        content = `使用${cardName}`
        SIPlugin.textToSpeech({
          lang: "zh_CN",
          tts: true,
          content: content,
          success: function(res) {
            audio.src = res.filename
            audio.play()
          },
          fail: function(res) {
              console.log("fail tts", res)
          }
        })
      }
  
        
      this.setData({
        [`zhangrang.cardCheckBox.${cardName}`]:
          1 - this.data.zhangrang.cardCheckBox[cardName],
        })
    },
  
    tapTaoluanReset: function (event) {
      this.resetCardbox('zhangrang', '滔乱')
    },
  
    tapTaoluanClose: function (event) {
      this.setData({
        "zhangrang.showModal": false,
        })
    },

  /* ⬇ 伏间 ⬇ */
  tapFujian: function (event) {
    this.setData({['caoying.showModal']: true})
  },
 
  tapFujianTarget: function (event) {
    let index = event.target.dataset.index
    this.setData({[`caoying.numberCheckBox[${index}]`]: 1 - this.data.caoying.numberCheckBox[index]})
  },
  
  closeFujian: function (event) {
    this.setData({['caoying.showModal']: false})
  },

  tapFujianRoll: function (event) {
    let res = "0"
    let that = this
    let lst = this.data.caoying.numberCheckBox.map(
      (value, index) => value? index+1: 0).filter(
      value => value 
    )
    if (lst.length) {
      res = String(lst[Math.floor((Math.random()*lst.length))])
    }
    wx.showModal({
      content: res,
      showCancel: false,
      success (res) {
        that.setData({'caoying.showModal': false})
      }
    })
  },
  /* ⬇ 天算 ⬇ */
  tapTiansuan: function (event) {
    this.setData({['tiansuan.showModal']: true})
  },
 
  tapTiansuanTarget: function (event) {
    let index = event.target.dataset.index
    if (index === this.data.tiansuan.numberChecked) {
      this.setData({"tiansuan.numberChecked": -1})
    } else {
      this.setData({"tiansuan.numberChecked": index})
    }
  },
  
  closeTiansuan: function (event) {
    this.setData({['caoying.showModal']: false})
  },

  tapTiansuanRoll: function (event) {
    let res = "0"
    let that = this
    let lst = [0,1,2,3,4]
    if (this.data.tiansuan.numberChecked != -1) {
      lst.push(this.data.tiansuan.numberChecked)
    }
    res = String(lst[Math.floor((Math.random()*lst.length))])
    res = this.data.tiansuan.labels[res]
    let content
    if (res == "中签") {
      content = "钟签"
    } else {
      content = res
    }
    let audio = wx.createInnerAudioContext()
    SIPlugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: content,
      success: function(res) {
        audio.src = res.filename
        audio.play()
      },
      fail: function(res) {
        console.log("fail tts", res)
      }
    })
    wx.showModal({
      content: res,
      showCancel: false,
      success (res) {
        that.setData({'tiansuan.showModal': false})
      }
    })
  },
  /* ⬇ 狼袭 ⬇ */
  tapLangxi: function (event) {
    let res = String(util.getRandomInt(0, 2))
    wx.showModal({
      icon: 'none',
      content: res,
      showCancel: false
    })
    let audio = wx.createInnerAudioContext()
    let content = `狼袭${res}`
    SIPlugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: content,
      success: function(res) {
        audio.src = res.filename
        audio.play()
      },
      fail: function(res) {
        console.log("fail tts", res)
      }
    })
  },

  /* ⬇ 评荐 ⬇ */
  tapXushaoInfo: function(event) {
    let skill = event.target.dataset.option
    wx.showModal({
      icon: 'none',
      content: xushaoSkill.XUSHAO_SKILL_TEXTS[skill],
      showCancel: false
    })
  },

  tapxushaoReset: function(event) {
    this.setData({
      ['xushao.pool']:
        JSON.parse(JSON.stringify(
          this.data.yongjianEnabled ? xushaoSkill.EX_SKILL : xushaoSkill.XUSHAO_SKILL_POOLS
        ))})
    wx.showModal({content:"已重置", showCancel: false})
  },

  tapxushaoChoose(event) {
    let poolIndex = this.data.xushao.currentPoolIndex
    let choice = event.target.dataset.option
    this.setData({
      ['xushao.pool.'+poolIndex]: this.data.xushao.pool[poolIndex].filter((x) => x !== choice),
      ['xushao.showModal']: false
    })
    // console.log(this.data.xushao.pool["Chupai"].length)
  },

  tapxushaoActive: function(event) {
    let poolname = event.target.dataset.poolname
    let pool = this.data.xushao.pool[poolname]
    let c1 = pool.splice(Math.random() * (pool.length), 1)[0]
    let c2 = pool.splice(Math.random() * (pool.length), 1)[0]
    let c3 = pool.splice(Math.random() * (pool.length), 1)[0]
    pool.push(c1)
    pool.push(c2)
    pool.push(c3)
    this.setData({
      ['xushao.showModal']: true,
      ['xushao.currentPoolIndex']: poolname,
      ['xushao.options']: [c1, c2, c3]
    })
  },

  tapZhongyanChoose(event) {
    this.setData({
      ['zhongyan.showModal']: false
    })

  },

  tapZhongyanInfo: function(event) {
    let skill = event.target.dataset.option
    wx.showModal({
      icon: 'none',
      content: xushaoSkill.ZHONGYAN_SKILLS[skill],
      showCancel: false
    })
  },

  tapZhongyan: function(event) {
    let pool = Object.keys(this.data.zhongyan.TEXTS)
    let c1 = pool.splice(Math.random() * pool.length, 1)[0]
    let c2 = pool.splice(Math.random() * pool.length, 1)[0]
    let c3 = pool.splice(Math.random() * pool.length, 1)[0]
    this.setData({
      ['zhongyan.showModal']: true,
      ['zhongyan.options']: [c1, c2, c3]
    })
  },


  /* ⬇ 凶镬 ⬇ */
  tapXionghuo: function () {
    const choice = util.getRandomInt(1, 3);
    let msg;
    switch(choice){
      case 1:
        msg = '其受到1点火焰伤害且本回合不能对你使用杀'
        break
      case 2:
        msg = '其失去1点体力且本回合手牌上限-1'
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

  /* ⬇ 擅立 ⬇ */
  tapShanli: function () {
    const choice = util.getRandomInt(1, 2);
    let jineng = [
      '曹操·护驾',
      '曹丕·颂威',
      '曹叡·兴衰',
      '刘备·激将',
      '刘禅·若愚',
      '刘谌·勤王',
      '孙权·救援',
      '孙策·制霸',
      '孙休·诏缚',
      '孙皓·归命',
      '孙亮·立军',
      '袁绍·血裔',
      '董卓·暴虐',
      '张角·黄天',
      '袁术·伪帝',
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

  /* ⬇ 矜功 ⬇ */
  tapJingong: function () {
    const choice = util.getRandomInt(1, 2);
    let jinnang = [
      '桃园结义',
      '万箭齐发',
      '南蛮入侵',
      '火攻',
      '五谷丰登',
      '过河拆桥',
      '借刀杀人',
      '决斗',
      '顺手牵羊',
      '铁索连环',
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
  /* ⬆⬆⬆ 技能事件监听 ⬆⬆⬆ */
 

  switchYongjian(event) {
    this.setData({yongjianEnabled: !this.data.yongjianEnabled})
    this.resetCardbox('chengyu', '设伏')
    this.resetCardbox('caojie', '守玺')
    this.resetCardbox('zhangrang', '滔乱')
    this.setData({
      ['xushao.pool']:
        JSON.parse(JSON.stringify(
          this.data.yongjianEnabled ? xushaoSkill.EX_SKILL : xushaoSkill.XUSHAO_SKILL_POOLS
        ))})
    // this.setData({yongjianEnabled: true})
  },
  
  switchYingbian(event) {
    this.setData({yingbianEnabled: !this.data.yingbianEnabled})
    this.resetCardbox('chengyu', '设伏')
    this.resetCardbox('caojie', '守玺')
    this.resetCardbox('zhangrang', '滔乱')
    // this.setData({
    //   ['xushao.pool']:
    //     JSON.parse(JSON.stringify(
    //       this.data.yongjianEnabled ? xushaoSkill.EX_SKILL : xushaoSkill.XUSHAO_SKILL_POOLS
    //     ))})
    // this.setData({yongjianEnabled: true})
  },

  switchDIY(event) {
    this.setData({DIYEnabled: !this.data.DIYEnabled})
    this.resetCardbox('chengyu', '设伏')
    this.resetCardbox('caojie', '守玺')
    this.resetCardbox('zhangrang', '滔乱')
    // this.setData({yongjianEnabled: true})
  },


  onShareAppMessage (){
    return {
      title: "三国杀面杀助手"
    }
  },

  onShareTimeline (){
    return {
      title: "三国杀面杀助手"
    }
  },

  tapPay: function () {
    wx.navigateTo({url: '/pages/pay/pay'})
  },

  
  tapYufeng: function () {
    wx.navigateTo({url: '/pages/flip/flip'})
  },

  tapGeweishu: function () {
    wx.showModal({
      icon: 'none',
      content: String(util.getRandomInt(0, 9)),
      showCancel: false
    })
  },


  tapShanghaipai: function () {
    let cards = this.filteredCards('连计')
    console.log(cards)
    let choice = util.getRandomInt(1, cards.length)
    let card = cards[choice - 1][1].name
    let content = ''
    if (card == '杀') {
      content = '*使用杀选其为目标则无距离限制，额外选除其以外的角色则有距离限制'
    } else if (card == '火烧连营') {
      content = '若其不为合法目标请重新随机'
    }
    wx.showModal({
      icon: 'none',
      title: card,
      content: content,
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

  tapNav: function(event) {
    let index = event.target.dataset.index
    this.setData({currentNav: index})
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
