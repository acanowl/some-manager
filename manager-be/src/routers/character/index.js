const Router = require('@koa/router')
const mongoose = require('mongoose')

const Character = mongoose.model('Character')

const router = new Router({
  prefix: '/character'
})

router.get('/list', async ctx => {
  let { page = 1, pageSize = 10 } = ctx.query

  page = Number(page)
  pageSize = Number(pageSize)

  const list = await Character.find()
    .sort({ _id: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)

  const total = list.length
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      rows: list,
      total,
      page,
      pageSize
    }
  }
})

module.exports = router
