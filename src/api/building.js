// 大厦管理
import request from '@/utils/request'

// 获取大厦列表
export function getBuildingList(query) {
  return request({
    url: '/building/list',
    method: 'get',
    params: query
  })
}
