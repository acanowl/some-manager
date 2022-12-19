const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody, getOne, setSchema, saveSchema } = require('../../utils')

const Goods = mongoose.model('Goods')
const InventoryLog = mongoose.model('InventoryLog')

const router = new Router({
  prefix: '/goods'
})

const UPDATE_COUNT_TYPE = { IN: 1, OUT: 0 }

const getParams = params => {
  const { name, author, date, classfiy, price, count } = params
  return { name, author, date, classfiy, price, count }
}

const setValue = (origin, params) => {
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      origin[key] = value
    }
  })
  return origin
}

router.post('/add', async ctx => {
  const params = getBody(ctx)
  const { count, classfiy } = params
  // TODO 字段判断
  // if (!account || !password) {
  //   ctx.body = { code: -1, msg: '字段不能为空', data: null }
  //   return
  // }
  const data = await setSchema(Goods, getParams(params))

  count && (await setSchema(InventoryLog, { num: count, type: classfiy }))

  ctx.body = { code: 0, msg: '新增成功', data }
})

router.post('/update', async ctx => {
  const params = getBody(ctx)
  let { _id, count, classfiy } = params
  let isExist = await getOne(Goods, { _id })

  if (isExist) {
    isExist = setValue(isExist, params)
    const data = await saveSchema(isExist, getParams(params))

    count && (await setSchema(InventoryLog, { num: count, type: classfiy }))

    ctx.body = { code: 0, msg: '更新成功', data }
  } else {
    ctx.body = { code: -1, msg: '更新失败！数据不存在，请联系管理员！' }
  }
})

router.post('/updateCount', async ctx => {
  const params = getBody(ctx)
  let { id, num, type } = params

  let isExist = await getOne(Goods, { _id: id })

  if (isExist) {
    num = Number(num)
    const isAddCount = type === UPDATE_COUNT_TYPE.IN
    if (isAddCount) {
      num = Math.abs(num)
    } else {
      num = -Math.abs(num)
    }
    isExist.count = isExist.count + num

    if (isExist.count < 0) {
      ctx.body = { code: -1, msg: '库存不足，请重新输入' }
      return
    }

    const data = await saveSchema(isExist, getParams(params))

    await setSchema(InventoryLog, { num: Math.abs(num), type })

    const msg = `成功${isAddCount ? '添加' : '减少'} ${Math.abs(num)} 份库存`
    ctx.body = { code: 0, msg, data }
  } else {
    ctx.body = { code: -1, msg: '更新失败！数据不存在，请联系管理员！' }
  }
})

router.get('/detail', async ctx => {
  const { id } = ctx.query
  let isExist = await getOne(Goods, { _id: id })
  if (isExist) {
    ctx.body = { code: 0, data: isExist, msg: '查询成功' }
  } else {
    ctx.body = { code: -1, msg: '数据不存在，请联系管理员！' }
  }
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

router.post('/delete', async ctx => {
  const { id } = getBody(ctx)
  const isExist = await getOne(Goods, { _id: id })
  if (isExist) {
    await Goods.deleteOne({ _id: id })
    ctx.body = { code: 0, msg: '删除成功' }
  } else {
    ctx.body = { code: -1, msg: '删除失败！数据不存在，请联系管理员！' }
  }
})

module.exports = router
