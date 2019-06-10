import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    communityId: '@increment', // 社区id
    email: '@email', // 邮箱
    managerId: '@increment',
    name: '@name', // 名字
    sex: '@integer(0,1)', // 性别0女1男
    type: '@integer(0,1)', // 类型0普通管理员1超级管理员
    username: '@name' // 用户名
  }))
}

export default {
  '/administrator/list': config => {
    const { page = 1, limit = 20, sort } = config.query

    let mockList = List.filter(item => {
      // if (importance && item.importance !== +importance) return false
      // if (type && item.type !== type) return false
      // if (title && item.title.indexOf(title) < 0) return false
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
