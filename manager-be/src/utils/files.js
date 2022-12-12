const { statSync, readdirSync } = require('fs')
const { resolve, basename } = require('path')

const load = (path, name = '') => require(path + name)

const getFiles = dir => {
  let object = {}
  const files = readdirSync(dir)

  files.forEach(file => {
    if (statSync(resolve(dir, file)).isDirectory()) {
      // isDirectory()方法的使用，返回true/false，目录存在则返回true
      let name = basename(file, '.js')
      let _load = load.bind(null, resolve(dir, name))
      object.__defineGetter__(name, _load)
    }
  })
  return object
}

module.exports = {
  getFiles
}
