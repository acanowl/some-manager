const koa = require('koa')
const service = new koa()

const { connect } = require('./db')
const registerModel = require('./routers/index')

connect().then(() => {
  registerModel(service)

  service.listen('3000', () => {
    console.log('监听成功')
  })
})
