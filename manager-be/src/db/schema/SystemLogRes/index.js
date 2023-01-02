const mongoose = require('mongoose')
const { getMeta, preSave } = require('../../config')

const SystemLogResSchema = new mongoose.Schema({
  logId: String,
  data: String,

  meta: getMeta()
})

SystemLogResSchema.pre('save', preSave)

module.exports = SystemLogResSchema
