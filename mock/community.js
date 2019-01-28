import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    communityId: '@increment',
    communityNo: '@increment',
    communityName: '@name',
    communityAddress: '@county(true)', // 社区全址
    communityArea: '@natural(60, 100)', // 总面积(平方米)
    communityBuildingArea: '@natural(60, 100)', // 建筑面积
    communityCommonArea: '@natural(60, 100)', // 公用面积
    communityContacts: '@name', // 联系人
    communityContactsPhone: '', // 联系人号码
    communityGarageArea: '@natural(60, 100)', // 车库面积
    communityGarageCount: '@natural(60, 100)', // 车位数量
    communityGreenarea: '@natural(60, 100)', // 绿化面积
    communityLocX: '@natural(60, 100)', // 社区纬度
    communityLocY: '@natural(60, 100)', // 社区经度
    communityManagementType: '@integer(0,1)', // 管理类型(0普通管理1综合管理)
    communityRemark: '', // 备注
    communityRoadArea: '@natural(60, 100)', // 道路面积
    communityRoomCount: '@natural(60, 100)' // 房间总数
  }))
}

export default {
  // '/community/list': config => {
  //   const { page = 1, limit = 20, sort } = config.query

  //   let mockList = List.filter(item => {
  //     // if (importance && item.importance !== +importance) return false
  //     // if (type && item.type !== type) return false
  //     // if (title && item.title.indexOf(title) < 0) return false
  //     return true
  //   })

  //   if (sort === '-id') {
  //     mockList = mockList.reverse()
  //   }

  //   const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

  //   return {
  //     total: mockList.length,
  //     items: pageList
  //   }
  // }
}
