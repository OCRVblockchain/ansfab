const state = {
  infiniteId: Number(new Date()),
  search_after_timestamp: null,
  search_after_id: null,
  bookmark: null
}

const getters = {}

const actions = {}

const mutations = {
  updateInfinityId(state) {
    state.infiniteId += 1
  },
  setSearchAfterTimestamp(state, value) {
    state.search_after_timestamp = value
  },
  setSearchAfterID(state, value) {
    state.search_after_id = value
  },
  setBookmark(state, value) {
    state.bookmark = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
