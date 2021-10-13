import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
// import 'element-plus/packages/theme-chalk/src/index.scss'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import { store, key } from './store'
import router from './router'

createApp(App).use(ElementPlus).use(store, key).use(router).mount('#app')
console.log(import.meta.env.VITE_APP_BASE_API)
