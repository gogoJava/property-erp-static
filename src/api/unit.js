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

// 房间用户添加
export function addUser(params) {
  return request({
    url: '/back/unit/addUser',
    method: 'post',
    data: params
  })
}

// 房间用户添加
export function batchAddUser({ userId, userUnitList }) {
  return request({
    url: '/back/unit/batchAddUser?userId=' + userId,
    method: 'post',
    data: userUnitList
  })
}
// 房间用户添加
export function batchAddUserUnitId({ userUnitList, unitId }) {
  return request({
    url: '/back/unit/batchAddUser?unitId=' + unitId,
    method: 'post',
    data: userUnitList
  })
}

// 获取单位列表
export function getUnitUserList(query) {
  return request({
    url: '/back/unit/unitUserList',
    method: 'get',
    params: query
  })
}

// 导入文件
export function uploadImportUnit(params) {
  return request({
    url: '/back/unit/import',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 单元导出
export function unitExport(query) {
  return request({
    url: '/back/unit/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
