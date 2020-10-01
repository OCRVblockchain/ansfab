<template>
  <section class="main-section">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <div class="inline-box">
              <div class="content">
                <h1>Авторизация</h1>
              </div>

              <div class="field">
                <p class="control">
                  <label class="label">Имя пользователя</label>
                  <input class="input" type="text" />
                </p>
              </div>

              <div class="field">
                <p class="control">
                  <label class="label">Сертификат</label>
                  <input v-model="certificate" class="input" type="text" />
                </p>
              </div>

              <div class="field">
                <p class="control">
                  <label v-model="privateKey" class="label">Приватный ключ</label>
                  <input class="input" type="password" />
                </p>
              </div>

              <div class="field is-grouped is-grouped-right">
              <p class="control">
                <button class="button is-link">Вход</button>
              </p>
              </div>

            </div>
          </div>
        </div>
<!--      </div>-->
<!--        <div v-if="msg" class="columns">-->
<!--          <div class="column is-6 is-offset-3">-->
<!--            <div id="ERR_LABEL_ID" class="notification">-->
<!--              <button class="delete" @click="msg = ''" />-->
<!--              {{ msg }}-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      </div>
  </section>
</template>

<script>
//import { paths } from 'config'
//import { orgsMixin, uiMixin } from '../configmixins'
//import { axiosMixin } from '../mixins'

const { Wallets } = require('fabric-network');
const path = require('path');

export default {
  //mixins: [axiosMixin, orgsMixin, uiMixin],
  data() {
    return {
      certificate: '',
      privateKey: '',
      msg: '',
      showHelp: false,
      // eslint-disable-next-line no-undef
      envOrg: process.env.org
    }
  },
  mounted() {
    // This.$cookies.set('ws-cookie', this.authForm)
    this.authForm.org = this.orgs.rzd.chainName
  },
  methods: {
    async login() {
      // (async () => {
      //   try {
      //     const account = await this.post(paths.login, {
      //       identity: this.authForm.identity,
      //       org: this.authForm.org,
      //       secret: this.authForm.secret
      //     })
      //     await this.$store.commit('updateAccount', account)
      //     this.$router.push('/')
      //   } catch (e) {
      //     var msg = 'Неверный логин или пароль'
      //     if (e.response) {
      //       if (e.response.data.text.includes('user is blocked')) {
      //         msg = 'Доступ приостановлен, свяжитесь с администратором'
      //       } else if (e.response.data.text.includes('account is expired')) {
      //         msg =
      //           'Срок действия учетной записи истек, свяжитесь с администратором'
      //       }
      //     }
      //     this.msg = msg
      //   }
      // })()
    },
    // resetPassword() {
    //   const id = this.authForm.identity
    //   if (id === 'admin' || id === 'worker') {
    //     this.danger(`Неприменимо к пользователю ${id}`)
    //     return
    //   }
    //   (async () => {
    //     await this.patch([paths.users, id, 'reset'].join('/'), {})
    //     this.msg =
    //       'Ссылка на восстановление пароля отправлена на email указанного пользователя! Если ссылка не пришла, обратитесь к администратору.'
    //   })()
    // },
    // displayHelp() {
    //   this.showHelp = !this.showHelp
    //   this.msg = ''
    // }
  }
}
</script>


