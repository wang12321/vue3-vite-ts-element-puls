import { createStore } from 'vuex'
const files = import.meta.globEager('./modules/*.ts')

const modules: any = {}
Object.keys(files).forEach((c: string) => {
  const module = files[c].default
  const moduleName: string = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
  modules[moduleName] = module
})

export default createStore({
  modules
})
