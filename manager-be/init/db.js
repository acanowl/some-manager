const mongoose = require('mongoose')
const { connect, registerSchema } = require('../src/db/index')
const { defaultCharacters, defaultUser } = require('../src//utils/character')

// 生成中间件
registerSchema(mongoose)

const Character = mongoose.model('Character')
const User = mongoose.model('User')

const initConnect = async () => {
  // 连接数据库
  await connect()
  await Character.insertMany(defaultCharacters)
  await User.insertMany(defaultUser)
}

initConnect()
