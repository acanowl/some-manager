const mongoose = require('mongoose')
const { commonMeta } = require('../../config')

const UserSchema = new mongoose.Schema({
  data: {
    account: String,
    password: String
  },
  meta: commonMeta
})

module.exports = UserSchema
