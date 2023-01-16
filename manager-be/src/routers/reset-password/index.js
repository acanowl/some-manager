const Router = require('@koa/router')
const mongoose = require('mongoose')
const {
	getBody,
	getOne,
	setSchema,
	saveSchema,
	setValue
} = require('../../utils')
const config = require('../../project.config')
const { verify, getToken } = require('../../utils/token')

const ResetPassword = mongoose.model('ResetPassword')
const User = mongoose.model('User')

const router = new Router({
	prefix: '/reset-password'
})

router.get('/list', async ctx => {
	let { page = 1, pageSize = 10 } = ctx.query

	page = Number(page)
	pageSize = Number(pageSize)

	const list = await ResetPassword.find({ status: 1 })
		.sort({ _id: -1 })
		.skip((page - 1) * pageSize)
		.limit(pageSize)

	const total = await ResetPassword.countDocuments({ status: 1 })
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
	const { account } = getBody(ctx)
	if (!account) {
		ctx.body = { code: -1, msg: '字段不能为空', data: null }
		return
	}
	let userOne = await getOne(User, { account })

	let data = { account, status: 1 }
	if (userOne) {
		data = await setSchema(ResetPassword, data)
	}

	ctx.body = { code: 0, msg: '新增成功', data }
})

router.post('/changeStatus', async ctx => {
	const { id, status } = getBody(ctx)
	let isExist = await getOne(ResetPassword, { _id: id })
	let userOne = await getOne(User, { account: isExist.account })

	if (isExist) {
		isExist.status = status
		await saveSchema(isExist)

		let data = null
		if (status === 2 && userOne) {
			userOne = setValue(userOne, { password: config.DEFAULT_PASSWORD })
			data = await saveSchema(userOne, ['account', '_id'])
		}

		ctx.body = { code: 0, msg: '更新成功', data }
	} else {
		ctx.body = { code: -1, msg: '数据不存在，请联系管理员！' }
	}
})

router.post('/reset', async ctx => {
	const { curPassword, newPassword, verifyPassword } = getBody(ctx)

	const c = await verify(getToken(ctx))
	console.log(c)
	// if (!curPassword || newPassword || verifyPassword) {
	// 	ctx.body = { code: -1, msg: '字段不能为空', data: null }
	// 	return
	// }
	// let userOne = await getOne(User, { account })

	// let data = { account, status: 1 }
	// if (userOne) {
	// 	data = await setSchema(ResetPassword, data)
	// }

	ctx.body = { code: 0, msg: '新增成功', data: null }
})

module.exports = router
