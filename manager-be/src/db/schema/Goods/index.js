const mongoose = require('mongoose')
const { getMeta } = require('../../config')

const GoodsSchema = new mongoose.Schema({
  name: String,
  author: String,
  date: String,
  classfiy: String,
  price: Number,

  meta: getMeta()
})

module.exports = GoodsSchema
