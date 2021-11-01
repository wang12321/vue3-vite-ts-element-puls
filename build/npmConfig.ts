import path from 'path'
import { BuildOptions } from 'vite'
export default {
  // 压缩
  minify: false,
  emptyOutDir: false,
  // assetsDir: 'static/img/',
  outDir: `./lib`,
  // 打包之后分开包
  rollupOptions: {
    external: ['vue'],
    // input: resolveFile('src/components/SvgIcon/index.js'),
    output: {
      globals: {
        vue: 'vue' // 指明 global.vue 即是外部依赖 vue
      }
    }
  },
  lib: {
    entry: path.resolve(__dirname, '../src/components/index.ts'),
    name: 'component',
    formats: ['es', 'umd']
  },
  // 进行压缩计算--提高打包速度
  brotliSize: false,
  // 消除打包大小超过500kb警告
  chunkSizeWarningLimit: 2000,
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true
    }
  }
} as BuildOptions
