// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_zonst_token'

export function getToken(): string {
  return Cookies.get(TokenKey)
}

export function setToken(token: string): string {
  return Cookies.set(TokenKey, token)
}

export function removeToken(): string {
  return Cookies.remove(TokenKey)
}
