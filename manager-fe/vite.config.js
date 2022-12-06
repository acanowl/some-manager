import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Unocss from 'unocss/vite'
import extractorPug from '@unocss/extractor-pug'
import { extractorSplit } from '@unocss/core'

const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      extractors: [extractorPug(), extractorSplit]
    }),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router'],
      resolvers: [
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        }),
        ElementPlusResolver()
      ],
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }),
        ElementPlusResolver()
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: [
      // 别名配置
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  define: {
    buildTime: JSON.stringify(new Date().toLocaleString())
  },
  server: {
    // 服务器主机名
    host: 'localhost',
    // 端口号
    port: 3200,
    // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    // 服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
    open: false,
    // 自定义代理规则
    proxy: {
      // 选项写法
      '/api': {
        // target: 'http://jsonplaceholder.typicode.com',
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
