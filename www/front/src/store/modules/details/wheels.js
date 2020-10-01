//import { paths } from 'config'
//import api from '../../../api/api.js'

const state = {}

const getters = {}

const actions = {
  getAllWheels({ commit }, params) {
    api.fetch(paths.wheels, params, wheels => {
      commit('setDetails', wheels)
    })
  },
  getWheel({ commit }, id) {
    api.fetch([paths.wheels].join('/'), {}, wheel => {
      if (Array.isArray(wheel)) {
        const res = []
        for (const val of wheel) {
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
      commit('setDetails', Array(wheel))
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
