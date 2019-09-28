import request from '@/utils/request'

export function uploadFile(params) {
  return request({
    url: '/back/file/upload',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 费用导出
export function chargeExport(query) {
  return request({
    url: '/back/excel/chargeExport',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

// 资产导出
export function assetExport(query) {
  return request({
    url: '/back/excel/assetExport',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

// 定场记录导出
export function placeRecordExport(query) {
  return request({
    url: '/back/excel/placeRecordExport',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

// 事件导出
export function eventExport(query) {
  return request({
    url: '/back/excel/eventExport',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
