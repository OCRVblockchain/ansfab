import Vue from 'vue'
import Buefy from 'buefy'
import VueRouter from 'vue-router'
// import Vuelidate from 'vuelidate'
import InfiniteLoading from 'vue-infinite-loading'
import BackToTop from 'vue-backtotop'
// import JsonExcel from 'vue-json-excel'
import store from './store'
import i18n from './i18n'

import App from './App.vue'

import "buefy/dist/buefy.css"
require("./css/mystyles.scss")

// require('./images/wheelsets.png')
require('./images/whitenoise.png')
// require('./images/zammad-icon.png')
// require('./images/icons/icon-152x152.png')
// require('./images/icons/icon-192x192.png')
// require('./images/icons/icon-512x512.png')
// require('./modernizr-custom.js')

import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

const routes = [
  // { path: '/signup', component: () => import('./components/signup.vue'), meta: { requiresAuth: false, breadcrumb: 'Регистрация' } },
  // {
  //   path: '/login',
  //   component: () => import('./components/login.vue'),
  //   meta: { requiresAuth: false }
  // },
  // {
  //   path: '/password',
  //   component: () => import('./components/auth/password.vue'),
  //   meta: { requiresAuth: true, breadcrumb: 'Смена пароля' }
  // },
  {
    path: '/rails',
    component: () => import('./components/rails.vue'),
    meta: { requiresAuth: false }
  },
  // {
  //   path: '/proposals/:state',
  //   component: () => import('./components/proposals/proposals.vue'),
  //   meta: { requiresAuth: true, breadcrumb: 'Заявки' }
  // },
  // {
  //   path: '/refbooks/:state',
  //   component: () => import('./components/refbooks/refbooks.vue'),
  //   meta: { requiresAuth: true, breadcrumb: 'Справочники' }
  // },
  // {
  //   path: '/users',
  //   component: () => import('./components/users/users.vue'),
  //   meta: {
  //     requiresAuth: false,
  //     adminOnly: true,
  //     breadcrumb: 'Пользователи'
  //   }
  // },
  // {
  //   path: '/invite/:code',
  //   component: () => import('./components/users/invite.vue'),
  //   meta: { requiresAuth: false, breadcrumb: 'Приглашение' }
  // },
  // {
  //   path: '/journal',
  //   component: () => import('./components/app/journal.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     adminOnly: true,
  //     breadcrumb: 'Журнал доступа'
  //   }
  // },
  // { path: '/refbooks', redirect: '/refbooks/szha' },
  // { path: '/proposals', redirect: '/proposals/onsale' },
  { path: '*', redirect: '/rails' }
]

const router = new VueRouter({
  // Mode: 'history',
  routes,
  linkActiveClass: 'is-active'
})

//router.beforeEach((to, from, next) => {
//  if (store.state.profile.account && to.path != '/password' && !store.state.profile.account.
// ) {
//    next('/password')
//    return
//  }
//  if (to.meta.adminOnly) {
//    if (store.state.profile.account && !store.state.profile.account.is_admin) {
//      next(from.path)
//      return
//    }
//  }
//  if (to.meta.requiresAuth) {
//    if (store.state.profile.account) {
//      next()
//    } else {
//      next('/login')
//    }
//  } else {
//    if (
//      store.state.profile.account &&
//      (to.path === '/signup' || to.path === '/login')
//    ) {
//      next(from.path)
//      return
//    }
//    next()
//  }
//})

//Vue.component('downloadExcel', JsonExcel)

//Vue.use(Vuelidate)
Vue.use(Buefy)
Vue.use(VueRouter)
Vue.use(InfiniteLoading, {})
Vue.use(BackToTop)

new Vue({
  i18n,
  store,
  router,
  el: '#app',
  render: h => h(App)
})
