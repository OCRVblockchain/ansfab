import axios from 'axios'
import Papa from 'papaparse'
//simport { paths } from 'config'
//import api from '../../api/api.js'
import utils from '../../utils.js'

export const state = {
  RBSzha: [],
  RBSzhaForFiltering: [],
  RBWsTypes: [],
  RBWsSizes: [],
  RBRimthickness: [],
  RBStates: [],
  RBDetailtags: [],
  RBOperations: [],
  RBCredentials: [],
  DataSources: {},
  RBAbMalfunctions: [],
  RBDocTypes: [],
  RBGreaseMarks: [],
  RBStorageTypes: [],
  RBWheelMalfunctions: [],
  RBWSMalfunctions: [],
  RBAxleMalfunctions: [],
  RBHDicObjects: [],
  RBAdmZhDor: [],
  RBVagUkp: [],
  RBHStanOb: [],
}

function filterByID(id, refBook, idName, valName) {
  const numId = Number(id)
  const valEntry = refBook.find(item => item[idName] === numId)
  if (valEntry) {
    return valEntry[valName]
  }
  return null
}

function fetchIfNot(commit, state, filename, mutation) {
  if (state.length) {
    return
  }
  if (filename === 'H_DIC_OBJECTS' || filename === 'ADMZHDOR' || filename === 'VAG_UKP' || filename === 'H_STAN_OB') {
    api.fetch(paths.aknsiRefBook, { file: filename }, rb => {
      commit(mutation, rb)
    })
  } else {
    api.fetch(paths.referenceBooks, { file: filename }, rb => {
      commit(mutation, rb)
    })
  }
}

const getters = {
  typeCodeLookup: state => id => filterByID(id, state.RBWsTypes, 'Код', 'Тип КП'),
  stateCodeLookup: state => id => filterByID(id, state.RBStates, 'Код состояния', 'Полное наименование операции'),
  rimthicknessCodeLookup: state => id => filterByID(id, state.RBRimthickness, 'Код', 'Диапазон значение'),
  operationCodeLookup: state => id => filterByID(id, state.RBOperations, 'Код операции', 'Операция'),
  detailTagCodeLookup: state => id => filterByID(id, state.RBDetailtags, 'Код признака', 'Значение признака'),
  dataSourceCodeLookup: state => source => state.DataSources[source],
  companyCodeLookup: state => id => {
    const result = id ? state.RBSzha.find(item => Number(item[0]) === Number(id)) : ''
    return result ? result[2] : id
  },
  getCredentialsByINNKPP: state => (INN, KPP) => state.RBCredentials.filter(item => INN && item['ИНН'] === Number(INN) && KPP && item['КПП'] === Number(KPP)),
  getCredentialsByName: state => name => name ? state.RBCredentials.filter(item => item['Имя организации'] == String(name)) : '',
  getCompanyInfoByCode: state => id => id ? state.RBSzhaForFiltering.filter(item => item.id === utils.padCompanyCodeWithZeroes(id)) : '',
  getCompanyNameByCode: (state, getters) => id => {
    const result = id ? getters.getCompanyInfoByCode(id) : ''
    return result ? result[2] : id
  },
}

