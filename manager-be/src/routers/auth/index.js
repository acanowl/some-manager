const Router = require('@koa/router')
const mongoose = require('mongoose')

const User = mongoose.model('User')

const router = new Router({
  prefix: '/auth'
})

router.post('/register', async ctx => {
  const { account, password } = ctx.request.body
  const user = new User({ account, password })

  const isExist = user.findOne({ account })
  if (isExist) {
    console.log('isExist')
    ctx.body = {
      code: -1,
      data: {}
    }
    return
  }
  ctx.body = {
    code: 0,
    data: {}
  }
  user.save()
})

router.post('/login', async ctx => {
  ctx.body = 'login'
})

module.exports = router
