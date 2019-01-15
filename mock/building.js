import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    buildingDirection: '@word(5)', // 楼宇方向
    buildingId: '@increment', // buildingId
    buildingName: '@name', // 楼宇名字
    buildingNo: '@increment', // 楼宇编号
    buildingStruct: '@word(5)', // 楼宇结构
    communityId: '@increment', // 社区ID
    deleted: false, // 是否注销
    floorLowNum: '@integer(1,10)', // 楼下几层
    floorUpNum: '@integer(1,10)', // 楼上几层
    fullAddress: '@word(5)' // 楼宇全址
  }))
}

export default {
  // '/building/list': config => {
  //   const { page = 1, limit = 20, sort } = config.query

  //   let mockList = List.filter(item => {
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
