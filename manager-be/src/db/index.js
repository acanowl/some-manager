require('./schema/User')

const mongoose = require('mongoose')

const connect = () => {
  return new Promise(resove => {
    mongoose.connect('mongodb://127.0.0.1:27017/manager')

    mongoose.connection.on('open', () => {
      console.log('连接成功')
      resove()
    })
  })
}

module.exports = { connect }
