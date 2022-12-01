const authRouter = require('./auth/index')

module.exports = async app => {
  app.use(authRouter.routes())
}
