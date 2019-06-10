import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    unitChildRelativeProportion: '@float(0,1,3,3)', // 分层建筑物之子部分相对比(千分之一)
    buildingId: '@increment', // buildingId
    unitCoveredArea: '@natural(60,100)', // 覆盖面积大小(单位平方米)
    unitName: '@word(5)', // 单位名字
    unitFullAddress: '@unitPosition(5)', // 全址
    unitId: '@increment', // unitId
    unitNo: '@increment', // 单位编号
    unitPosition: '@word(5)', // 位置(地下,一楼,二楼,三楼,户外.)
    unitPurpose: '@word(5)', // 用途
    unitRelativeProportion: '@float(0,1,3,3)', // 分层建筑物相对比(千分之一)
    unitStatus: '@integer(0, 3)', // 单位状态0空置1租赁2装修中3入住
    unitType: '@integer(1, 3)' // 单位类型1商铺2住宅3停车场
  }))
}

export default {
  // '/unit/list': config => {
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
