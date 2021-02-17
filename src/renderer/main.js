import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vuetifyMessage from 'vuetify-message-snackbar'

import vueElectron from 'vue-electron'

import '@/assets/css/global.less'

import appConfig from '../config/config'
document.title = appConfig.appName

if (!process.env.IS_WEB) Vue.use(vueElectron)
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(vuetifyMessage)
new Vue({
  vuetify,
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
