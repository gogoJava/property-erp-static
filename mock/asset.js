import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    assetDescribe: '@word(5)', // 描述
    assetEnglishDescribe: '@word(5)', // 描述（英文）
    assetEnglishName: '@word(5)', // 资产名字（英文）
    assetEnglishPosition: '@word(5)', // 位置信息（英文）
    assetId: '@increment', // id
    assetName: '@name', // 资产名字
    assetPosition: '@word(5)', // 位置信息
    assetTraditionalDescribe: '@word(5)', // 描述（繁体）
    assetTraditionalName: '@name(5)', // 资产名字（繁体）
    assetTraditionalPosition: '@word(5)', // 位置信息（繁体）
    assetType: '公共设备', // 资产类型：电器、公共设备
    communityId: '@increment' // 社区ID
  }))
}

export default {
  '/asset/list': config => {
    const { page = 1, limit = 20, sort } = config.query

    let mockList = List.filter(item => {
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }
}
