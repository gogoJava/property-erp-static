// 社区管理员
import request from '@/utils/request'

// 获取场所
export function getClubhouseList(query) {
  return request({
    url: '/back/place/list',
    method: 'get',
    params: query
  })
}

// 添加场所
export function addClubhouse(params) {
  return request({
    url: '/back/place/add',
    method: 'post',
    data: params
  })
}

// 删除场所
export function delClubhouse(params) {
  return request({
    url: '/back/place/del',
    method: 'get',
    params
  })
}

// 修改场所
export function updateClubhouse(params) {
  return request({
    url: '/back/place/upd',
    method: 'post',
    data: params
  })
}
