const Router = require('@koa/router')
const mongoose = require('mongoose')

const InventoryLog = mongoose.model('InventoryLog')

const router = new Router({
  prefix: '/inventory-log'
})

router.get('/list', async ctx => {
  let { page = 1, pageSize = 10 } = ctx.query

  page = Number(page)
  pageSize = Number(pageSize)

  const list = await InventoryLog.find()
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
