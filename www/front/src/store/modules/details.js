import store from '..'

const state = {
  all: [],
}

const getters = {}

const actions = {

}

const mutations = {
  setDetails(state, details) {
    state.all = details
  },
  addDetails(state, objArgs) {
    if (!objArgs.details || !objArgs.infinityId) {
      throw 'Incorrect args'
    }
    if (objArgs.infinityId === store.state.infinity.infiniteId) {
      state.all = state.all.concat(objArgs.details)
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
