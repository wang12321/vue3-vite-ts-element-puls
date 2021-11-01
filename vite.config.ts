import { defineConfig, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import path from 'path'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { configSvgIconsPlugin } from './src/plugins/svgIconsPlugin'
import { autoRouter } from './src/plugins/autoRouters'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'
import vueDocs, { CustomConfig } from 'vite-plugin-vue-docs'
import npmConfig from './build/npmConfig'
import proConfig from './build/proConfig'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default ({ mode }): UserConfigExport => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const isProduction = process.env.VITE_APP_BASE_API === 'production'
  const isProNPM = process.env.VITE_APP_BASE_API === 'productionNpm'
  const configDocs: Partial<CustomConfig> = {
    showUse: false,
    header: { title: '组件文档' }
  }
  return defineConfig({
    // 项目根目录
    root: process.cwd(),
    // 在生产中服务时的基本公共路径
    base: isProduction ? './' : process.env.BASE_URL || '',
    // 配置中指明将会把 serve 和 build 时的模式都覆盖掉,serve 时默认 'development'，build 时默认 'production'
    mode: 'development',
    // 静态资源服务的文件夹
    publicDir: 'assets',
    plugins: [
      vue(),
      vueJsx(),
      autoRouter('src/views/autoRouter', '/src/views/autoRouter', '@virtual-router'),
      configSvgIconsPlugin(true),
      vueDocs(configDocs as CustomConfig),
      viteMockServe({
        // default
        mockPath: './mock',
        localEnabled: !isProduction, // 开发打包开关
        prodEnabled: !isProduction, // 生产打包开关
        logger: false, //是否在控制台显示请求日志
        supportTs: false //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
      })
      // // 按需引入
      // Components({
      //   resolvers: [
      //     ElementPlusResolver({
      //       importStyle: 'sass'
      //     })
      //   ]
      // })
    ],
    resolve: {
      // alias: {
      //   '@': path.join(__dirname, 'src')
      // }
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
        '/assets': 'src/assets',
        // 必须添加这一行，否则无法使用
        vue: 'vue/dist/vue.esm-bundler.js'
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `$injectedColor: orange;`
        }
      }
    },
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
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
    build: isProNPM ? npmConfig : proConfig
  })
}
