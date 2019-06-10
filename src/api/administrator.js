// 社区管理员
import request from '@/utils/request'

// 获取社区管理员列表
export function getAdministratorList(query) {
  return request({
    url: '/back/manager/list',
    method: 'get',
    params: query
  })
}

// 添加管理员
export function addManager(params) {
  return request({
    url: '/back/manager/add',
    method: 'post',
    data: params
  })
}

// 删除管理员
export function delManager(params) {
  return request({
    url: '/back/manager/del',
    method: 'get',
    params
  })
}

// 管理员详情
export function getManagerDetail(params) {
  return request({
    url: '/back/manager/detail',
    method: 'get',
    params
  })
}

// 修改管理员
export function updateManager(params) {
  return request({
    url: '/back/manager/upd',
    method: 'post',
    data: params
  })
}

// 获取角色列表
export function getRoleList() {
  return request({
    url: '/back/manager/getRoleList',
    method: 'post'
  })
}
