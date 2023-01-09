const mongoose = require('mongoose')
const { getMeta, preSave } = require('../../config')

const GoodsClassifySchema = new mongoose.Schema({
	label: String,
	id: Number,
  // 0 未激活 1 已激活
	status: String,

	meta: getMeta()
})

GoodsClassifySchema.pre('save', preSave)

module.exports = GoodsClassifySchema
