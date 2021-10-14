import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
// import 'element-plus/packages/theme-chalk/src/index.scss'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import store from './store'
import router from './router'
import 'virtual:svg-icons-register'

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
console.log(import.meta.env.VITE_APP_BASE_API)
