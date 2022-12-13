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
  console.log(name, author, date, classfiy, price, ' ?')

  const data = await setSchema(Goods, { name, author, date, classfiy, price })

  ctx.body = { code: 0, msg: '新增成功', data }
})

router.post('/update', async ctx => {
  const { name, author, date, classfiy, price } = getBody(ctx)
  const data = await setSchema(Goods, { name, author, date, classfiy, price })

  ctx.body = { code: 0, msg: '更新成功', data }
})

router.get('/list', async ctx => {
  // TODO 后续新增page, pageSize分页功能
  const list = await Goods.find()
  ctx.body = { code: 0, msg: 'success', data: list }
})

module.exports = router
