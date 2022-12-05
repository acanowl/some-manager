import '@/assets/css/index.scss'
import 'uno.css'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import envVariables from '../env-variables.js'
import { registerGlobComp } from './components/'

import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import pinia from '@/store'

// 挂载环境变量
window.envVariables = envVariables

// 环境及打包信息
console.log(`${envVariables.title} ${buildTime}`)
console.log(`MODE=${import.meta.env.MODE}`)

const app = createApp(App)

// 全局组件注册
registerGlobComp(app)

// 路由 store
app.use(router).use(pinia).mount('#app')
