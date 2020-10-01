import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import EmailValidator from 'email-validator'
import ru from 'vee-validate/dist/locale/ru'

const alphaDash = {
  en: /^[0-9A-Z_-]*$/i,
  ru: /^[0-9А-ЯЁ_-]*$/i
}

function num2str(n0, text_forms) {
  const n = Math.abs(n0) % 100
  const n1 = n % 10
  if (n > 10 && n < 20) {
    return text_forms[2]
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1]
  }
  if (n1 === 1) {
    return text_forms[0]
  }
  return text_forms[2]
}
const dictionary = {
  ru: {
    messages: {
      digits(n, e) {
        const ending = num2str(e[0], ['цифру', 'цифры', 'цифр'])
        return `Поле ${n} должно быть числовым и содержать ровно ${e[0]} ${ending}.`
      }
    }
  }
}

const customRules = {
  companyCode: {
    // eslint-disable-next-line no-unused-vars
    getMessage(field) {
      return 'Должно быть указано одно из Предприятий, содержащихся в справочнике'
    },
    validate(value, company) {
      return company && (typeof company.id !== 'undefined' || typeof company['Имя организации'] !== 'undefined')
    }
  },
  notBeforeYear: {
    // eslint-disable-next-line no-unused-vars
    getMessage(field) {
      return 'Дата ПО не должна быть ранее года изготовления'
    },
    validate(value, year) {
      return value.getFullYear() >= year[0]
    }
  },
  repeat: {
    // eslint-disable-next-line no-unused-vars
    getMessage(field) {
      return 'Пароли должны совпадать'
    },
    validate(value, secret) {
      return value.secret() != secret
    }
  },
  // Link https://stackoverflow.com/a/50054557
  alphaDashOrEmail: {
    // Vee-Validate rules given as 'required|alpha_dash|email' are AND-based, therefore we need this custom rule as Stack Overflow answer cited above suggests, for OR operand
    getMessage() {
      return 'Введите адрес электронной почты или сочетание букв, цифр, дефиса, знака подчеркивания. Например: ivan.ivanov@center.rzd, ivan-ivanov23, ИВАН_Иванов'
    },
    validate(value) {
      return alphaDash.en.test(value) || alphaDash.ru.test(value) || EmailValidator.validate(value)
    }
  },
  verifyPassword: {
    getMessage() {
      return 'Пароль должен содержать хотя бы 1 букву верхнего регистра, 1 букву нижнего регистра, 1 цифру, и один специальный символ (Напр, . _ & ? и т.д.)'
    },
    validate(value) {
      var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#\\$%&\'()\\*\\+,-./:;<=>\\?@[\\]\\^_`{|}~])(?=.{8,})')
      return strongRegex.test(value)
    }
  },
  verifyEmail: {
    getMessage() {
      return 'Введите валидный адрес электронной почты'
    },
    validate(value) {
      return EmailValidator.validate(value)
    }
  },
  verifyPhone: {
    getMessage() {
      return 'Введенный номер телефона некорректен'
    },
    validate(value) {
      var strongRegex = new RegExp('^[+]?[0-9]{0,3}[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s./0-9]*$')
      return strongRegex.test(value)
    }
  }
}

export default {
  setup() {
    Vue.use(VeeValidate, {
      fieldsBagName: 'formFields',
      classes: true,
      classNames: {
        invalid: 'is-danger',
      }
    })

    ru.messages = { ...ru.messages, ...dictionary.ru.messages }
    Validator.localize('ru', ru)

    Validator.extend('companyCode', customRules.companyCode)
    Validator.extend('alphaDashOrEmail', customRules.alphaDashOrEmail)
    Validator.extend('notBeforeYear', customRules.notBeforeYear, { hasTarget: true })
    Validator.extend('verifyPassword', customRules.verifyPassword)
    Validator.extend('verifyEmail', customRules.verifyEmail)
    Validator.extend('verifyPhone', customRules.verifyPhone)
  }
}
