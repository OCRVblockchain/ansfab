<template>
  <div>
    <!--<lazy-modal-history />
    <lazy-modal-view
      title="Колесная пара"
      event-name="show_wheelset"
      path-to-get="/wheelsets"
    />-->
    <section class="main-section">
      <div class="container content">
        <h1>Рельсы</h1>
        <h1 @click="showModalAdd" style="position: absolute; right: 0px; bottom: 0px; padding: 0px; margin: 0px; cursor: pointer;">Добавить&nbsp;<i class="fas fa-plus-square" ></i></h1>
      </div>

      <!-- <div class="columns">
           <div class="column">-->

      <!--   </div>
     </div>-->
      <!--<download-excel
        :fetch="fetchAll"
        :before-generate="beforeGenerate"
        :before-finish="beforeFinish"
        :fields="json_fields_item"
        class="excel-btn"
      >
        <a class="blue-link"
          ><i class="fas fa-file-excel"></i>&nbsp;Экспорт в Excel</a
        >
      </download-excel>-->
      <div class="container search-box">
        <div class="field is-grouped">
          <p class="control is-expanded">
            <input class="input" type="text" placeholder="Идентификатор">
          </p>
          <p class="control is-expanded">
            <input class="input" type="text" placeholder="Расположение">
          </p>
          <div class="control">
            <b-select placeholder="Состояние" expanded>
              <option value="flint">Flint</option>
              <option value="silver">Silver</option>
            </b-select>
          </div>
        </div>
        <div class="field is-grouped">

          <p class="control is-expanded">
            <input class="input" type="text" placeholder="Собственник">
          </p>
          <div class="control">
            <b-select placeholder="Тип КП" expanded>
              <option value="flint">Flint</option>
              <option value="silver">Silver</option>
            </b-select>
          </div>
          <div class="control">
            <b-select placeholder="Толщина обода" expanded>
              <option value="flint">Flint</option>
              <option value="silver">Silver</option>
            </b-select>
          </div>
          <div class="control">
            <b-select placeholder="Признак" expanded>
              <option value="flint">Flint</option>
              <option value="silver">Silver</option>
            </b-select>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control is-expanded">
            <b-datepicker
                    placeholder="Click to select..."
                    icon="calendar-today"
                    trap-focus>
            </b-datepicker>
          </div>
          <div class="control is-expanded">
            <b-datepicker
                    placeholder="Click to select..."
                    icon="calendar-today"
                    trap-focus>
            </b-datepicker>
          </div>


          <div class="control">
            <b-select placeholder="Источник данных" expanded>
              <option value="flint">Flint</option>
              <option value="silver">Silver</option>
            </b-select>
          </div>
        </div>
      </div>

      <div class="container">
        <b-tag type="is-link" size="is-medium">
          <b>Найдено: {{ count.value }}</b>
        </b-tag>
      </div>
      <!--<b-tag type="is-brown" size="is-medium">
        <b>Всего выбрано: {{ checkedRows.length }}</b></b-tag
      >&nbsp;&nbsp;&nbsp;-->

      <div class="container table-box wheelsets-list">
        <table class="table is-fullwidth is-narrow is-hoverable">
          <thead>
          <tr>
            <th>ID</th>
            <th class="is-hidden-mobile">Статус</th>
            <th class="is-hidden-mobile">Номер плавки</th>
            <th>Длина рельса</th>
            <th>Назначение</th>
            <th>Тип рельса</th>
            <th>Завод</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(w, index) in wheelsets" :key="index">
            <td nowrap><span class="tag is-light is-success">{{ w.doc.id }}</span></td>
            <td class="is-hidden-mobile">{{ w.Status }}</td>
            <td>{{ w.NumSmelting }}</td>
            <td>{{ w.Length }}</td>
            <td>{{ w.RailPurpose }}</td>
            <!--<td class="is-hidden-mobile"><div class="content is-small">Рельс</div></td>-->
            <td>{{ w.RailType }}</td>
            <td>{{ w.Manufacturer }}</td>
            <td><div class="dropdown is-active">
                <div class="dropdown-trigger">
