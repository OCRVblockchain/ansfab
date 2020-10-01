import {
  orgs, uiPrefs,
} from 'config'
import { systemUsers } from './keydict.js'

export var uiMixin = {
  data() {
    const today = new Date()
    return {
      uiPrefs,
      dayNames: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      minDate: new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()),
      maxDate: new Date(today.getFullYear() + 5, today.getMonth(), today.getDate()),
      json_fields_item_history: {
        'Идентификатор': 'id',
        'Тип объекта': {
          field: 'objectType',
          callback: value => {
            switch (value) {
              case 'wheelset':
                return 'Колесная пара'
              case 'wheel':
                return 'Колесо'
              case 'axle':
                return 'Ось'
              case 'axlebox':
                return 'Буксовый узел'
            }
          },
        },
        'Расположение': 'payload.storage_number',
        'Состояние': {
          field: 'payload.state',
          callback: value => this.$store.getters.stateCodeLookup(Number(value)),
        },
        'Тип КП': {
          field: 'payload.ws_type',
          callback: value => this.$store.getters.typeCodeLookup(value),
        },
        'Характеристика': {
          field: 'payload.rim_thickness_range',
          callback: value => this.$store.getters.rimthicknessCodeLookup(value),
        },
        'Место ПО': {
          field: 'payload.full_examin_plant',
          callback: value => this.$store.getters.companyCodeLookup(value),
        },
        'Дата ПО': {
          field: 'payload.full_examin_date',
          callback: value => this.convertItemFull_examin_date(value),
        },
        'Последняя операция': {
          field: 'payload.op_code',
          callback: value => this.$store.getters.operationCodeLookup(Number(value)),
        },
        'Дата последней операции': {
          field: 'payload.operation_date',
          callback: value => this.convertItemOperation_date(value),
        },
        Собственник: 'payload.owner_name',
        'ИНН cобственника': 'payload.owner_inn',
        'КПП cобственника': 'payload.owner_kpp',
        'Источник данных': {
          field: 'payload.data_source',
          callback: value => this.$store.getters.dataSourceCodeLookup(value),
        },
      },
      json_fields_item: {
        'Идентификатор': 'id',
        'Тип объекта': {
          field: 'objectType',
          callback: value => {
            switch (value) {
              case 'wheelset':
                return 'Колесная пара'
              case 'wheel':
                return 'Колесо'
              case 'axle':
                return 'Ось'
              case 'axlebox':
                return 'Буксовый узел'
            }
          },
        },
        'Расположение': 'payload.storage_number',
        'Состояние': {
          field: 'state',
          callback: value => this.$store.getters.stateCodeLookup(Number(value)),
        },
        'Тип КП': {
          field: 'payload.ws_type',
          callback: value => this.$store.getters.typeCodeLookup(value),
        },
        'Характеристика': {
          field: 'payload.rim_thickness_range',
          callback: value => this.$store.getters.rimthicknessCodeLookup(value),
        },
        'Место ПО': {
          field: 'payload.full_examin_plant',
          callback: value => this.$store.getters.companyCodeLookup(value),
        },
        'Дата ПО': {
          field: 'payload.full_examin_date',
          callback: value => this.convertItemFull_examin_date(value),
        },
        'Последняя операция': {
          field: 'op_code',
          callback: value => this.$store.getters.operationCodeLookup(Number(value)),
        },
        'Дата последней операции': {
          field: 'payload.operation_date',
          callback: value => this.convertItemOperation_date(value),
        },
        Собственник: 'payload.owner_name',
        'ИНН cобственника': 'payload.owner_inn',
        'КПП cобственника': 'payload.owner_kpp',
        'Источник данных': {
          field: 'payload.data_source',
          callback: value => this.$store.getters.dataSourceCodeLookup(value),
        }
      },
      json_fields_proposal: {
        'Идентификатор': 'id',
        'Тип объекта': {
          field: 'objectType',
          callback: value => {
            switch (value) {
              case 'proposal':
                return 'Заявка'
            }
          }
        },
        'Тип заявки': {
          field: 'payload.type',
          callback: value => {
            switch (value) {
              case 'BUY':
                return 'Покупка'
              case 'SELL':
                return 'Продажа'
              case 'TACKLE':
                return 'Подкатка'
            }
          }
        },
        'Объекты заявки': 'payload.objectsId',
        'Получатель заявки': 'payload.receiver',
        'ИНН получателя заявки': 'payload.receiverInn',
        'Отправитель заявки': 'payload.sender',
        'ИНН отправителя заявки': 'payload.senderInn',
        'Статус': 'payload.state',
        'Создана': 'createdAt',
        'Обновлена': 'updatedAt'
      }
    }
  },
  methods: {
    danger(msg) {
      this.$toast.open({
        message: msg,
        type: 'is-red',
        duration: 5000,
      })
    },
    success(msg) {
      this.$toast.open({
        message: msg,
        type: 'is-success',
        duration: 5000,
      })
    },
    gridReload() {
      this.$store.commit('setDetails', [])
      this.$store.commit('updateInfinityId')
      this.$store.commit('setBookmark', null)
      this.$store.commit('setSearchAfterTimestamp', null)
      this.$store.commit('setSearchAfterID', null)
      this.$store.commit('checkRows', [])
    },
    labelForSzha(text, company) {
      if (!company) {
        return text
      }
      const codePart = typeof company.id === 'undefined'
        ? ''
        : ` выбрано клеймо: ${company.id}`
      return `${text}${codePart}`
    },
    highlightNeedle(text, needle) {
      if (needle.length <= text.length) {
        const pos = text.indexOf(needle)
        if (pos < 0) {
          return text
        }
        const part0 = text.substr(0, pos)
        const part1 = text.substr(pos, needle.length)
        const part2 = text.substr(pos + needle.length)
        return `${part0}<strong>${part1}</strong>${part2}`
      }
      return text
    },
    lastLoginTime(time) {
      const diffInTime = new Date() - new Date(time)
      const diffInDays = diffInTime / (1000 * 3600 * 24)
      if (diffInDays > 7) {
        return 'Отсутствовал больше недели'
      }
      return this.convertUserLastLoginTime(time)
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('ru-RU')
    }
  },
}

export var usersMixin = {
  data() {
    return {
    }
  },
  computed: {
    account() {
      return this.$store.state.profile.account
    }
  },
  methods: {
    isSystemUser(id) {
      if (systemUsers.indexOf(id) === -1) {
        return false
      }
      return true
    }
  }
}

const year = new Date().getFullYear()

export var yearsMixin = {
  data() {
    return {
      year,
      years: Array.from(Array(year - 1949).keys()).map(x => year - x),
      minDate: year - 100
    }
  },
}

export var orgsMixin = {
  data() {
    return {
      orgs,
    }
  },
  methods: {
    shortenOrg(name) {
      if (!name) {
        return ''
      }
      if (name.length > 35) {
        return `${name.slice(0, 34)}...`
      }
      return name
    },
  },
  computed: {
    activeOrg() {
      if (this.$store.state.profile.account) {
        return this.$store.state.profile.account.org
      }
      return ''
    },
  },
}
