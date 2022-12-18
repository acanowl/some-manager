// mongodb地址
const mongodbPath = 'mongodb://127.0.0.1:27017/manager'

// 公用meta
const getMeta = () => ({
  createdAt: {
    type: Number,
    default: +new Date()
  },
  updatedAt: {
    type: Number,
    default: +new Date()
  }
})

function preSave(next) {
  const now = Date.now()
  if (this.isNew) {
    this['meta'].createdAt = now
  }
  this['meta'].updatedAt = now
  next()
}

module.exports = {
  mongodbPath,
  getMeta,
  preSave
}
