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
    path: 'reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/ResetPassword/index.vue'),
    meta: { title: '密码重置列表', icon: 'Lock', roles: [ROLE_SA] }
  },
  {
    path: 'goods-classify',
    name: 'GoodsClassify',
    component: () => import('@/views/GoodsClassify/index.vue'),
    meta: { title: '商品分类', icon: 'Coin', roles: [ROLE_SA] }
  },
  {
    path: 'setting',
    name: 'Setting',
    component: () => import('@/views/Setting/index.vue'),
    meta: {
      title: '个人设置',
      icon: 'Setting',
      roles: [ROLE_SA, ROLE_ME],
      isBarIgnore: true
    },
    children: [
      {
        path: 'change-password',
        name: 'ChangePassword',
        component: () => import('@/views/Setting/ChangePassword/index.vue'),
        meta: { title: '修改密码', icon: 'EditPen', roles: [ROLE_SA, ROLE_ME] }
        // FIXME 无法多层子路由
        // children: [
        //   {
        //     path: 'change-password',
        //     name: 'ChangePassword',
        //     component: () => import('@/views/Setting/ChangePassword/index.vue'),
        //     meta: { title: '修改密码', icon: 'EditPen', roles: [ROLE_SA, ROLE_ME] }
        //   }
        // ]
      }
    ]
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
  }
  // 无法自行更改密码 无其他鉴权方式 类似手机、身份证
  // {
  //   path: '/reset-password',
  //   component: () => import('@/views/Login/ResetPwd.vue'),
  //   meta: {
  //     title: '重置密码',
  //     whiteList: true
  //   }
  // }
]

export { routes, layoutMap }
