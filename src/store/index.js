import { createStore } from 'vuex'
import authModule from './modules/auth.module'
import requestModule from './modules/request.module'

export default createStore({
  state () {
    return {
      message: null,
      sidebar: false
    }
  },
  getters: {
  },
  mutations: {
    setMessage (state, message) {
      state.message = message
    },
    clearMessage (state) {
      state.message = null
    },
    openSidebar (state) {
      state.sidebar = true
    },
    closeSidebar (state) {
      state.sidebar = false
    }
  },
  actions: {
    setMessage ({ commit }, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      }, 5000)
    }
  },
  modules: {
    authModule, requestModule
  }
})
