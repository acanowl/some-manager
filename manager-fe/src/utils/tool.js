// 统一返回处理
export const resultFn = res => {
  const { msg: message = '', code } = res || {}
  const isSuccess = code !== -1
  ElNotification({ message, type: isSuccess ? 'success' : 'error' })
  return { isSuccess }
}

/* 处理权限 */
export const hasPermission = (route, role) => {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role)
  }
  return true /* 默认不设权限 */
}

export const filterAsyncRouter = (routerMap, roles) => {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(route, roles)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/**
 * 获取图片地址
 * @param {*} name
 * @returns
 */
export const getImageUrl = name => {
  return new URL(`../assets/img/${name}.png`, import.meta.url).href
}

/**
 * 拷贝
 * @param {*} value
 * @returns
 */
export const clone = value => JSON.parse(JSON.stringify(value))
