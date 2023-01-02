const mongoose = require('mongoose')
const { getMeta, preSave } = require('../../config')

const SystemLogSchema = new mongoose.Schema({
  account: String,
  accountId: String,
  method: String,
  url: String,
  urlLabel: String,
  status: Number,

  isDelete: Boolean,

  meta: getMeta()
})

SystemLogSchema.pre('save', preSave)

module.exports = SystemLogSchema
