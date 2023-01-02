import auth from './auth'

export function registerGlobDir(app) {
  app.directive('auth', auth)
}
