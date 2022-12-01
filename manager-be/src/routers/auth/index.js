const Router = require('@koa/router')
const mongoose = require('mongoose')

const User = mongoose.model('User')

const router = new Router({
  prefix: '/auth'
})

router.post('/register', async ctx => {
  ctx.body = 'register'
})

router.post('/login', async ctx => {
  ctx.body = 'login'
})

module.exports = router
