import Papa from 'papaparse'

export default {
  elasticURL: "http://84.38.180.210:8888",
  /* eslint no-undef: 0 */
  // apiURL: process.env.api_port === '0'
  //   ? `${process.env.api_proto}://${process.env.api_host}${process.env.api_path}`
  //   : [`${process.env.api_proto}://${process.env.api_host}`, process.env.api_port].join(':'),
  // elasticURL: process.env.elastic_api_port === '0'
  //   ? `${process.env.api_proto}://${process.env.elastic_api_host}${process.env.elastic_api_path}`
  //   : [`${process.env.api_proto}://${process.env.elastic_api_host}`, process.env.elastic_api_port].join(':'),
  // aknsiURL: process.env.aknsi_api_port === '0'
  //   ? `${process.env.api_proto}://${process.env.aknsi_api_host}${process.env.aknsi_api_path}`
  //   : [`${process.env.api_proto}://${process.env.aknsi_api_host}`, process.env.aknsi_api_port].join(':'),
  hasOwnProp(obj, prop) {
    return typeof Reflect.getOwnPropertyDescriptor(obj, prop) !== 'undefined'
  },
  handleResponse(response) {
    let { data } = response
    if (response.headers['content-type'] === 'text/csv; charset=utf-8') {
      try {
        data = Papa.parse(data, {
          worker: true,
        }).data
      } catch (error) {
        return Promise.reject(error)
      }
    }
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch (error) {
        return data
        // Promise.reject(error)
      }
    }
    return data
  },
  handleError(error) {
    if (error.response && error.response.status === 401) {
      this.logout()
    }
    return Promise.reject(error)
  },
  logout() {
    //localStorage.removeItem('vuex')
    //location.reload()
  },
  ifNull(obj, propName, defaultValue) {
    if (typeof obj !== 'undefined') {
      return obj[propName]
    }
    if (!defaultValue) {
      return ''
    }
    return defaultValue
  },
  padCompanyCodeWithZeroes(val) {
    return `0000${val}`.substr(-4)
  },
}
