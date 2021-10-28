import { constantRoutes, asyncRouterMap, docsRouter } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { ActionTree, GetterTree, MutationTree } from 'vuex'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route.meta && route.meta.permissionArray) {
    return roles.some((role) => {
      if (route.meta?.permissionArray !== undefined) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return route.meta.permissionArray.includes(role)
      }
    })
  } else {
    return true
  }
}

// 左侧菜单排序
const compare = function (prop: string) {
  return function (obj1: RouteRecordRaw, obj2: RouteRecordRaw): number {
    interface IRouteRecordRawType {
      [key: string]: any
    }
    const val1 = (<IRouteRecordRawType>obj1)[prop]
    const val2 = (<IRouteRecordRawType>obj2)[prop]
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    } else {
      return 0
    }
  }
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] {
  routes = routes.sort(compare('index'))
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
declare interface PermissionState {
  routes: RouteRecordRaw[]
  addRoutes: RouteRecordRaw[]
}

const state: PermissionState = {
  routes: [],
  addRoutes: []
}
// getters
const getters: GetterTree<PermissionState, any> = {
  routes(state) {
    return state.routes
  },
  addRoutes(state) {
    return state.addRoutes
  }
}

const mutations: MutationTree<PermissionState> = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    // state.routes = constantRoutes
  }
}

const actions: ActionTree<PermissionState, any> = {
  // 根据权限生成动态路由
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      const accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles)
      // const accessedRoutes = asyncRouterMap
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
