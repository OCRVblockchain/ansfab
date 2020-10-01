import axios from 'axios'
import utils from './utils'
import { paths } from 'config'

axios.defaults.withCredentials = true

export const utilsMixin = {
  methods: {
    ifNull: utils.ifNull,
  },
}

export const fieldNameToGetterNameMap = {
  manufacturer: 'company',
  lastServicer: 'company',
  full_examin_plant: 'company',
  operation_place: 'company',
  repair_place: 'company',
  receiver: 'company',
  sender: 'company',
  op_code: 'operation',
  state: 'state',
  ws_type: 'type',
  rim_thickness_range: 'rimthickness',
  detail_tag: 'detailTag',
  data_source: 'dataSource',
}

const convertDateTime = (val, options) => val ? new Date(val).toLocaleDateString('ru-RU', options) : ''
const convertValue = (val, getter) => getter(val)
const dateOptions = { timeZone: 'UTC', year: 'numeric', month: 'long' }
const withTimeOptions = { hour: 'numeric', minute: 'numeric', day: 'numeric', ...dateOptions }

export const convertMixin = {
  methods: {
    getterName(field) {
      return typeof fieldNameToGetterNameMap[field] === 'undefined'
        ? null
        : `${fieldNameToGetterNameMap[field]}CodeLookup`
    },
    parseFullExaminDate(val) {
      if (!val) {
        return null
      }
      if ((/^\d{2}\d{2}$/).test(val)) {
        const year = val.substr(2)
        const fullYear = Number(year) < 70
          ? `20${year}`
          : `19${year}`
        return new Date(`${fullYear}-${val.substr(0, 2)}-01`)
      }
      return new Date(val)
    },
    convertItem$doctype(val) {
      if (val == 'wheelSet') {
        return 'Колесная пара'
      }
      return 'Колесная пара'
    },
    convertItemRepair_date(val) {
      return convertDateTime(val, withTimeOptions)
    },
    convertItemOperation_date(val) {
      return convertDateTime(val, dateOptions)
    },
    convertItemUpdatedAt(val) {
      return convertDateTime(val, withTimeOptions)
    },
    convertItemData_source: convertValue,
    convertItemManufacturer: convertValue,
    convertItemOperation_place: convertValue,
    convertItemFull_examin_plant: convertValue,
    convertItemRepair_place: convertValue,
    convertItemYear_build(val) {
      const currentYear = new Date().getFullYear()
      const subYear = String(currentYear).substring(2)
      const x = Number(val)
      if (x > 99) {
        return val
      }
      return x <= subYear
        ? `20${val}`
        : `19${val}`
    },
    convertItemState: convertValue,
    convertItemOp_code: convertValue,
    convertItemWs_type: convertValue,
    convertItemRim_thickness_range: convertValue,
    convertItemDetail_tag: convertValue,
    convertItemFull_examin_date(val) {
      const result = this.parseFullExaminDate(val)
      return convertDateTime(result, { year: 'numeric', month: 'long' })
    },
    convertItemFull_examin_date_proper(val) {
      return convertDateTime(val, dateOptions)
    },
    convertProposalUpdatedAt(val) {
      return convertDateTime(val, withTimeOptions)
    },
    convertUserLastLoginTime(val) {
      return convertDateTime(val, withTimeOptions)
    },
    convertProposalReceiver: convertValue,
    convertProposalSender: convertValue,
    convertProposalData_source: convertValue,
    convertProposalType(val) {
      return { BUY: 'На покупку', SELL: 'На продажу', TACKLE: 'На подкатку' }[val]
    },
  },
}

export const axiosMixin = {
  methods: {
    fetch(path, params) {
      let url = utils.apiURL + path
      if (path === paths.wheelsets || path === paths.wheelsets_suggest) {
        url = utils.elasticURL + path
      } else if (path === paths.aknsiRefBook) {
        url = utils.aknsiURL + path
      }

      return axios
        .get(url, { params })
        .then(response => utils.handleResponse(response))
        .catch(e => utils.handleError(e))
    },
    patch(path, params) {
      const url = utils.apiURL + path

      return axios
        .patch(url, params)
        .then(response => utils.handleResponse(response))
        .catch(e => utils.handleError(e))
    },
    post(path, params) {
      const url = utils.apiURL + path

      return axios
        .post(url, params)
        .then(response => utils.handleResponse(response))
        .catch(e => utils.handleError(e))
    },
    delete(path, params) {
      const url = utils.apiURL + path

      return axios
        .delete(url, params)
        .then(response => utils.handleResponse(response))
        .catch(e => utils.handleError(e))
    },
  },
}
