// 社区
import request from '@/utils/request'

// 获取社区列表
export function getCommunityList(query) {
  return request({
    url: '/community/list',
    method: 'get',
    params: query
  })
}
