import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index'
import orders from '@/views/orders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/orders',
      name: 'orders',
      component: orders
    }
  ]
})
