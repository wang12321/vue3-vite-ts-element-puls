import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { configSvgIconsPlugin } from './src/plugins/svgIconsPlugin'
import { autoRouter } from './src/plugins/autoRouters'
import vueJsx from '@vitejs/plugin-vue-jsx'

const isProduction = process.env.NODE_ENV === 'production'
export default defineConfig({
  // 项目根目录
  root: process.cwd(),
  // 在生产中服务时的基本公共路径
  base: isProduction ? './' : '',
  // 配置中指明将会把 serve 和 build 时的模式都覆盖掉,serve 时默认 'development'，build 时默认 'production'
  mode: 'development',
  // 静态资源服务的文件夹
  publicDir: 'assets',
  plugins: [
    vue(),
    vueJsx(),
    autoRouter('src/views/autoRouter', '@/views/autoRouter', '@virtual-router'),
    configSvgIconsPlugin(true)
    // 按需引入
    // Components({
    //   resolvers: [
    //     ElementPlusResolver({
    //       importStyle: 'sass'
    //     })
    //   ]
    // })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
    // alias: {
    //   '@/': `${path.resolve(__dirname, 'src')}/`
    // }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `$injectedColor: orange;`
      }
    }
  },
  server: {
    port: 3001,
    host: '0.0.0.0',
    open: true,
    // 设为 true ,若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    // 为开发服务器配置 CORS
    cors: true,
    // 设置为 true 强制使依赖预构建
    force: true,
    proxy: {
      // 代理配置
    }
  },
  build: {
    // 压缩
    minify: 'esbuild',
    assetsDir: 'static',
    outDir: `./dist`,
    // 进行压缩计算
    brotliSize: false
  }
})
