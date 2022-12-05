const Router = require('@koa/router')
const mongoose = require('mongoose')

const User = mongoose.model('User')

const router = new Router({
  prefix: '/auth'
})

router.post('/register', async ctx => {
  const { account, password } = ctx.request.body

  const isExist = await User.findOne({ account }).exec()
  if (isExist) {
    ctx.body = { code: -1, msg: '账号已存在', data: null }
    return
  }

  const user = new User({ account, password })
  const data = await user.save()

  ctx.body = { code: 0, msg: '注册成功', data }
})

router.post('/login', async ctx => {
  ctx.body = 'login'
})

module.exports = router
