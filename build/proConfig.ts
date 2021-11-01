import { BuildOptions } from 'vite'
export default {
  // 压缩
  minify: 'esbuild',
  assetsDir: 'static/img/',
  outDir: `./dist`,
  // 打包之后分开包
  rollupOptions: {
    output: {
      chunkFileNames: 'static/js/[name].[hash].js', // 用于在使用代码切割时命名共享模块
      entryFileNames: 'static/js/[name].[hash].js', // 用于在使用代码切割时命名
      assetFileNames: 'static/css/[name].[hash].[ext]' // 在使用代码切割时，用于自定义包含在输出构建中的资产名字
    }
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
