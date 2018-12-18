// 社区管理员
import request from '@/utils/request'

// 获取社区管理员列表
export function getAdministratorList(query) {
  return request({
    url: '/administrator/list',
    method: 'get',
    params: query
  })
}
