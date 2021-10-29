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
// import loadComponents from '@/components/index'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { initVueDocsDemo } from 'virtual:vite-plugin-vue-docs'
import loadComponents from '../lib/static/js/index.js'

// 导入demo组件
const app = createApp(App)
loadComponents(app)
app.use(ElementPlus).use(store).use(router).use(initVueDocsDemo).mount('#app')

if ((import.meta.env.VITE_APP_BASE_API as string)?.includes('production')) {
  console.log = function () {
    return ''
  }
}

console.log(import.meta.env.VITE_APP_BASE_API)

// mock数据
import { setupProdMockServer } from './mockProdServer'
if (import.meta.env.VITE_APP_BASE_API === 'development') {
  setupProdMockServer()
}
