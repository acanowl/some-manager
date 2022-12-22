const mongoose = require('mongoose')
const { getMeta, preSave } = require('../../config')

const CharacterSchema = new mongoose.Schema({
  name: String, // 管理员
  prop: String, // admin
  power: Object, // 权限

  meta: getMeta()
})

CharacterSchema.pre('save', preSave)

module.exports = CharacterSchema