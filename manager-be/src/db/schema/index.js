const { getFiles } = require('../../utils/files')
// const UserSchema = require('./User')
// const GoodsSchema = require('./Goods')

const files = getFiles(__dirname)

module.exports = async mongoose => {
  for (const file in files) {
    mongoose.model(file, files[file])
  }
}
