// 业主管理
import request from '@/utils/request'

// 获取业主列表
export function getProprietorList(query) {
  return request({
    url: 'back/user/list',
    method: 'get',
    params: query
  })
}

// 创建业主
export function createProprietor(params) {
  return request({
    url: '/back/user/add',
    method: 'post',
    data: params
  })
}

// 修改业主
export function updateProprietor(params) {
  return request({
    url: '/back/user/upd',
    method: 'post',
    data: params
  })
}

// 删除业主
export function delProprietor(params) {
  return request({
    url: '/back/user/del',
    method: 'get',
    params
  })
}

// 获取业主详情
export function getProprietorDetail(query) {
  return request({
    url: 'back/user/detail',
    method: 'get',
    params: query
  })
}