<!--                      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">-->
<!--                          <span>Dropdown button</span>-->
<!--                          <span class="icon is-small">-->
<!--        <i class="fas fa-angle-down" ></i>-->
<!--      </span>-->
<!--                      </button>-->
                  <i aria-haspopup="true" aria-controls="dropdown-menu" aria-hidden="true" class="fas fa-ellipsis-h"></i>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <a href="#" class="dropdown-item">
                              Dropdown item
                    </a>
                    <a class="dropdown-item">
                              Other dropdown item
                    </a>
                    <a href="#" class="dropdown-item is-active">
                              Active dropdown item
                    </a>
                    <a href="#" class="dropdown-item">
                              Other dropdown item
                    </a>
                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item">
                              With a divider
                    </a>
                  </div>
                </div>
              </div>
            </td>


          </tr>
          </tbody>
        </table>
      </div>
      <!--<div class="wheelsets">
        <b-tag type="is-green" size="is-medium">
          <b>Найдено: {{ count.value }}</b></b-tag
        >&nbsp;
        <b-tag type="is-brown" size="is-medium">
          <b>Всего выбрано: {{ checkedRows.length }}</b></b-tag
        >&nbsp;&nbsp;&nbsp;
        <b-table
          :data="wheelsets"
          :hoverable="true"
          :loading="isLoading"
          :checked-rows.sync="checkedRows"
          :row-class="
            (row, index) =>
              isValidRow(row.payload, row.payload.state, row.payload.op_code)
                ? 'animateUp'
                : 'animateUp invalid'
          "
          custom-detail-row
          checkable
        >
          <template slot-scope="props">
            <b-table-column label="№">
              {{ props.index + 1 }}
            </b-table-column>
            <b-table-column field="id" label="ID">
              <a class="blue-link" @click="showWheelset(props.row.id)">{{
                props.row.id
              }}</a>
            </b-table-column>
            <b-table-column label="Собственник" field="payload.owner_name">
              <span :title="props.row.payload.owner_name"
                >{{ shortenOrg(props.row.payload.owner_name) }}
              </span>
            </b-table-column>
            <b-table-column
              label="Расположение"
              field="payload.storage_number"
            >
              {{ props.row.payload.storage_number }}
            </b-table-column>
            <b-table-column field="payload.state" label="Состояние">
              <span v-if="Number(props.row.payload.state)">
                {{
                  $store.getters.stateCodeLookup(
                    Number(props.row.payload.state)
                  )
                }}
              </span>
              <span v-else>
                {{ props.row.payload.state }}
              </span>
            </b-table-column>
            <b-table-column
              label="Тип КП/Характеристика"
              field="payload.ws_type"
            >
              <span
                v-if="
                  $store.getters.typeCodeLookup(props.row.payload.ws_type)
                "
              >
                {{ $store.getters.typeCodeLookup(props.row.payload.ws_type) }}
              </span>
              <span
                v-if="
                  $store.getters.rimthicknessCodeLookup(
                    props.row.payload.rim_thickness_range
                  )
                "
              >
                {{
                  $store.getters.rimthicknessCodeLookup(
                    props.row.payload.rim_thickness_range
                  )
                }}
              </span>
            </b-table-column>
            <b-table-column
              label="Данные ПО"
              field="payload.full_examin_plant"
            >
              <b-tooltip
                v-if="props.row.payload.full_examin_plant"
                :label="
                  $store.getters.companyCodeLookup(
                    props.row.payload.full_examin_plant
                  )
                "
                type="is-dark"
                position="is-bottom"
              >
                <span class="tag is-lighty">
                  {{ props.row.payload.full_examin_plant }}
                </span>
              </b-tooltip>
              &nbsp;
              {{
                convertItemFull_examin_date(
                  props.row.payload.full_examin_date
                )
              }}
            </b-table-column>
            <b-table-column
              label="Последняя операция"
              field="payload.op_code"
            >
              {{
                $store.getters.operationCodeLookup(
                  Number(props.row.payload.op_code)
                )
              }}
              <span v-if="props.row.payload.operation_date">
                ({{
                  convertItemOperation_date(props.row.payload.operation_date)
                }})
              </span>
            </b-table-column>
            <b-table-column label>
              <b-tooltip
                type="is-light"
                label="История колесной пары"
                position="is-bottom"
              >
                <span class="icon" @click="showHistory(props.row.id)">
                  <i class="fas fa-file-alt fa-lg" />
                </span>
              </b-tooltip>
            </b-table-column>
          </template>
          <template slot="empty">
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                <p>Колесных пар нет.</p>
              </div>
            </section>
          </template>
        </b-table>
      </div> -->
      <infinite-loading
              :distance="50"
              :identifier="infinityIdentifier"
              @infinite="fetch"
      >
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </section>
    <back-to-top text="Back to top">
      <button type="button" class="btn-to-top">
        <i class="fa fa-chevron-up"></i>
      </button>
    </back-to-top>
  </div>
