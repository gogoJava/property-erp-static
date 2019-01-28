// 资源管理
import request from '@/utils/request'

// 获取资源列表
export function getAssetList(query) {
  return request({
    url: '/back/asset/list',
    method: 'get',
    params: query
  })
}

// 创建资源
export function createAsset(params) {
  return request({
    url: '/back/asset/add',
    method: 'post',
    data: params
  })
}

// 修改资源
export function updateAsset(params) {
  return request({
    url: '/back/asset/upd',
    method: 'post',
    data: params
  })
}

// 删除资源
export function delAsset(params) {
  return request({
    url: '/back/asset/del',
    method: 'get',
    params
  })
}
