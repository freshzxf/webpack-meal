import * as types from '../mutation-types'
import API from '@/api/index'

const state = {
  ordersList: [],
  busy: false
}

const getters = {
  // orders: state => state.orders,
  // order: state => state.order
  // needPayOrders: state => state.needPayOrders,
  // needSeedOrders: state => state.needSeedOrders,
  // needGetOrders: state => state.needGetOrders,
  // needCommentOrders: state => state.needCommentOrders,
  // needServiceOrders: state => state.needServiceOrders
}

const mutations = {
  [types.UPDATE_ORDERSLIST](state, payload) {
    state.ordersList = payload.ordersList
  },
  [types.UPDATE_LOADINGSTATE](state, payload) {
    state.busy = payload.busy
  }
}

const actions = {
  // 异步获取订单列表数据
  async initList({commit, state}, param) {
    // 修改busy值，进入加载状态
    commit({
      type: types.UPDATE_LOADINGSTATE,
      busy: true
    })
    // 异步修改shop对象
    let ajaxOrdersList
    API.postOrdersList(param).then((result) => {
      if (result.data.data && result.data.data.length) ajaxOrdersList = result.data.data
      // commit执行的是mutaions中对应的修改公共state的方法（根据type值寻找，并传入载荷对象参数进行修改）
      commit({
        type: types.UPDATE_ORDERSLIST,
        // 以下为es6中键值重名的缩写
        ordersList: param.refresh ? ajaxOrdersList : state.ordersList.concat(ajaxOrdersList)
      })
      // 修改busy值，关闭加载状态
      commit({
        type: types.UPDATE_LOADINGSTATE,
        busy: false
      })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
