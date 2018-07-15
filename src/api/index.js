import Vue from 'vue'
import {
  LoginApi,
  RegApi,
  OrdersListApi
} from './resource'

export default {
  /**
   * @name 测试代理跨域
   * @desc 在webpack.dev.conf.js中配置proxy
   * @desc 将请求本地服务器（同源）的接口由本地服务器代理发送请求至目标服务器（服务器端发送的任何请求不存在跨域限制）
   */
  testProxy(path) {
    return Vue.prototype.$http.get(path)
  },
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
