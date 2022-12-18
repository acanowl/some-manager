const mongoose = require('mongoose')
const { getMeta, preSave } = require('../../config')

const InventoryLogSchema = new mongoose.Schema({
  type: String,
  num: Number,
  user: String,

  meta: getMeta()
})

InventoryLogSchema.pre('save', preSave)

module.exports = InventoryLogSchema
