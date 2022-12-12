const { getFiles } = require('../utils/files')
// const authRouter = require('./auth/index')
// const goodsRouter = require('./goods/index')

const files = getFiles(__dirname)

module.exports = async app => {
  for (const file in files) {
    app.use(files[file].routes())
  }
}
