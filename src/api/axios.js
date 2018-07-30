import axios from 'axios'
import qs from 'qs'

export const commonParams = {}

const instance = axios.create({
  baseURL: 'http://yapi.demo.qunar.com/mock/14630',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
})

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

/**
 * 拦截响应response，并做一些错误处理
 */
instance.interceptors.response.use((response) => {
  const data = response.data
  // console.info('response', response)
  if (data) {
    switch (data.status) {
      case '0':
        // 处理相关业务
        return data
      // 需要重新登录
      case '0005':
        // 写相关需要登录的代码
        // location.replace(`/user/login?${search}`)
        // 不显示提示消息
        data.message = ''
        break
      default:
    }
    return response
  } else {
    const err = new Error('未知错误，请重试')
    err.data = data
    err.response = response
    throw err
  }
// 根据返回的code值来做不同的处理（和后端约定）
}, function (err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求参数错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '跨域拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }
  return Promise.reject(err)
})

export default axios

/**
 * get请求
 * @param urlLink
 * @param param
 * @returns {Promise<AxiosResponse>}
 */
export function getData(urlLink, param) {
  const url = urlLink
  const data = Object.assign({}, commonParams, param)

  return instance.get(url, {
    params: data,
    timeout: 5000
  })
    .then((res) => {
      console.info('then', res)
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
      console.info('error', error)
      return Promise.resolve(error.data)
    })
}

/**
 * post请求
 * @param urlLink
 * @param param
 * @returns {Promise<AxiosResponse>}
 */
export function postData(urlLink, param) {
  const data = Object.assign({}, commonParams, param)
  return instance.post(urlLink, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
      console.info('postDataerror', error)
      return Promise.resolve(error)
    })
}
