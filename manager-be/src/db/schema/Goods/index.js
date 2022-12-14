const mongoose = require('mongoose')
const { getMeta, preSave } = require('../../config')

const GoodsSchema = new mongoose.Schema({
  name: String, // 名称
  author: String, // 作者
  date: String, // 日期
  classfiy: String, // 类型
  price: Number, // 价格
  count: Number, // 库存

  meta: getMeta()
})

GoodsSchema.pre('save', preSave)

module.exports = GoodsSchema
