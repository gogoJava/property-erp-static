// 建筑管理
import request from '@/utils/request'

// 获取建筑列表
export function getBuildingList(query) {
  return request({
    url: '/back/building/list',
    method: 'get',
    params: query
  })
}

// 创建建筑
export function createBuilding(params) {
  return request({
    url: '/back/building/add',
    method: 'post',
    data: params
  })
}

// 修改建筑
export function updateBuilding(params) {
  return request({
    url: '/back/building/upd',
    method: 'post',
    data: params
  })
}

// 删除建筑
export function delBuilding(params) {
  return request({
    url: '/back/building/del',
    method: 'get',
    params
  })
}

// 社区楼宇单元
export function getCommunityTree() {
  return request({
    url: '/back/building/communityWithBuildingAndUnit',
    method: 'get'
  })
}
