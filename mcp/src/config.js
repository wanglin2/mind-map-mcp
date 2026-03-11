export const config = {
  port: parseInt(process.env.PORT || '3100', 10)
}

export const layoutStr =
  'logicalStructure（逻辑结构图）、logicalStructureLeft（向左逻辑结构图）、mindMap（思维导图）、organizationStructure（组织结构图）、catalogOrganization（目录组织图）、timeline（时间轴）、verticalTimeline（垂直时间轴）、fishbone（鱼骨图）'

const lightThemeList = [
  {
    name: '天清绿',
    value: 'skyGreen'
  },
  {
    name: '经典绿',
    value: 'classicGreen'
  },
  {
    name: '经典蓝',
    value: 'classicBlue'
  },
  {
    name: '天空蓝',
    value: 'blueSky'
  },
  {
    name: '脑残粉',
    value: 'brainImpairedPink'
  },
  {
    name: '泥土黄',
    value: 'earthYellow'
  },
  {
    name: '清新绿',
    value: 'freshGreen'
  },
  {
    name: '清新红',
    value: 'freshRed'
  },
  {
    name: '浪漫紫',
    value: 'romanticPurple'
  },
  {
    name: '粉红葡萄',
    value: 'pinkGrape'
  },
  {
    name: '薄荷',
    value: 'mint'
  },
  {
    name: '金色vip',
    value: 'gold'
  },
  {
    name: '活力橙',
    value: 'vitalityOrange'
  },
  {
    name: '绿叶',
    value: 'greenLeaf'
  },
  {
    name: '小黄人',
    value: 'minions'
  },
  {
    name: '简约黑',
    value: 'simpleBlack'
  },
  {
    name: '课程绿',
    value: 'courseGreen'
  },
  {
    name: '咖啡',
    value: 'coffee'
  },
  {
    name: '红色精神',
    value: 'redSpirit'
  },
  {
    name: '牛油果',
    value: 'avocado'
  },
  {
    name: '秋天',
    value: 'autumn'
  },
  {
    name: '奥利奥',
    value: 'oreo'
  },
  {
    name: '浅海',
    value: 'shallowSea'
  },
  {
    name: '柠檬气泡',
    value: 'lemonBubbles'
  },
  {
    name: '玫瑰',
    value: 'rose'
  },
  {
    name: '海蓝线',
    value: 'seaBlueLine'
  },
  {
    name: '莫兰迪',
    value: 'morandi'
  },
  {
    name: '仙人掌',
    value: 'cactus'
  },
  {
    name: '脑图经典2',
    value: 'classic2'
  },
  {
    name: '脑图经典3',
    value: 'classic3'
  },
  {
    name: '脑图经典4',
    value: 'classic4'
  },
  {
    name: '脑图经典5',
    value: 'classic5'
  },
  {
    name: '脑图经典6',
    value: 'classic6'
  },
  {
    name: '脑图经典7',
    value: 'classic7'
  },
  {
    name: '脑图经典8',
    value: 'classic8'
  },
  {
    name: '脑图经典9',
    value: 'classic9'
  },
  {
    name: '脑图经典10',
    value: 'classic10'
  },
  {
    name: '脑图经典11',
    value: 'classic11'
  },
  {
    name: '脑图经典12',
    value: 'classic12'
  },
  {
    name: '脑图经典13',
    value: 'classic13'
  },
  {
    name: '脑图经典14',
    value: 'classic14'
  },
  {
    name: '脑图经典15',
    value: 'classic15'
  }
]

const darkThemeList = [
  {
    name: '脑图经典',
    value: 'classic'
  },
  {
    name: '黑色幽默',
    value: 'blackHumour'
  },
  {
    name: '深夜办公室',
    value: 'lateNightOffice'
  },
  {
    name: '黑金',
    value: 'blackGold'
  },
  {
    name: '橙汁',
    value: 'orangeJuice'
  },
  {
    name: '霓虹灯',
    value: 'neonLamp'
  },
  {
    name: '暗夜冰刃',
    value: 'darkNightLceBlade'
  },
  {
    name: '暗色',
    value: 'dark'
  },
  {
    name: '暗色2',
    value: 'dark2'
  },
  {
    name: '暗色3',
    value: 'dark3'
  },
  {
    name: '暗色4',
    value: 'dark4'
  },
  {
    name: '暗色5',
    value: 'dark5'
  },
  {
    name: '暗色6',
    value: 'dark6'
  },
  {
    name: '暗色7',
    value: 'dark7'
  }
]

export const themeStr =
  '亮色主题：' +
  lightThemeList
    .map(item => {
      return item.value + '（' + item.name + '）'
    })
    .join('、') +
  '；暗色主题：' +
  darkThemeList
    .map(item => {
      return item.value + '（' + item.name + '）'
    })
    .join('、')

const exportTypeList = [
  {
    name: '图片',
    type: 'png',
    desc: '常用图片格式，适合查看分享'
  },
  {
    name: 'SVG',
    type: 'svg',
    desc: '可缩放矢量图形'
  },
  {
    name: 'PDF',
    type: 'pdf',
    desc: '适合查看浏览和打印'
  },
  {
    name: 'Markdown',
    type: 'md',
    desc: 'md文本格式，便于其他软件打开'
  },
  {
    name: 'XMind',
    type: 'xmind',
    desc: 'XMind软件格式'
  },
  {
    name: 'Txt',
    type: 'txt',
    desc: '纯文本文件'
  },
  {
    name: 'Excel',
    type: 'xlsx',
    desc: '表格文本形式，可用Excel软件编辑'
  }
]

export const exportTypeStr = exportTypeList
  .map(item => {
    return item.type + '（' + item.desc + '）'
  })
  .join('、')
