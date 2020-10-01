const state = {
  account: null
}

const getters = {
  activeOrg: state => state.account.org,
}

const actions = {}

const mutations = {
  updateAccount(state, account) {
    state.account = account
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
