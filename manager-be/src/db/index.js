const mongoose = require('mongoose')
const registerSchema = require('./schema')
const { mongodbPath } = require('./config')

const connect = () => {
  return new Promise(resove => {
    mongoose.connect(mongodbPath)

    mongoose.connection.on('open', () => {
      console.log('数据库连接 -- successfully')
      resove()
    })
  })
}

module.exports = { connect, registerSchema }
