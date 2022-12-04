const UserSchema = require('./User')

module.exports = async mongoose => {
  mongoose.model('User', UserSchema)
}
