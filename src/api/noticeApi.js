// 资源管理
import request from '@/utils/request'

// 获取公告列表
export function getNoticeList(query) {
  return request({
    url: '/back/notice/list',
    method: 'get',
    params: query
  })
}

// 创建公告
export function createNotice(params) {
  return request({
    url: '/back/notice/add',
    method: 'post',
    data: params
  })
}

// 修改公告
export function updateNotice(params) {
  return request({
    url: '/back/notice/upd',
    method: 'post',
    data: params
  })
}

// 删除公告
export function delNotice(params) {
  return request({
    url: '/back/notice/del',
    method: 'get',
    params
  })
}
