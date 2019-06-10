// 社区管理员
import request from '@/utils/request'

// 获取场所记录
export function getPlaceRecordList(query) {
  return request({
    url: '/back/placeRecord/list',
    method: 'get',
    params: query
  })
}

// 删除场所记录
export function delPlaceRecord(params) {
  return request({
    url: '/back/placeRecord/del',
    method: 'get',
    params
  })
}

// 修改场所记录
export function updatePlaceRecord(params) {
  return request({
    url: '/back/placeRecord/upd',
    method: 'post',
    data: params
  })
}

// 场所使用统计
export function getPlaceStatistic(query) {
  return request({
    url: '/back/placeRecord/statis',
    method: 'get',
    params: query
  })
}
