// 社区
import request from '@/utils/request'

// 获取社区列表
export function getCommunityList(query) {
  return request({
    url: '/back/community/list',
    method: 'get',
    params: query
  })
}

// 创建社区
export function createCommunity(params) {
  return request({
    url: '/back/community/add',
    method: 'post',
    data: params
  })
}

// 删除社区
export function delCommunity(query) {
  return request({
    url: '/back/community/del',
    method: 'get',
    params: query
  })
}

// 获取社区详情
export function queryCommunityDetail(query) {
  return request({
    url: '/back/community/detail',
    method: 'get',
    params: query
  })
}

// 修改社区信息
export function updateCommunityDetail(params) {
  return request({
    url: '/back/community/upd',
    method: 'post',
    data: params
  })
}
