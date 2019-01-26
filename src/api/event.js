// 资源管理
import request from '@/utils/request'

// 获取事件列表
export function getEventList(query) {
  return request({
    url: '/back/event/list',
    method: 'get',
    params: query
  })
}

// 创建事件
export function createEvent(params) {
  return request({
    url: '/back/event/add',
    method: 'post',
    data: params
  })
}

// 修改事件
export function updateEvent(params) {
  return request({
    url: '/back/event/upd',
    method: 'post',
    data: params
  })
}

// 删除事件
export function delEvent(params) {
  return request({
    url: '/back/event/del',
    method: 'get',
    params
  })
}
