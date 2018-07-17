// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './vuex/index'
import Vuetify from 'vuetify'
import infiniteScroll from 'vue-infinite-scroll'
import lrz from 'lrz'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// Helpers
import colors from 'vuetify/es5/util/colors'
import './assets/style/main'

Vue.use(Vuetify, {
  theme: {
    primary: colors.purple.lighten2, // #E53935
    secondary: colors.blue.lighten2, // #FFCDD2
    accent: colors.indigo.lighten2 // #3F51B5
  }
})
Vue.use(infiniteScroll)
Vue.prototype.$http = axios
Vue.prototype.lrz = lrz

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
