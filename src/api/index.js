import Vue from 'vue'
import {
  LoginApi,
  RegApi,
  OrdersListApi
} from './resource'

export default {
  /**
   * @name post登录
   * @method post
   * @param 账号、密码
   * @returns status:success
   */
  postLogin(account, password) {
    return Vue.prototype.$http.post(LoginApi)
  },

  /**
   * @name post注册
   * @method post
   * @param 账号、密码、手机号
   * @returns status:success
   */
  postReg(account, password, cellphone) {
    return Vue.prototype.$http.post(RegApi)
  },

  /**
   * @name post获取订单列表
   * @method post
   * @returns status:success
   */
  postOrdersList(query = {}) {
    return Vue.prototype.$http.post(OrdersListApi, query)
  }
}
