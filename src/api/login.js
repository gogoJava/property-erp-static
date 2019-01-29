import request from '@/utils/request'

export const loginByUsername = (username, password) => request.post('/pass/login?username=' + username + '&password=' + password)

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export const getUserInfo = () => request.get('/back/manager/detail')

