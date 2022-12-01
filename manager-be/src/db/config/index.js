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

module.exports = {
  getMeta
}
