import axios from 'axios'
import { getToken } from '@/utils/auth'

axios.defaults.timeout = 3600000
axios.defaults.baseURL = import.meta.env.VITE_GLOB_BASE_URL

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = getToken() || ''
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    return Promise.reject(error)
  }
)

// get 方法封装
export const get = (url, params = {}) =>
  new Promise((resolve, reject) =>
    axios
      .get(url, { params })
      .then(response => resolve(response.data))
      .catch(reject)
  )

// post 方法封装
export const post = (url, data = {}) =>
  new Promise((resolve, reject) => {
    axios.post(url, { data }).then(response => resolve(response.data), reject)
  })

// 下载封装
export const exportFile = (url, params = {}) =>
  new Promise((resolve, reject) => {
    axios.get(url, { params, responseType: 'blob' }).then(resolve).catch(reject)
  })

// post 附件上传
export const upload = (url, data = {}, contentType = 'application/json') =>
  new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      data,
      headers: { 'Content-Type': contentType }
    }).then(response => resolve(response.data), reject)
  })
