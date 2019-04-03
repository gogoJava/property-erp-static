import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    communityId: '',
    isSuper: false,
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, data) => {
      state.name = data.name
      state.communityId = data.communityId
      state.isSuper = data.type === 1
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    async LoginByUsername({ commit, dispatch }, userInfo) {
      const username = userInfo.username.trim()
      const { code, data } = await loginByUsername(username, userInfo.password).catch(e => e)
      if (code !== 200) return
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      commit('SET_ROLES', [data.manager])
      commit('SET_NAME', { name: data.manager.username, communityId: data.manager.communityId, type: data.manager.type })
      // type 类型0普通管理员1超级管理员
      const role = { roles: [data.manager.type === 1 ? 'super' : 'admin'] }
      dispatch('GenerateRoutes', role) // 动态修改权限后 重绘侧边菜单
    },

    // 获取用户信息
    async GetUserInfo({ commit, dispatch, state }) {
      const { code, data } = await getUserInfo().catch(e => e)
      if (!data || code !== 200) return
      commit('SET_ROLES', [data])
      commit('SET_NAME', { name: data.username, communityId: data.communityId, type: data.type })
      const role = { roles: [data.type === 1 ? 'super' : 'admin'] }
      dispatch('GenerateRoutes', role) // 动态修改权限后 重绘侧边菜单
      return data
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', { name: data.username, communityId: data.communityId, type: data.type })
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
