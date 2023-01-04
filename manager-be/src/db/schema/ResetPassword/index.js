const mongoose = require('mongoose')
const { getMeta, preSave } = require('../../config')

const ResetPasswordSchema = new mongoose.Schema({
  account: String,
  // 1 未处理 2 已重置 3 已忽略
  status: Number,

  meta: getMeta()
})

ResetPasswordSchema.pre('save', preSave)

module.exports = ResetPasswordSchema
