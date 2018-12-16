import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    num: '@increment',
    name: '@name',
    address: '@county(true)',
    latitude_longitude: '经纬度',
    create_time: '@datetime'
  }))
}

export default {
  '/community/list': config => {
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
  },
  '/article/detail': config => {
    const { id } = config.query
    for (const article of List) {
      if (article.id === +id) {
        return article
      }
    }
  },
  '/article/pv': {
    pvData: [
      { key: 'PC', pv: 1024 },
      { key: 'mobile', pv: 1024 },
      { key: 'ios', pv: 1024 },
      { key: 'android', pv: 1024 }
    ]
  },
  '/article/create': {
    data: 'success'
  },
  '/article/update': {
    data: 'success'
  }
}
