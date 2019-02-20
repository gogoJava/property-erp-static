// 社区管理员
import request from '@/utils/request'

// 获取广告列表
export function getAdvList(query) {
  return request({
    url: '/back/adv/list',
    method: 'get',
    params: query
  })
}

// 添加广告
export function addAdv(params) {
  return request({
    url: '/back/adv/add',
    method: 'post',
    data: params
  })
}

// 删除广告
export function delAdv(params) {
  return request({
    url: '/back/adv/del',
    method: 'get',
    params
  })
}

// 修改广告
export function updateAdv(params) {
  return request({
    url: '/back/adv/upd',
    method: 'post',
    data: params
  })
}

// 发布/取消广告
export function publishAdv(query) {
  return request({
    url: '/back/adv/publish',
    method: 'get',
    params: query
  })
}
