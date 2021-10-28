import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
// import 'element-plus/packages/theme-chalk/src/index.scss'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import store from './store'
import router from './router'
import 'virtual:svg-icons-register'
import '@/permission' // permission control
import loadComponents from '@/components/index'
// 引入虚拟package
// import { createRouter, createWebHashHistory } from 'vue-router'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { initVueDocsDemo } from 'virtual:vite-plugin-vue-docs'
// const router = createRouter({
//   history: createWebHashHistory(),
//   routes: routes
// })

// 导入demo组件
const app = createApp(App)
loadComponents(app)
app.use(initVueDocsDemo)
app.use(ElementPlus).use(store).use(router).mount('#app')

if ((import.meta.env.VITE_APP_BASE_API as string)?.includes('production')) {
  console.log = function () {
    return ''
  }
}

console.log(import.meta.env.VITE_APP_BASE_API)

// mock数据
import { setupProdMockServer } from './mockProdServer'
import { constantRoutes } from '@/router'
if (import.meta.env.VITE_APP_BASE_API === 'development') {
  setupProdMockServer()
}
