/**
 * @author ff
 * @date 2021/10/28
 * @Description: 配置get post put delete 可自定义方法扩展
 * @update by:
 */
import server from './server'
import { AxiosPromise, AxiosRequestConfig } from 'axios'

const request = {
  /**
   * methods: 请求
   * @param url 请求地址
   * @param params 请求参数
   */
  get(url: string, params: Record<string, unknown>): AxiosPromise {
    const config = {
      method: 'get',
      url: url
    } as AxiosRequestConfig
    if (params) config.params = params
    return server(config)
  },
  post(url: string, params: Record<string, unknown>): AxiosPromise {
    const config = {
      method: 'post',
      url: url
    } as AxiosRequestConfig
    if (params) config.data = params
    return server(config)
  },
  put(url: string, params: Record<string, unknown>): AxiosPromise {
    const config = {
      method: 'put',
      url: url
    } as AxiosRequestConfig
    if (params) config.params = params
    return server(config)
  },
  patch(url: string, params: Record<string, unknown>): AxiosPromise {
    const config = {
      method: 'patch',
      url: url
    } as AxiosRequestConfig
    if (params) config.data = params
    return server(config)
  },
  delete(url: string, params: Record<string, unknown>): AxiosPromise {
    const config = {
      method: 'delete',
      url: url
    } as AxiosRequestConfig
    if (params) config.params = params
    return server(config)
  }
}
export default request
