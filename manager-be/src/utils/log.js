const mongoose = require('mongoose')
const { verify, getToken } = require('./token')

const SystemLog = mongoose.model('SystemLog')
const SystemLogRes = mongoose.model('SystemLogRes')

const defaultUrlMap = [
  ['/character/list', '获取角色列表'],

  ['/inventory-log/list', '获取库存列表'],

  ['/system-log/list', '获取日志列表'],
  ['/system-log/delete', '删除日志'],

  ['/auth/register', '用户注册'],
  ['/auth/login', '用户登陆'],

  ['/user/list', '获取用户列表'],
  ['/user/add', '新增用户'],
  ['/user/update', '更新用户'],
  ['/user/delete', '删除用户'],
  ['/user/reset/password', '用户密码重置'],

  ['/goods/list', '获取商品列表'],
  ['/goods/add', '新增商品'],
  ['/goods/update', '更新商品'],
  ['/goods/updateCount', '更新商品库存'],
  ['/goods/delete', '删除商品'],
  ['/goods/detail', '获取商品详情']
]

const logicalDeleteList = ['/system-log/delete']

const logMiddle = async (ctx, next) => {
  await next()

  let payload = {}
  try {
    payload = await verify(getToken(ctx))
  } catch (error) {
    payload = { account: '未知用户', id: '' }
  }

  const method = ctx.method
  const url = ctx.url
  const status = ctx.status

  let isLogicalDelete = false
  if (logicalDeleteList.includes(url)) {
    isLogicalDelete = true
  }

  let responseBody = ''
  try {
    responseBody = JSON.stringify(ctx.body || '')
  } catch {
    responseBody = ''
  }

  let urlLabel = ''
  defaultUrlMap.forEach(([key, label]) => {
    if (url.indexOf(key) !== -1) {
      urlLabel = url.replace(key, label)
    }
  })
  urlLabel = urlLabel || url

  const log = new SystemLog({
    account: payload.account,
    accountId: payload.id,
    method,
    url,
    urlLabel,
    status,
    isDelete: !isLogicalDelete
  })
  log.save()

  const logRes = new SystemLogRes({
    logId: log._id,
    data: responseBody
  })
  logRes.save()
}

module.exports = {
  logMiddle
}
