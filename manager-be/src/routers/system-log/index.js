const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody, getOne, saveSchema } = require('../../utils')

const SystemLog = mongoose.model('SystemLog')

const router = new Router({
  prefix: '/system-log'
})

router.get('/list', async ctx => {
  let { page = 1, pageSize = 10 } = ctx.query

  page = Number(page)
  pageSize = Number(pageSize)

  const list = await SystemLog.find({ isDelete: true })
    .sort({ _id: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)

  const total = await SystemLog.countDocuments({ isDelete: true })
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

router.post('/delete', async ctx => {
  const { id } = getBody(ctx)
  let isExist = await getOne(SystemLog, { _id: id })
  if (isExist) {
    isExist.isDelete = false
    await saveSchema(isExist)

    ctx.body = { code: 0, msg: '删除成功' }
  } else {
    ctx.body = { code: -1, msg: '删除失败！数据不存在，请联系管理员！' }
  }
})

module.exports = router
