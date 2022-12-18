const mongoose = require('mongoose')
const { getMeta, preSave } = require('../../config')

const UserSchema = new mongoose.Schema({
  account: String,
  password: String,

  meta: getMeta()
})

UserSchema.pre('save', preSave)

module.exports = UserSchema
