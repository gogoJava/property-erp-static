// 单位管理
import request from '@/utils/request'

// 获取单位列表
export function getUnitList(query) {
  return request({
    url: '/back/unit/list',
    method: 'get',
    params: query
  })
}

// 创建单位
export function createUnit(params) {
  return request({
    url: '/back/unit/add',
    method: 'post',
    data: params
  })
}

// 修改单位
export function updateUnit(params) {
  return request({
    url: '/back/unit/upd',
    method: 'post',
    data: params
  })
}

// 删除单位
export function delUnit(params) {
  return request({
    url: '/back/unit/del',
    method: 'get',
    params
  })
}
