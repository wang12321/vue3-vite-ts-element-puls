import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'
import Layout from '@/layout/index.vue'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { routers } from '@virtual-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { routes } from 'virtual:vite-plugin-vue-docs'

export const asyncRouterMap: Array<RouteRecordRaw> = routers
export const docsRouter: Array<RouteRecordRaw> = routesChildren()
function routesChildren(): [] {
  routes[0].children = routes[0].children?.map((item: keyType) => {
    if (item.name.indexOf('Index') > -1) {
      item.name = item.name.substring(0, item.name.indexOf('Index'))
    }
    return item
  })
  return routes
}
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    meta: { title: '首页0', icon: 'el-icon-location', affix: true },
    redirect: '/Home',
    children: [
      {
        path: 'Home',
        name: 'Home1',
        meta: { title: '首页', icon: 'el-icon-location', affix: true },
        component: Home
      },
      {
        path: 'Home2',
        name: 'Home2',
        meta: { title: '首页2', icon: 'dashboard', affix: true },
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/index.vue')
  },
  {
    path: '/HelloWorld',
    name: 'About',
    meta: { title: '组件文档', icon: 'dashboard', affix: true },
    component: () => import(/* webpackChunkName: "about" */ '../components/base/HelloWorld.vue')
  }
]

// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes.concat(docsRouter)
})

export default router
