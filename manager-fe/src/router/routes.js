import { ROLE_SA, ROLE_ME } from '@/config/index'

const layoutMap = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/index.vue'),
    meta: { title: '概览', icon: 'Grid', roles: [ROLE_SA, ROLE_ME] }
  },
  {
    path: 'goods',
    name: 'Goods',
    component: () => import('@/views/Goods/index.vue'),
    meta: { title: '商品管理', icon: 'List', roles: [ROLE_SA, ROLE_ME] }
  },
  {
    path: 'goods/detail',
    name: 'GoodsDetail',
    component: () => import('@/views/Goods/GoodsDetail.vue'),
    meta: { title: '商品详情', hidden: true, roles: [ROLE_SA, ROLE_ME] }
  },
  {
    path: 'user',
    name: 'Users',
    component: () => import('@/views/Users/index.vue'),
    meta: { title: '用户管理', icon: 'User', roles: [ROLE_SA] }
  },
  {
    path: 'log',
    name: 'Log',
    component: () => import('@/views/Log/index.vue'),
    meta: { title: '系统日志', icon: 'Warning', roles: [ROLE_SA] }
  }
]

const routes = [
  {
    path: '/',
    name: 'layout',
    meta: { title: '首页' },
    redirect: { name: 'Dashboard' },
    component: () => import('@/layout/index.vue'),
    children: layoutMap
  },
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/reset-password',
    component: () => import('@/views/Login/ResetPwd.vue'),
    meta: {
      title: '重置密码',
      whiteList: true
    }
  }
]

export { routes, layoutMap }
