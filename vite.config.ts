import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [vue(),
      // 按需引入
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@/styles/index.scss" as *;`,
      },
    },
  },
  server:{
    port: 3001,
    host:'0.0.0.0',
    open: true,
    proxy: { // 代理配置
    },
  }
})
