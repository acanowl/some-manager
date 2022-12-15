const mongoose = require('mongoose')
/**
 * 获取body
 * @param {*} ctx 上下文
 * @returns
 */
const getBody = ctx => ctx.request.body || {}

/**
 * 设置schema并获取返回值
 * @param {*} Schema 实例
 * @param {*} options
 * @returns
 */
const setSchema = async (Schema, options = {}) => {
  if (!Schema) return {}
  const schema = new Schema(options)
  return await saveSchema(schema, options)
}

const saveSchema = async (schema, options = {}) => {
  if (!schema) return {}
  const data = await schema.save()
  return Object.keys(options).reduce(
    (obj, key) => ({ ...obj, [key]: data[key] }),
    {}
  )
}

/**
 * 查找并执行相应值
 * @param {*} Schema
 * @param {*} options
 * @returns
 */
const getOne = async (Schema, options) => {
  const { _id: id } = options
  // 如果入参有_id，则判断是否有效
  if (!Schema || (id && !mongoose.Types.ObjectId.isValid(id))) {
    return false
  }
  return await Schema.findOne(options)
}

module.exports = {
  getBody,
  saveSchema,
  setSchema,
  getOne
}
