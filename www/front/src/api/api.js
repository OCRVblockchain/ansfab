//import { axiosMixin } from '../mixins'
import axios from 'axios'

import utils from "@/utils";

const axiosMixin = {
  methods: {
    fetch(path, params) {
      let url = 'http://localhost:8081' //utils.apiURL + path
      if (path === '/rails') {
        url = utils.elasticURL + path
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

export default {
  fetch(path, params, cb) {
    (async () => {
      const ws = await axiosMixin.methods.fetch(path, params)
      cb(ws || [])
    })()
  },
}
