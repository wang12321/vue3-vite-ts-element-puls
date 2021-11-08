// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import getPageTitle from '@/utils/getPageTitle'
// import { ElMessage } from 'element-plus'
const whiteList = ['/login'] // no redirect whitelist

NProgress.configure({ showSpinner: false })

import { getToken } from '@/utils/auth'

router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  NProgress.start()
  const hasToken = getToken()
  document.title = getPageTitle(to.meta.title as string)

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters['user/name']
      if (hasGetUserInfo) {
        await store.commit('user/SET_ISDOC', false)
        if (to.path.indexOf('/:id') > -1) {
          const params = { id: '6' }
          next({ ...to, params: params })
        } else if (to.path.indexOf('/HelloWorld') > -1) {
          next({ path: '/docs' })
        } else if (to.path.indexOf('docs') > -1) {
          console.log(88888)
          await store.commit('user/SET_ISDOC', true)
          next()
        } else {
          next()
        }
        NProgress.done()
      } else {
        try {
          //  permissionArray: [1] 表示只有超级管理员可以访问
          //  permissionArray: [1, 2] 表示只有超级管理员 和管理员可以访问
          //  permissionArray: [1, 2, 3] 表示只有超级管理员 、管理员及普通员工可以访问
          const userInfo = await store.dispatch('user/getInfo')
          const accessRoutes: RouteRecordRaw[] = await store.dispatch(
            'permission/generateRoutes',
            userInfo.permission
          )
          // 动态地添加可访问的 routes
          accessRoutes.forEach((route) => {
            router.addRoute(route)
          })

          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          NProgress.done()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // ElMessage.error(error || 'Has Error')
          alert(error)
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
      NProgress.done()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // NProgress.done()
})
