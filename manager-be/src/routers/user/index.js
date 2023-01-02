const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody, getOne, setSchema, saveSchema } = require('../../utils')
const config = require('../../project.config')

const User = mongoose.model('User')
const Character = mongoose.model('Character')

const router = new Router({
  prefix: '/user'
})

const setValue = (origin, params) => {
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      origin[key] = value
    }
  })
  return origin
}

router.post('/add', async ctx => {
  const { account, password, character } = getBody(ctx)

  if (!account || !password) {
    ctx.body = { code: -1, msg: '字段不能为空', data: null }
    return
  }
  const charOne = await getOne(Character, { prop: character })
  if (!charOne) {
    ctx.body = { code: -1, msg: '数据不存在，请联系管理员！', data: null }
    return
  }

  let data = await setSchema(User, { account, password, character })
  // 不显示密码
  data.password = undefined

  ctx.body = { code: 0, msg: '新增成功', data }
})

router.post('/update', async ctx => {
  const params = getBody(ctx)
  let { _id, account, character } = params
  let isExist = await getOne(User, { _id })

  if (isExist) {
    if (!account) {
      ctx.body = { code: -1, msg: '字段不能为空', data: null }
      return
    }
    const charOne = await getOne(Character, { prop: character })
    if (!charOne) {
      ctx.body = { code: -1, msg: '数据不存在，请联系管理员！', data: null }
      return
    }

    isExist = setValue(isExist, params)
    const data = await saveSchema(isExist, { account, character })

    ctx.body = { code: 0, msg: '更新成功', data }
  } else {
    ctx.body = { code: -1, msg: '更新失败！数据不存在，请联系管理员！' }
  }
})

router.post('/reset/password', async ctx => {
  const params = getBody(ctx)
  let { id } = params
  let isExist = await getOne(User, { _id: id })

  if (isExist) {
    isExist = setValue(isExist, { password: config.DEFAULT_PASSWORD })
    const data = await saveSchema(isExist, ['account', '_id'])

    ctx.body = { code: 0, msg: '更新成功', data }
  } else {
    ctx.body = { code: -1, msg: '更新失败！数据不存在，请联系管理员！' }
  }
})

router.get('/list', async ctx => {
  let { page = 1, pageSize = 10, account } = ctx.query

  page = Number(page)
  pageSize = Number(pageSize)

  const params = {}
  account && Object.assign(params, { account })

  let list = await User.find(params)
    .sort({ _id: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)

  for (let i in list) {
    list[i].password = undefined
  }

  const total = await User.countDocuments(params)
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
  const isExist = await getOne(User, { _id: id })
  if (isExist) {
    await User.deleteOne({ _id: id })
    ctx.body = { code: 0, msg: '删除成功' }
  } else {
    ctx.body = { code: -1, msg: '删除失败！数据不存在，请联系管理员！' }
  }
})

module.exports = router
