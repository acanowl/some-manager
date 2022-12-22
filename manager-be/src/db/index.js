const mongoose = require('mongoose')
const registerSchema = require('./schema')
const { mongodbPath } = require('./config')

const connect = () => {
  return new Promise(resolve => {
    mongoose.connect(mongodbPath)
    mongoose.connection.on('open', () => {
      console.log('数据库连接 -- successfully')
      resolve(true)
    })
  })
}

module.exports = { connect, registerSchema }
