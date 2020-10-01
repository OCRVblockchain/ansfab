import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import wheelsets from './modules/details/wheelsets'
import wheels from './modules/details/wheels'
import axles from './modules/details/axles'
import axleboxes from './modules/details/axleboxes'
import details from './modules/details'
import profile from './modules/profile'
import references from './modules/references'
import modals from './modules/modals'
import proposals from './modules/proposals'
import ui from './modules/ui'
import infinity from './modules/infinity'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    profile,
    wheelsets,
    wheels,
    axles,
    axleboxes,
    details,
    references,
    modals,
    proposals,
    ui,
    infinity,
  },
})
