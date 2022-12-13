const Router = require('@koa/router')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { getBody, getOne, setSchema } = require('../../utils')

const Goods = mongoose.model('Goods')

const router = new Router({
  prefix: '/goods'
})

router.post('/add', async ctx => {
  const { name, date, classfiy, price } = getBody(ctx)
  // TODO 字段判断
  // if (!account || !password) {
  //   ctx.body = { code: -1, msg: '字段不能为空', data: null }
  //   return
  // }

  const data = setSchema(Goods, { name, date, classfiy, price })

  ctx.body = { code: 0, msg: '新增成功', data }
})

router.post('/update', async ctx => {
  const { name, date, classfiy, price } = getBody(ctx)
  const data = setSchema(Goods, { name, date, classfiy, price })

  ctx.body = { code: 0, msg: '更新成功', data }
})

router.get('/list', async ctx => {
  // TODO 后续新增page, pageSize分页功能
  const list = Goods.find()

  ctx.body = {
    code: 0,
    msg: 'success',
    data: null
  }
})

module.exports = router
