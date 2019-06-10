// 社区管理员
import request from '@/utils/request'

// 获取投诉/保修列表
export function getComplainList(query) {
  return request({
    url: '/back/complain/list',
    method: 'get',
    params: query
  })
}

// 添加投诉/保修
export function addComplain(params) {
  return request({
    url: '/back/complain/add',
    method: 'post',
    data: params
  })
}

// 删除投诉/保修
export function delComplain(params) {
  return request({
    url: '/back/complain/del',
    method: 'get',
    params
  })
}

// 修改投诉/保修
export function updateComplain(params) {
  return request({
    url: '/back/complain/changeStatus',
    method: 'post',
    data: params
  })
}

// 处理投诉/保修
export function dealComplain(query) {
  return request({
    url: '/back/complain/changStatus',
    method: 'get',
    params: query
  })
}
