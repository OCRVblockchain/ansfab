//import { paths } from 'config'
//import api from '../../api/api.js'

const state = {
  items: [],
}

const getters = {}

const actions = {
  getWheelsetHistory({ commit }, id) {
    api.fetch([paths.wheelsetsHistory, id].join('/'), {}, history => {
      commit('setItems', history)
    })
  },
}

const mutations = {
  setItems(state, items) {
    state.items = items
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
