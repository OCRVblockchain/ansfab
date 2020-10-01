<template>
  <div>
    <lazy-modal-add />
<!--    <lazy-modal-add-proposal />-->
<!--    <lazy-modal-do-operation />-->
<!--    <lazy-modal-secret />-->
  <header class="header">
    <nav class="navbar is-primary is-fixed-top">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="#" style="font-weight:bold;">РРД РЕЛЬСЫ</a>
          <span class="navbar-burger burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': showNav }">
          <div class="navbar-start">
            <router-link to="/wheelsets" class="navbar-item" @click.native="scrollTop">
              Обозреватель
            </router-link>
            <router-link to="/proposals" class="navbar-item" @click.native="scrollTop">
              Маркет
            </router-link>
            <router-link to="/refbooks" class="navbar-item" @click.native="scrollTop">
              Документы
            </router-link>
          </div>
        </div>
        <div class="navbar-end">
          <span class="navbar-item">
              <a @click="logout" class="button is-link">Выход</a>
<!--              <a v-else @click="" class="button is-link">Вход</a>-->
            </span>
          <!--<span class="navbar-item">
            <p class="control has-text-right">
                  <b-dropdown hoverable aria-role="list">
                    <button slot="trigger" class="red-button">
                      <i class="fas fa-plus-square"></i>&nbsp;Создать
                      <i class="fas fa-caret-down" aria-hidden="true" />
                    </button>

                    <b-dropdown-item
                            aria-role="listitem"
                            @click="showAddWheelset"
                    >
                      Новая колесная пара
                    </b-dropdown-item>
                    <hr class="dropdown-divider" />
                    <b-dropdown-item
                            aria-role="listitem"
                            @click="newSellProposal"
                    >
                      Новая заявка на продажу
                    </b-dropdown-item>
                    <b-dropdown-item
                            aria-role="listitem"
                            @click="newBuyProposal"
                    >
                      Новая заявка на покупку
                    </b-dropdown-item>
                  </b-dropdown>
                </p>

          </span>-->
        </div>
      </div>
    </nav>
  </header>
  </div>
</template>

<script>
//import { paths, jpegExtension, navbarClassName } from 'config'
//import { orgsMixin, uiMixin, usersMixin } from '../configmixins.js'
import eventHub from '../event.js'

export default {
  components: {
    lazyModalAdd: () => import('./add.vue'),
    // lazyModalAddProposal: () => import('./proposals/modals/addProposal.vue'),
    // lazyModalDoOperation: () => import('./wheelsets/modals/doOperation.vue'),
    // lazyModalSecret: () => import('./users/modals/secret.vue')
  },
  // mixins: [orgsMixin, uiMixin, usersMixin],
  data() {
    return {
      showModalAddWheelset: false,
      showNav: false
      //paths
    }
  },
  computed: {
    account() {
      return this.$store.state.profile.account
    }
  },
  mounted() {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    )
    // Navbar burger
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          const target = el.dataset.target
          const $target = document.getElementById(target)
          el.classList.toggle('is-active')
          $target.classList.toggle('is-active')
        })
      })
    }
    // Fixed-top navbar
    // var nav = document.getElementsByClassName(navbarClassName)[0]
    // window.onscroll = function onscroll() {
    //   var bodyScrollTop =
    //     document.documentElement.scrollTop || document.body.scrollTop
    //   if (bodyScrollTop > 0) {
    //     nav.classList.add('nav-shadow')
    //   } else {
    //     nav.classList.remove('nav-shadow')
    //   }
    // }
  },
  methods: {
    refresh() {
      this.$store.commit('setIsLoading', false)
      this.$router.go(0)
    },
    logout() {
      this.$store.commit('updateAccount', '')
      this.$router.push('/login')
    },
    showDoOperation() {
      if (this.$store.state.ui.checkedRows.length !== 1) {
        this.danger('Необходимо выбрать одну колесную пару')
        return
      }
      eventHub.$emit(
        'show_operation',
        this.$store.state.ui.checkedRows[0].id
      )
    },
    showChangeSecret() {
      eventHub.$emit('SHOW_SECRET_CHANGE')
    },
    newSellProposal() {
      try {
        this.$store.state.ui.checkedRows.forEach(item => {
          if (!this.isMyItem(item.payload)) {
            throw 'Продавать можно только свои детали'
          }
        })
      } catch (e) {
        this.danger(String(e))
        return
      }
      eventHub.$emit('NEW_SELL_PROP_EVENT', this.$store.state.ui.checkedRows)
    },
    newBuyProposal() {
      try {
        const onlyOneOwner =
          this.$store.state.ui.checkedRows.length > 0 &&
          this.$store.state.ui.checkedRows[0].payload.owner_name
        this.$store.state.ui.checkedRows.forEach(item => {
          if (item.payload.owner_name !== onlyOneOwner) {
            throw 'Заявка может содержать детали только одного контрагента'
          }
          if (this.isMyItem(item.payload)) {
            throw 'Покупать можно только чужие детали'
          }
        })
      } catch (e) {
        this.danger(String(e))
        return
      }
      eventHub.$emit('NEW_BUY_PROP_EVENT', this.$store.state.ui.checkedRows)
    },
    isMyItem(payload) {
      return (
        payload.owner_name === this.activeOrg ||
        this.orgs[this.activeOrg.toLowerCase()].inn === payload.owner_inn
      )
    },
    // getLogoPath(pic) {
    //   return [paths.images, pic].join('/') + jpegExtension
    // },
    toggleBurger() {
      const navbarMenu = document.getElementsByClassName('navbar-menu')[0]
      navbarMenu.classList.remove('is-active')
      const navbarBurger = document.getElementsByClassName('navbar-burger')[0]
      navbarBurger.classList.remove('is-active')
    },
    scrollTop() {
      window.scrollTo(0, 0)
    }
  }
}
</script>
