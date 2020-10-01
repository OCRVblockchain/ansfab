const state = {
  isLoading: false,
  countReports: 1,
  checkedRows: [],
}

const getters = {
  getReportTitle: state => {
    const date = new Date()
    return `Отчет №${state.countReports} от ${date.toLocaleDateString('ru-RU', { timeZone: 'UTC' })}`
  },
}

const actions = {}

const mutations = {
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  incrementCountReports(state) {
    state.countReports += 1
  },
  checkRows(state, rows) {
    state.checkedRows = rows
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
