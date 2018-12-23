// 业主管理
import request from '@/utils/request'

// 获取业主列表
export function getProprietorList(query) {
  return request({
    url: '/proprietor/list',
    method: 'get',
    params: query
  })
}
