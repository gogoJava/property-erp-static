// 资源管理
import request from '@/utils/request'

// 获取资源列表
export function getAssetList(query) {
  return request({
    url: '/asset/list',
    method: 'get',
    params: query
  })
}
