const Router = require('@koa/router')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../../project.config')
const { getBody, getOne, setSchema, getItems } = require('../../utils')

const User = mongoose.model('User')

const router = new Router({
  prefix: '/auth'
})

router.post('/register', async ctx => {
  const { account, password } = getBody(ctx)

  if (!account || !password) {
    ctx.body = { code: -1, msg: '字段不能为空', data: null }
    return
  }

  const isExist = await getOne(User, { account })
  if (isExist) {
    ctx.body = { code: -1, msg: '账号已存在', data: null }
    return
  }

  const data = await setSchema(User, { account, password, character: 'ME' })

  ctx.body = { code: 0, msg: '注册成功', data }
})

router.post('/login', async ctx => {
  const { account, password } = getBody(ctx)

  if (!account || !password) {
    ctx.body = { code: -1, msg: '字段不能为空', data: null }
    return
  }

  const isExist = await getOne(User, { account })

  // 无该用户或密码错误
  if (!isExist || isExist.password !== password) {
    ctx.body = { code: -1, msg: '用户名或密码错误', data: null }
    return
  }

  const user = getItems(isExist, ['account', '_id', 'character'])

  ctx.body = {
    code: 0,
    msg: '登陆成功',
    data: { user, token: jwt.sign(user, config.DEFAULT_JWT_SECRET) }
  }
})

module.exports = router
