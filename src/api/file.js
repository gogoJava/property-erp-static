import request from '@/utils/request'

export function uploadFile(params) {
  console.log('ssss', params)
  return request({
    url: '/back/file/upload',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
