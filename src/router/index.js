import Vue from 'vue'
import Router from 'vue-router'
// import index from '@/views/index/index'

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
      path: '/test/test',
      name: 'test',
      components: {
        'default': resolve => require(['@/views/dining/index'], resolve),
        'subPage': resolve => require(['@/views/test/index'], resolve)
      }
    }
  ]
})
