import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    birthday: '@date("yyyy-MM-dd")', // 出生日期
    communityId: '@increment', // 社区ID
    countryCode: '@increment', // 区号
    createTime: '@date("yyyy-MM-dd")', // 创建时间
    email: '@email', // 邮编
    englishName: '@name', // 英文名字
    deleted: false, // 是否注销
    idCard: '@increment(1000)', // 身份证号码
    marriageSystem: '@integer(1,2)', // 婚姻制度
    mateName: '@name(5)', // 配偶名字
    name: '@name', // 名字
    portrait: '@image', // 用户头像
    sex: '@natural(0,1)', // 性别(0女1男)
    tel: '@word(5)', // 手机号
    updateTime: '@date("yyyy-MM-dd")', // 更新时间
    userId: '@increment', // 用户id
    username: '@word(5)' // 用户登录账号
  }))
}

export default {
  '/proprietor/list': config => {
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
