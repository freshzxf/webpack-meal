import Vue from 'vue'
import Router from 'vue-router'
import none from '@/views/error/none'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/views/index/index'], resolve)
    },
    {
      path: '/orders',
      name: 'orders',
      component: resolve => require(['@/views/orders/index'], resolve)
    },
    {
      path: '/orders/order',
      name: 'ordersOrder',
      components: {
        subPage: resolve => require(['@/views/orders/order'], resolve)
      }
    },
    {
      path: '/phones',
      name: 'phones',
      component: resolve => require(['@/views/phones/index'], resolve)
    },
    {
      path: '/mine',
      name: 'mine',
      component: resolve => require(['@/views/mine/index'], resolve)
    },
    {
      path: '/dining',
      name: 'dining',
      component: resolve => require(['@/views/index/index'], resolve)
    },
    {
      path: '*',
      component: none
    }
  ]
})
