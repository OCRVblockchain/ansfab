//import { paths, orgs } from 'config'
//import api from '../../api/api.js'

const state = {}

const getters = {}

const actions = {
  getProposals({ commit }, params) {
    api.fetch(paths.proposals, params, proposals => {
      const result = proposals.proposals
      commit('setDetails', result || [])
    })
  },
  getProposal({ commit, getters }, params) {
    let filters = {}
    const thisOrgINN = orgs[getters.activeOrg.toLowerCase()].inn

    switch (params.state) {
      case 'onsale':
        // Новые заявки на продажу с возможностью фильтрации по отправителю
        filters = { state: 'НОВАЯ', type: 'SELL', senderInn: params.filters.company ? params.filters.company['ИНН'] : null }
        break
      case 'outgoing':
        // Исходящие заявки с возможностью фильтрации по получателю
        filters = { senderInn: thisOrgINN, receiverInn: params.filters.company ? params.filters.company['ИНН'] : null }
        break
      case 'incoming':
        // Входящие заявки с возможностью фильтрации по отправителю
        filters = { receiverInn: thisOrgINN, senderInn: params.filters.company ? params.filters.company['ИНН'] : null }
        break
      case 'tackle':
        // Входящие заявки на подкатку с возможностью фильтрации по отправителю
        filters = { type: 'TACKLE', receiverInn: thisOrgINN, senderInn: params.filters.company ? params.filters.company['ИНН'] : null }
        break
    }

    api.fetch(paths.proposals, filters, proposals => {
      let result = proposals.proposals
      if (params.filters.proposalId) {
        result = result.filter(x => x.id.indexOf(params.filters.proposalId) !== -1)
      }
      if (params.filters.itemId) {
        result = result.filter(x => x.payload.objectsId.indexOf(params.filters.itemId) !== -1)
      }
      commit('setDetails', result || [])
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
