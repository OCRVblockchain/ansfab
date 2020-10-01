//import { paths } from 'config'
//import api from '../../../api/api.js'

const state = {}

const getters = {}

const actions = {
  getAllAxles({ commit }) {
    api.fetch(paths.axles, {}, axles => {
      commit('setDetails', axles)
    })
  },
  getAxle({ commit }, id) {
    api.fetch([paths.axles].join('/'), {}, axle => {
      if (Array.isArray(axle)) {
        const res = []
        for (const val of axle) {
          if (id === null) {
            res.push(val)
            continue
          }

          if (val.id) {
            if (val.id.indexOf(id) !== -1) {
              res.push(val)
              continue
            }
          }

          if (val.payload.storage_number) {
            if (val.payload.storage_number.indexOf(id) !== -1) {
              res.push(val)
            }
          }
        }
        commit('setDetails', res)
        return
      }
      commit('setDetails', Array(axle))
    })
  },
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations,
}
