import axios from 'axios'
// import sha1 from 'sha1'
import merge from 'lodash/merge'
// import uuid from 'uuid'
// import qs from 'qs'
// import envs from '../envs'
axios.defaults.withCredentials = true
// import {createNonceStr, createTimestamp} from './signature'
// import {mapKeysCameCaseToUnderlineCase, mapKeysUnderlineToCamelCase} from '../namingStyle'

const defaultConfig = {
  baseURL: '/backstage/',
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Authorization': localStorage.getItem('Admin-Token') || ''
  }
}

export const createInstance = (config) => {
  config = merge({}, defaultConfig, config)
  const instance = axios.create(config)

// request
  instance.interceptors.request.use((config) => {
    const { requestMapKeys, data } = config
    if (requestMapKeys) {
      config.data = data ? requestMapKeys(data) : data
    }
    config.headers.Authorization = localStorage.getItem('Admin-Token') || ''
    return config
  }, (error) => {
    return Promise.reject(error)
  })

// response
  instance.interceptors.response.use((response) => {
    const { config: { responseMapKeys }} = response
    // console.log('response --> ', response)
    let { data } = response

    if (data && data.code === 100) {
      alert(data.msg)
      return
    }
    if (responseMapKeys && data) {
      data = responseMapKeys(data)
    }

    if (data && data.code !== 200) {
      return Promise.reject(data)
    }
    return data
  }, (error) => {
    const { config: { errorCodeField, errorMsgField }} = error
    if (error[errorCodeField] !== undefined) {
      return Promise.reject(error)
    }
    if (process.env.NODE_ENV !== 'production') {
      console.error(error)
    }
    return Promise.reject({
      [errorCodeField]: 500,
      [errorMsgField]: '服务器繁忙'
    })
  })

  return instance
}

const instance = createInstance()

export default instance
