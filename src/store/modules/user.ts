import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { getToken, removeToken, setToken } from '@/utils/auth'
import api from '@/services/api'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    gamelist: [],
    count: 10
  }
}
export interface userStore {
  token: string | null
  name: string
  avatar: string
  gamelist: []
  count: number
}
const state: userStore = {
  token: getToken(),
  name: '',
  avatar: '',
  gamelist: [],
  count: 10
}

const mutations: MutationTree<userStore> = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  increment: (state) => {
    state.count++
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_Gamelist: (state, data) => {
    state.gamelist = data
  }
}
// getters
const getters: GetterTree<userStore, any> = {
  token(state) {
    return state.token
  },
  count(state) {
    return state.count
  },
  name(state) {
    return state.name
  }
}
const actions: ActionTree<userStore, any> = {
  incrementA({ commit }) {
    commit('increment')
  },
  // user login
  login({ commit }, userInfo) {
    const { login } = api.user
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve(response)
        })
        .catch((error: unknown) => {
          reject(error)
        })
    })
  },
  // // get user info
  getInfo({ commit }) {
    const { getInfo } = api.user
    return new Promise((resolve, reject) => {
      getInfo({ token: getToken() })
        .then((response: any) => {
          const { data } = response
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          const { name } = data
          commit('SET_NAME', name)
          resolve(data)
        })
        .catch((error: unknown) => {
          reject(error)
        })
    })
  },
  // // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      // resetRouter()
      commit('RESET_STATE')
      resolve('1')
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve('1')
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
