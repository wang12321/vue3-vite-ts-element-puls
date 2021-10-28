/**
 * @author ff
 * @date 2021/10/28
 * @Description: 接口请求配置按模块划分
 * @update by:
 */

import request from './request'
import apiURL from './apiURL'
const BASE_API: string = import.meta.env.VITE_APP_BASE_API as string
const accounts: Record<string, string> = (<keyType>apiURL)[BASE_API]
import { AxiosPromise } from 'axios'

// 模块划分
const userUrl = accounts['user']

export const user = {
  // mock 数据
  login(params: Record<string, unknown>): AxiosPromise {
    return request.post(`${userUrl}/user/login`, params)
  },
  getInfo(params: Record<string, unknown>): AxiosPromise {
    return request.post(`${userUrl}/user/info`, params)
  },
  logout(params: Record<string, unknown>): AxiosPromise {
    return request.post(`${userUrl}/user/logout`, params)
  }
}

export default {
  user
}
