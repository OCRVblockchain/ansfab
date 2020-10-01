//import { paths } from 'config'
//import api from '../../../api/api.js'

const state = {}

const getters = {}

const actions = {
  getAllAxleboxes({ commit }) {
    api.fetch(paths.axleboxes, {}, axleboxes => {
      commit('setDetails', axleboxes)
    })
  },
  getAxlebox({ commit }, id) {
    api.fetch([paths.axleboxes].join('/'), {}, axlebox => {
      if (Array.isArray(axlebox)) {
        const res = []
        for (const val of axlebox) {
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
      commit('setDetails', Array(axlebox))
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
