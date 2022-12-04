// mongodb地址
const mongodbPath = 'mongodb://127.0.0.1:27017/manager'

// 公用meta
const commonMeta = {
  createdAt: {
    type: Number,
    default: +new Date()
  },
  updatedAt: {
    type: Number,
    default: +new Date()
  }
}

module.exports = {
  mongodbPath,
  commonMeta
}
