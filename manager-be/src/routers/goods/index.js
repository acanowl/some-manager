const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody, getOne, setSchema } = require('../../utils')

const Goods = mongoose.model('Goods')

const router = new Router({
  prefix: '/goods'
})

router.post('/add', async ctx => {
  const { name, author, date, classfiy, price } = getBody(ctx)
  // TODO 字段判断
  // if (!account || !password) {
  //   ctx.body = { code: -1, msg: '字段不能为空', data: null }
  //   return
  // }
  const data = await setSchema(Goods, { name, author, date, classfiy, price })

  ctx.body = { code: 0, msg: '新增成功', data }
})

router.post('/update', async ctx => {
  const { name, author, date, classfiy, price } = getBody(ctx)
  const data = await setSchema(Goods, { name, author, date, classfiy, price })

  ctx.body = { code: 0, msg: '更新成功', data }
})

router.get('/list', async ctx => {
  let { page = 1, pageSize = 10, name, author, classfiy } = ctx.query

  page = Number(page)
  pageSize = Number(pageSize)

  const params = {}
  name && Object.assign(params, { name })
  author && Object.assign(params, { author })
  classfiy && Object.assign(params, { classfiy })

  const list = await Goods.find(params)
    .skip((page - 1) * pageSize)
    .limit(pageSize)

  const total = await Goods.countDocuments()
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
  try {
    const { deletedCount } = await Goods.deleteOne({ _id: id })
    if (deletedCount) {
      ctx.body = { code: 0, msg: '删除成功' }
    } else {
      ctx.body = { code: -1, msg: '删除失败！数据不存在，请联系管理员！' }
    }
  } catch (error) {
    ctx.body = { code: -1, msg: '删除失败！数据不存在，请联系管理员！' }
  }
})

module.exports = router
