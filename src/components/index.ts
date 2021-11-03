// 全局添加组件
import { createApp } from 'vue'
const files = import.meta.globEager('./*/index.vue')
const filesT = import.meta.globEager('./*/*/index.vue')

export default function (app: ReturnType<typeof createApp>): void {
  Object.keys(files).forEach((fileName: string) => {
    if (fileName.indexOf('demo') > -1) {
      return
    }
    const module = files[fileName]
    const moduleName: string = fileName.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$1')
    // 全局注册组件
    app.component(moduleName, module.default || module)
  })
  Object.keys(filesT).forEach((fileName: string) => {
    if (fileName.indexOf('demo') > -1) {
      return
    }
    const module = filesT[fileName]
    const moduleName: string = fileName.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$1')

    // 全局注册组件
    app.component(moduleName.split('/')[1], module.default || module)
  })
}
