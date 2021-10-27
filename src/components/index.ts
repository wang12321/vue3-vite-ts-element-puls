// 全局添加组件
import { createApp } from 'vue'
const files = import.meta.globEager('./*/*.vue')

export default function (app: ReturnType<typeof createApp>): void {
  Object.keys(files).forEach((fileName: string) => {
    const module = files[fileName]
    const moduleName: string = fileName.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$1')
    // 全局注册组件
    app.component(moduleName, module.default || module)
  })
}
