// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from '@/api/axios'
import App from './App'
import router from './router'
import store from './vuex/index'
import Vuetify from 'vuetify'
import infiniteScroll from 'vue-infinite-scroll'
import lrz from 'lrz'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// 导入vuetify组件库的颜色配置文件
import colors from 'vuetify/es5/util/colors'
import './assets/style/main'
// 全局使用vuetify组件库
Vue.use(Vuetify, {
  theme: {
    primary: colors.purple.lighten2, // #E53935
    secondary: colors.blue.lighten2, // #FFCDD2
    accent: colors.indigo.lighten2 // #3F51B5
  },
  lang: {
    locales: 'zh-cn',
    current: 'zh-cn'
  }
})
// 全局使用infiniteScroll无限滚动组件
Vue.use(infiniteScroll)
// 全局定义Vue原型链get和post数据方法
Vue.prototype.getData = axios.getData
Vue.prototype.postData = axios.postData
// 全局定义图片裁切方法
Vue.prototype.lrz = lrz
//
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
