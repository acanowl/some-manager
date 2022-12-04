const mongoose = require('mongoose')
const koa = require('koa')
const service = new koa()
const { koaBody } = require('koa-body')
const koaCors = require('@koa/cors')

const { connect, registerSchema } = require('./db')
// 生成中间件
registerSchema(mongoose)

const registerModel = require('./routers/index')

// 服务器端口
const servicePort = '3000'

const serviceStart = async () => {
  // 连接数据库
  await connect()
  // 注册跨域、请求体中间件
  await service.use(koaCors())
  await service.use(koaBody())
  // 注册中间件
  await registerModel(service)
  // 监听
  service.listen(servicePort, () => {
    // console.log('监听成功')
  })
}

serviceStart()
