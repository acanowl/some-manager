import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes.js'
// import { decode } from 'js-base64'
import { useAppStore } from '@/store/modules/app'
import { isAuthed } from '@/utils/auth'

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

const DIST_TITLE = '图书馆信息管理系统'

router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore()

  // 设置标题
  const documentTitle = (to.meta && to.meta.title) || ''
  document.title = DIST_TITLE + (documentTitle && '-' + documentTitle)

  const isLogin = isAuthed()
  if (to.path === '/login') {
    // 如果是登录状态 跳转到主页
    isLogin ? next('/') : next()
  } else {
    if (from.name === 'Login' && !isLogin) {
      next(false)
      return false
    }
    if (isLogin) {
      // 设置面包屑
      const breadCrumbList = to.matched.map(item => ({
        title: item.meta.title,
        path: item.path,
        disabled: item.meta.isBarIgnore
      }))
      appStore.setBreadCrumb(breadCrumbList)
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

export default router
