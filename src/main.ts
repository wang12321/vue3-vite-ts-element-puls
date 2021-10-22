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
import SvgIcon from '@/components/SvgIcon/index.vue'

createApp(App).use(ElementPlus).use(store).use(router).component('SvgIcon', SvgIcon).mount('#app')
console.log(import.meta.env.VITE_APP_BASE_API)
