import axios from '../../axios/request'
import store from '../index'
export default {
  namespaced: true,
  state () {
    return {
      requests: []
    }
  },
  getters: {
    requests (state) {
      return state.requests
    }
  },
  mutations: {
    setRequests (state, requests) {
      state.requests = requests
    },
    addRequest (state, request) {
      state.requests.push(request)
    }
  },
  actions: {
    async createRequest ({ commit, dispatch }, payload) {
      try {
        const token = store.getters['authModule/token']
        const { data } = await axios.post(`/requests.json?auth=${token}`, payload)
        commit('addRequest', { ...payload, id: data.name })
      } catch (e) {
        dispatch('setMessage', e.message, { root: true })
      }
    },
    async load ({ commit, dispatch }) {
      try {
        const token = store.getters['authModule/token']
        const { data } = await axios.get(`/requests.json?auth=${token}`)
        const requests = Object.keys(data).map(id => ({ ...data[id], id }))
        commit('setRequests', requests)
      } catch (e) {
        dispatch('setMessage', e.message, { root: true })
      }
    },
    async loadById ({ dispatch }, id) {
      try {
        const token = store.getters['authModule/token']
        const { data } = await axios.get(`/requests/${id}.json?auth=${token}`)
        return { ...data }
      } catch (e) {
        dispatch('setMessage', e.message, { root: true })
      }
    },
    async remove ({ dispatch }, id) {
      try {
        const token = store.getters['authModule/token']
        await axios.delete(`/requests/${id}.json?auth=${token}`)
      } catch (e) {
        dispatch('setMessage', e.message, { root: true })
      }
    },
    async update ({ dispatch }, request) {
      try {
        const token = store.getters['authModule/token']
        await axios.put(`/requests/${request.id}.json?auth=${token}`, request)
      } catch (e) {
        dispatch('setMessage', e.message, { root: true })
      }
    }
  }
}
