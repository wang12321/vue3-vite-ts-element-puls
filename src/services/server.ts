import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'

const service: AxiosInstance = axios.create({
  headers: {}
})
// request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something before request is sent
    return config
  },
  (error: AxiosError) => {
    // do something with request error
    return Promise.resolve(error)
  }
)

// 响应拦截器
// response interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    if (Number(res.errno) !== 0) {
      ElMessage({
        message: '响应拦截：' + res.errmsg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })

      // sentry预留位置1 ---- 请不要删除
      return Promise.resolve(new Error(res.message || 'Error'))
    } else {
      return Promise.resolve(res)
    }
  },
  (error: AxiosError) => {
    ElMessage({
      message: `${error.config.url}响应失败，请刷新浏览器重试。原因${error}`,
      type: 'error',
      duration: 3 * 1000
    })
    // sentry预留位置2 ---- 请不要删除
    return Promise.resolve(error)
  }
)
export default service
