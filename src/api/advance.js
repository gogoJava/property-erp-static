import request from '@/utils/request'

// 预收
export function addAdvance(params) {
  return request({
    url: '/back/advance/add',
    method: 'post',
    data: params
  })
}
