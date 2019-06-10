// 资源管理
import request from '@/utils/request'

// 获取访问者列表
export function getVisitorList(query) {
  return request({
    url: '/back/visitor/list',
    method: 'get',
    params: query
  })
}
