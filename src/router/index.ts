import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'
import Layout from '@/layout/index.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { routers } from '@virtual-router'
export const asyncRouterMap: Array<RouteRecordRaw> = routers
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
    path: '/about',
    name: 'About',
    meta: { title: '首页2', icon: 'dashboard', affix: true },
    component: () => import(/* webpackChunkName: "about" */ '../components/HelloWorld.vue')
  }
]

// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
