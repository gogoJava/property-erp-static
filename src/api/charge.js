// 资源管理
import request from '@/utils/request'

// 获取收费列表
export function getChargeItemRecordList(query) {
  return request({
    url: '/back/chargeItemRecord/list',
    method: 'get',
    params: query
  })
}

// 修改收费
export function updateChargeItemRecord(params) {
  return request({
    url: '/back/chargeItemRecord/upd',
    method: 'post',
    data: params
  })
}

// 删除收费
export function delChargeItemRecord(params) {
  return request({
    url: '/back/chargeItemRecord/del',
    method: 'get',
    params
  })
}

// 添加收费项目
export function addChargeItem(params) {
  return request({
    url: '/back/chargeItem/add',
    method: 'post',
    data: params
  })
}

// 修改收费项目
export function updChargeItem(params) {
  return request({
    url: '/back/chargeItem/upd',
    method: 'post',
    data: params
  })
}

// 删除收费项目
export function delChargeItem(query) {
  return request({
    url: '/back/chargeItem/del',
    method: 'get',
    params: query
  })
}

// 获取收费项目列表
export function getChargeItemList(query) {
  return request({
    url: '/back/chargeItem/list',
    method: 'get',
    params: query
  })
}

// 获取单位收费项目列表
export function getChargeUnitItemList(query) {
  return request({
    url: '/back/chargeItem/unitItemList',
    method: 'get',
    params: query
  })
}

// 单元添加收费项目
export function addUnitItem(params) {
  return request({
    url: '/back/chargeItem/unitAddItem',
    method: 'post',
    data: params
  })
}
