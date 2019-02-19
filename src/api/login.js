import request from '@/utils/request'

export const loginByUsername = (username, password) => request.post('/pass/login?username=' + username + '&password=' + password)

export const logout = () => request.post('/pass/back/logout')

export const getUserInfo = () => request.get('/back/manager/detail')