</template>

<script>
  import axios from 'axios'
  import api from '../api/api'
  import eventHub from '../event'
  import { mapGetters } from 'vuex'
  //import { paths } from 'config'
  //import { axiosMixin, convertMixin } from '../mixins'
  //import { orgsMixin, uiMixin } from '../configmixins'
  import utils from '../utils'

  var debounce = require('debounce')

  const filterCompanies = {
    filter(option) {
      for (var key in option) {
        if (
                option[key]
                        .toString()
                        .toLowerCase()
                        .indexOf(this) >= 0
        ) {
          return true
        }
      }
      return false
    }
  }

  export default {
    components: {
      // lazyModalHistory: () => import('./wheelsets/modals/itemHistory.vue'),
      // lazyModalView: () => import('./common/viewer/viewer.vue')
    },
    //mixins: [axiosMixin, convertMixin, orgsMixin, uiMixin],
    data() {
      return {
        wheelsets: [],
        searchAfterTimestamp: null,
        searchAfterId: null,
        searchAfterScore: null,
        infinityIdentifier: 0,

        isFetching: false,
        suggests: [],

        size: 10,
        count: 0,
        message: '',
        company: '',
        selectedCompany: null,
        showFilters: true,

        params: {
          id: null,
          owner_inn: null,
          owner_kpp: null,
          state: null,
          ws_type: null,
          rim_thickness_range: null,
          detail_tag: null,
          data_source: null,
          datefrom: null,
          dateto: null,
          storage_number: null
        }
      }
    },
    computed: {
      filteredCompanies() {
        const company = this.company.toLowerCase()
        return this.$store.state.references.RBCredentials.filter(filterCompanies.filter.bind(company))
      },
      isLoading() {
        return this.$store.state.ui.isLoading
      },
      checkedRows: {
        get() {
          return this.$store.state.ui.checkedRows
        },
        set(value) {
          this.$store.commit('checkRows', value)
        }
      }
    },
    watch: {
      // eslint-disable-next-line no-unused-vars
      $route(to, from) {
        this.refresh()
      },
      selectedCompany(company) {
        this.params.owner_inn = company ? company['ИНН'] : null
        this.params.owner_kpp = company ? company['КПП'] : null
      }
    },
    mounted() {
      //axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.profile.account.token}`
      this.params.state = 0
      this.params.ws_type = 0
      this.params.data_source = 0
      this.params.rim_thickness_range = 0
      this.params.detail_tag = 0

      eventHub.$on('refresh', () => this.refresh())

      this.refresh()
    },
    methods: {
      ...mapGetters([
        'typeCodeLookup',
        'stateCodeLookup',
        'rimthicknessCodeLookup'
      ]),
      showModalAdd() {
        eventHub.$emit('show_modal_add')
      },
      showWheelset(id) {
        eventHub.$emit('show_wheelset', id)
      },
      showHistory(id) {
        eventHub.$emit('SHOW_HISTORY_EVENT', id)
      },
      isValidRow(payload, state, op_code) {
        return (
                this.$store.getters.rimthicknessCodeLookup(payload.rim_thickness_range) &&
                this.$store.getters.operationCodeLookup(op_code) &&
                this.$store.getters.stateCodeLookup(state)
        )
      },
      refresh() {
        this.wheelsets = []
        this.searchAfterTimestamp = null
        this.searchAfterId = null
        this.searchAfterScore = null
        this.infinityIdentifier += 1
        this.$store.commit('checkRows', [])
      },
      getParams() {
        const params = {}
        for (var key in this.$data.params) {
          params[key] = this.$data.params[key] ? this.$data.params[key] : null
        }
        return params
      },
      fetch: debounce(function($state) {
        const params = this.getParams()
        params.search_after_timestamp = this.searchAfterTimestamp
        params.search_after_id = this.searchAfterId
        params.search_after_score = this.searchAfterScore
        params.size = this.size
        params.verbose = 1

        api.fetch('/rails', params, items => {
          const jdata = JSON.parse(items.data);
          console.log('JDATA:', jdata);
          if (jdata.length > 0) {
            this.searchAfterScore = jdata[jdata.length - 1].sort[0];
            this.searchAfterTimestamp = jdata[jdata.length - 1].sort[1];
            this.searchAfterId = jdata[jdata.length - 1].sort[2];

            const data = jdata.map(el => {
              return el._source; //.doc;
            });

            // const fixData = data.filter(el => {
            //   return el.payload;
            // });

            console.log("DATA:", data);

            this.wheelsets = Object.freeze(this.wheelsets.concat(data));
            this.count = items.count;
            $state.loaded()
          } else {
            $state.complete()
          }
        })
      }, 3000),
      async fetchAll() {
        const params = this.getParams()
        params.size = 5000
        params.verbose = true
        var result = []
        while (true) {
          params.search_after_timestamp = this.searchAfterTimestamp
          params.search_after_id = this.searchAfterId
          params.search_after_score = this.searchAfterScore
          var items = await axiosMixin.methods.fetch('/rails', params)
          const jdata = JSON.parse(items.data)
          if (jdata.length > 0) {
            this.searchAfterScore = jdata[jdata.length - 1].sort[0]
            this.searchAfterTimestamp = jdata[jdata.length - 1].sort[1]
            this.searchAfterId = jdata[jdata.length - 1].sort[2]

            const src = jdata.map(el => {
              return el._source.doc
            })
            result = result.concat(src)
          } else {
            break
          }
        }
        return result
      },
      // eslint-disable-next-line func-names
      idSuggest: debounce(function(name) {
        if (!name.length) {
          this.suggests = []
          return
        }
        const params = {
          id: name,
          size: 100
        }
        this.getSuggests(params)
      }, 5),
      // eslint-disable-next-line func-names
      locationSuggest: debounce(function(name) {
        if (!name.length) {
          this.suggests = []
          return
        }
        const params = {
          storage_number: name,
          size: 100
        }
        this.getSuggests(params)
      }, 5),
      // eslint-disable-next-line func-names
      companySuggest: debounce(function(name) {
        if (!name.length) {
          this.suggests = []
          return
        }
        const params = {
          owner_name: name,
          owner_inn: name,
          owner_kpp: name,
          size: 100
        }
        this.getSuggests(params)
      }, 5),
      getSuggests(params) {
        this.isFetching = true
        const url = utils.elasticURL + paths.wheelsets_suggest
        return axios
                .get(url, { params })
                .then(response => {
                  this.suggests = []
                  const data = response.data
                  const json = JSON.parse(data.suggestions)

                  this.suggests = Object.freeze(json)
                  // forEach(item => this.suggest.id.push(item))
                })
                .catch(error => {
                  this.suggests = []
                  throw error
                })
                .finally(() => {
                  this.isFetching = false
                })
      },
      beforeGenerate() {
        this.message =
                '<i class="fas fa-spinner fa-spin"></i>&nbsp;&nbsp;Загрузка может занять длительное время. Ожидайте...'
        this.$notification.open({
          type: 'is-red',
          message: this.message,
          position: 'is-bottom-right',
          indefinite: true
        })
      },
      beforeFinish() {
        document
                .querySelector('body > div.notices.is-bottom > article > button')
                .click()
      }
    }
  }
</script>
