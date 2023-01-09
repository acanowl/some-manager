const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody, getOne, setSchema, saveSchema, setValue } = require('../../utils')

const GoodsClassify = mongoose.model('GoodsClassify')

const router = new Router({
	prefix: '/goods-classify'
})

router.get('/list', async ctx => {
	let { page = 1, pageSize = 10, status } = ctx.query

	page = Number(page)
	pageSize = Number(pageSize)

	let param = {}
	status && (param.status = status)

	const list = await GoodsClassify.find(param)
		.skip((page - 1) * pageSize)
		.limit(pageSize)

	const total = await GoodsClassify.countDocuments(param)
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

router.post('/add', async ctx => {
	const params = getBody(ctx)
	const { label, status } = params

	let isExist = await getOne(GoodsClassify, { label })

	if (isExist) {
		ctx.body = { code: -1, msg: '新增失败，已存在', data: null }
		return
	}
  const list = await GoodsClassify.find()

  const lastOne = list.slice(-1)[0]
  
  const id = lastOne ? lastOne.id + 1 : 0

	const data = await setSchema(GoodsClassify, { label, status, id })

	ctx.body = { code: 0, msg: '新增成功', data }
})

router.post('/update', async ctx => {
  const params = getBody(ctx)
	const { id, label, status } = params
  let isExist = await getOne(GoodsClassify, { id })

  if (isExist) {
    isExist = setValue(isExist, params)
    const data = await saveSchema(isExist, { label, status, id })

    ctx.body = { code: 0, msg: '更新成功', data }
  } else {
    ctx.body = { code: -1, msg: '更新失败！数据不存在，请联系管理员！' }
  }
})

router.post('/delete', async ctx => {
  const { id } = getBody(ctx)
  let isExist = await getOne(GoodsClassify, { id })
  if (isExist) {
    await GoodsClassify.deleteOne({ id })
    ctx.body = { code: 0, msg: '删除成功' }
  } else {
    ctx.body = { code: -1, msg: '删除失败！数据不存在，请联系管理员！' }
  }
})

module.exports = router
