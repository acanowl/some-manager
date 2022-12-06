const layoutMap = [
  {
    path: 'home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页', icon: 'HomeFilled' }
  }
]

const routes = [
  {
    path: '/',
    name: 'Layout',
    meta: { title: '首页' },
    redirect: { name: 'Home' },
    component: () => import('@/views/home/index.vue'),
    children: []
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/reset-password',
    component: () =>
      import(/* webpackChunkName: "resetPassword" */ '@/views/login/ResetPwd.vue'),
    meta: {
      title: '重置密码',
      whiteList: true
    }
  }
]

export { routes, layoutMap }
