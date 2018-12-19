// 单位管理
import request from '@/utils/request'

// 获取单位列表
export function getUnitList(query) {
  return request({
    url: '/unit/list',
    method: 'get',
    params: query
  })
}
