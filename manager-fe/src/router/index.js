import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes.js'
// import { decode } from 'js-base64'
import { useAppStore } from '@/store/modules/app'
import { useCharacterStore } from '@/store/modules/character'

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

const DIST_TITLE = '图书馆信息管理系统'

router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore()
  const characterStore = useCharacterStore()

  // 设置标题
  const documentTitle = (to.meta && to.meta.title) || ''
  document.title = DIST_TITLE + (documentTitle && '-' + documentTitle)

  // 设置面包屑
  const breadCrumbList = to.matched.map(item => ({
    title: item.meta.title,
    path: item.path
  }))
  appStore.setBreadCrumb(breadCrumbList)

  // 获取角色
  try {
    await characterStore.setCharacterList()
  } catch (error) {
    console.log(error, 'set-character-list-error')
  }

  next()
  // const jwt = sessionStorage.getItem('jwt') || ''

  // if (to.path === '/login') {
  //   // 如果是登录状态 跳转到主页
  //   jwt ? next('/') : next()
  // } else {
  //   if (to.meta && to.meta.whiteList) {
  //     next()
  //   }
  //   if (from.name === 'Login' && !jwt) {
  //     next(false)
  //     return false
  //   }
  //   if (jwt) {
  //     if (Object.prototype.hasOwnProperty.call(to.meta, 'roles')) {
  //       const roles = to.meta.roles || []
  //       const { role } = jwt && JSON.parse(decode(jwt))
  //       roles.includes(role) ? next() : next('/error')
  //       return false
  //     }
  //     next()
  //   } else {
  //     next({ path: '/login' })
  //   }
  // }
})

export default router
