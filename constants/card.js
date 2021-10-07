/*
  CARD_OBJECT = {
    name: '杀' | ... // 名字
    package: '军争' | '用间' | '势备' | '王允专属' // 所属扩展包
    type: '基本' | '锦囊' | '装备' // 类型
    subtype: 
      undefined // 基本牌无子类型
      '普通' | '延时' // 锦囊子类型
      '进攻' | '防御' | '武器' | '防具' | '宝物' // 装备副类别
    isDamage: boolean // 是否为伤害牌
    isMine: boolean // 是否为作者三国杀群专属牌堆
  }
*/


const CARDS = new Map([
  /* 基本 */
  ['杀', {
    name: '杀',
    shortname: '杀',
    package: '军争',
    type: '基本',
    isDamage: true,
    isYingbian: true,
  }],
  ['闪', {
    name: '闪',
    shortname: '闪',
    package: '军争',
    type: '基本',
    isYingbian: true,
  }],
  ['桃', {
    name: '桃',
    shortname: '桃',
    package: '军争',
    type: '基本',
    isYingbian: true,
  }],
  ['酒', {
    name: '酒',
    shortname: '酒',
    package: '军争',
    type: '基本',
    isYingbian: true,
  }],
  ['毒', {
    name: '毒',
    shortname: '毒',
    package: '用间',
    type: '基本',
  }],

  ['兵粮寸断', {
    shortname: "兵",
    name: '兵粮寸断',
    package: '军争',
    type: '锦囊',
    subtype: '延时',
    isYingbian: true,
  }],
  ['乐不思蜀', {
    name: '乐不思蜀',
    shortname: "乐",
    package: '军争',
    type: '锦囊',
    subtype: '延时',
    isYingbian: true,
  }],
  ['闪电', {
    name: '闪电',
    shortname: '闪电',
    package: '军争',
    type: '锦囊',
    subtype: '延时',
    isYingbian: true,
  }],

   
  ['南蛮入侵', {
    name: '南蛮入侵',
    shortname: "南蛮",
    package: '军争',
    type: '锦囊',
    subtype: '普通',
    isDamage: true,
    isYingbian: true,
  }],
  ['万箭齐发', {
    name: '万箭齐发',
    shortname: "万剑",
    package: '军争',
    type: '锦囊',
    subtype: '普通',
    isDamage: true,
    isYingbian: true,
  }],
  ['火攻', {
    name: '火攻',
    shortname: '火攻',
    package: '军争',
    type: '锦囊',
    subtype: '普通',
    isDamage: true,
    isYingbian: false,
  }],
  ['决斗', {
    name: '决斗',
    shortname: '决斗',
    package: '军争',
    type: '锦囊',
    subtype: '普通',
    isDamage: true,
    isYingbian: false,
  }],


  ['过河拆桥', {
    name: '过河拆桥',
    shortname: "拆",
    package: '军争',
    type: '锦囊',
    subtype: '普通',
    isYingbian: true,
  }],

  
  ['顺手牵羊', {
    name: '顺手牵羊',
    shortname: "顺",
    package: '军争',
    type: '锦囊',
    subtype: '普通',
    isYingbian: true,
  }],

  ['借刀杀人', {
    name: '借刀杀人',
    shortname: "借刀",
    package: '军争',
    type: '锦囊',
    subtype: '普通',
    isYingbian: false,
  }],
  ['桃园结义', {
    name: '桃园结义',
    shortname: "桃园",
    package: '军争',
    type: '锦囊',
    subtype: '普通',
    isYingbian: true,
  }],
  ['铁索连环', {
    name: '铁索连环',
    shortname: "铁索",
    package: '军争',
    type: '锦囊',
    subtype: '普通',
    isYingbian: true,
  }],
  ['无中生有', {
    name: '无中生有',
    shortname: "无中",
    package: '军争',
    type: '锦囊',
    subtype: '普通',
    isYingbian: false,
  }],
  ['五谷丰登', {
    name: '五谷丰登',
    shortname: "五谷",
    package: '军争',
    type: '锦囊',
    subtype: '普通',
    isYingbian: true,
  }],
  ['无懈可击', {
    name: '无懈可击',
    shortname: "无懈",
    package: '军争',
    type: '锦囊',
    subtype: '普通',
    isYingbian: true,
  }],  

  /* 应变锦囊 */
  ['逐近弃远', {
    name: '逐近弃远',
    shortname: "逐近",
    package: '应变',
    type: '锦囊',
    subtype: '普通',
    isYingbian: true,
  }],
  ['洞烛先机', {
    name: '洞烛先机',
    shortname: "洞烛",
    package: '应变',
    type: '锦囊',
    subtype: '普通',
    isYingbian: true,
  }],
  ['出其不意', {
    name: '出其不意',
    shortname: "出其",
    package: '应变',
    type: '锦囊',
    subtype: '普通',
    isYingbian: true,
  }],
  ['水淹七军', {
    name: '水淹七军',
    shortname: "水淹",
    package: '应变',
    type: '锦囊',
    subtype: '普通',
    isYingbian: true,
  }],

  /* 用间锦囊 */
  ['刮骨疗毒', {
    name: '刮骨疗毒',
    shortname: "刮骨",
    package: '用间',
    type: '锦囊',
    subtype: '普通',
  }],
  ['树上开花', {
    name: '树上开花',
    shortname: "树上",
    package: '用间',
    type: '锦囊',
    subtype: '普通',
  }],
  ['趁火打劫', {
    name: '趁火打劫',
    shortname: "打劫",
    package: '用间',
    type: '锦囊',
    subtype: '普通',
    isDamage: true
  }],
  ['推心置腹', {
    name: '推心置腹',
    shortname: "推心",
    package: '用间',
    type: '锦囊',
    subtype: '普通',
  }],

  /* 势备锦囊 */
  ['火烧连营', {
    name: '火烧连营',
    shortname: "火烧",
    package: '势备',
    type: '锦囊',
    subtype: '普通',
    isMine: true,
    isDamage: true,
  }],
  ['调虎离山', {
    name: '调虎离山',
    shortname: "调虎",
    package: '势备',
    type: '锦囊',
    subtype: '普通',
    isMine: true,
  }],
  ['戮力同心', {
    name: '戮力同心',
    shortname: "戮力",
    package: '势备',
    type: '锦囊',
    subtype: '普通',
    isMine: true
  }],

  /* 逐鹿锦囊 */
  ['逐鹿天下', {
    name: '逐鹿天下',
    shortname: "逐鹿",
    package: '逐鹿天下',
    type: '锦囊',
    subtype: '普通',
    isMine: true
  }],
  ['草船借箭', {
    name: '草船借箭',
    shortname: "草船",
    package: '逐鹿天下',
    type: '锦囊',
    subtype: '普通',
    isMine: true
  }],

  /* 其他 */
  ['美人计', {
    name: '美人计',
    shortname: "美人",
    package: '王允专属',
    type: '锦囊',
    subtype: '普通',
  }],
  ['笑里藏刀', {
    name: '笑里藏刀',
    shortname: "笑里",
    package: '王允专属',
    type: '锦囊',
    subtype: '普通',
  }],
])

module.exports = {
  CARDS: CARDS
}