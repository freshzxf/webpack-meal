import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index'
import orders from '@/views/orders'
import phones from '@/views/phones'
import mine from '@/views/mine'
import test from '@/views/test'

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
    },
    {
      path: '/phones',
      name: 'phones',
      component: phones
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/test/test',
      name: 'test',
      components: {
        'default': index,
        'subPage': test
      }
    }
  ]
})
