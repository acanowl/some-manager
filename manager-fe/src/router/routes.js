const layoutMap = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/index.vue'),
    meta: { title: '概览', icon: 'HomeFilled' }
  },
  {
    path: 'goods',
    name: 'Goods',
    component: () => import('@/views/Goods/index.vue'),
    meta: { title: '商品', icon: 'HomeFilled' }
  }
]

const routes = [
  {
    path: '/',
    name: 'layout',
    meta: { title: '首页' },
    redirect: { name: 'Dashboard' },
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    children: layoutMap
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/reset-password',
    component: () =>
      import(
        /* webpackChunkName: "resetPassword" */ '@/views/Login/ResetPwd.vue'
      ),
    meta: {
      title: '重置密码',
      whiteList: true
    }
  }
]

export { routes, layoutMap }