const actions = {
  getRBSzha({ commit, state }) {
    if (state.RBSzha.length && state.RBSzhaForFiltering.length) {
      return
    }
    // This refBook is large and we want to stream it from CSV, without overloading the main thread
    Papa.SCRIPT_PATH = '/papaparse.js'
    const szhaParam = '?file=szha.csv'
    const urlSzha = utils.apiURL + paths.referenceBooks + szhaParam
    axios
      .get(urlSzha, {})
      .then(response => {
        Papa.parse(response.data, {
          worker: true,
          complete(results) {
            commit('setRBSzha', results.data)
            commit('setRBSzhaForFiltering', results.data.map(elem => ({
              id: utils.padCompanyCodeWithZeroes(elem[0]),
              name: elem[2],
              title: elem[1],
            })).slice(1))
          },
        })
      })
      .catch(e => utils.handleError(e))
  },
  getRBWsTypes({ commit }) {
    fetchIfNot(commit, state.RBWsTypes, 'wstypes.json', 'setRBWsTypes')
  },
  getRBWsSizes({ commit }) {
    fetchIfNot(commit, state.RBWsSizes, 'wssizes.json', 'setRBWsSizes')
  },
  getRBRimthickness({ commit }) {
    fetchIfNot(commit, state.RBRimthickness, 'rimthicknessws.json', 'setRBRimthickness')
  },
  getRBStates({ commit }) {
    fetchIfNot(commit, state.RBStates, 'states.json', 'setRBStates')
  },
  getRBDetailtags({ commit }) {
    fetchIfNot(commit, state.RBDetailtags, 'detailtags.json', 'setRBDetailtags')
  },
  getRBOperations({ commit }) {
    fetchIfNot(commit, state.RBOperations, 'operations.json', 'setRBOperations')
  },
  getRBCredentials({ commit }) {
    fetchIfNot(commit, state.RBCredentials, 'innkpp.json', 'setRBCredentials')
  },
  getRBAbMalfunctions({ commit }) {
    fetchIfNot(commit, state.RBAbMalfunctions, 'abmalfunctions.json', 'setRBAbMalfunctions')
  },
  getRBDocTypes({ commit }) {
    fetchIfNot(commit, state.RBDocTypes, 'doctypes.json', 'setRBDocTypes')
  },
  getRBGreaseMarks({ commit }) {
    fetchIfNot(commit, state.RBGreaseMarks, 'greasemarks.json', 'setRBGreaseMarks')
  },
  getRBStorageTypes({ commit }) {
    fetchIfNot(commit, state.RBStorageTypes, 'storagetypes.json', 'setRBStorageTypes')
  },
  getRBWheelMalfunctions({ commit }) {
    fetchIfNot(commit, state.RBWheelMalfunctions, 'wheelmalfunctions.json', 'setRBWheelMalfunctions')
  },
  getRBWSMalfunctions({ commit }) {
    fetchIfNot(commit, state.RBWSMalfunctions, 'wsmalfunctions.json', 'setRBWSMalfunctions')
  },
  getRBAxleMalfunctions({ commit }) {
    fetchIfNot(commit, state.RBAxleMalfunctions, 'axlemalfunctions.json', 'setRBAxleMalfunctions')
  },
  getRBHDicObjects({ commit }) {
    fetchIfNot(commit, state.RBHDicObjects, 'H_DIC_OBJECTS', 'setRBHDicObjects')
  },
  getRBAdmZhDor({ commit }) {
    fetchIfNot(commit, state.RBAdmZhDor, 'ADMZHDOR', 'setRBAdmZhDor')
  },
  getRBVagUkp({ commit }) {
    fetchIfNot(commit, state.RBVagUkp, 'VAG_UKP', 'setRBVagUkp')
  },
  getRBHStanObj({ commit }) {
    fetchIfNot(commit, state.RBHStanOb, 'H_STAN_OB', 'setRBHStanOb')
  },
  getDataSources({ commit }) {
    fetchIfNot(commit, state.DataSources, 'datasources.json', 'setDataSources')
  },
}

const mutations = {
  setRBSzha(state, rb) {
    state.RBSzha = rb
  },
  setRBSzhaForFiltering(state, rb) {
    state.RBSzhaForFiltering = rb
  },
  setRBWsTypes(state, rb) {
    state.RBWsTypes = rb
  },
  setRBWsSizes(state, rb) {
    state.RBWsSizes = rb
  },
  setRBRimthickness(state, rb) {
    state.RBRimthickness = rb
  },
  setRBStates(state, rb) {
    state.RBStates = rb
  },
  setRBDetailtags(state, rb) {
    state.RBDetailtags = rb
  },
  setRBOperations(state, rb) {
    state.RBOperations = rb
  },
  setRBCredentials(state, rb) {
    state.RBCredentials = rb
  },
  setDataSources(state, rb) {
    state.DataSources = rb
  },
  setRBAbMalfunctions(state, rb) {
    state.RBAbMalfunctions = rb
  },
  setRBDocTypes(state, rb) {
    state.RBDocTypes = rb
  },
  setRBGreaseMarks(state, rb) {
    state.RBGreaseMarks = rb
  },
  setRBStorageTypes(state, rb) {
    state.RBStorageTypes = rb
  },
  setRBWheelMalfunctions(state, rb) {
    state.RBWheelMalfunctions = rb
  },
  setRBWSMalfunctions(state, rb) {
    state.RBWSMalfunctions = rb
  },
  setRBAxleMalfunctions(state, rb) {
    state.RBAxleMalfunctions = rb
  },
  setRBHDicObjects(state, rb) {
    state.RBHDicObjects = rb
  },
  setRBAdmZhDor(state, rb) {
    state.RBAdmZhDor = rb
  },
  setRBVagUkp(state, rb) {
    state.RBVagUkp = rb
  },
  setRBHStanOb(state, rb) {
    state.RBHStanOb = rb
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
