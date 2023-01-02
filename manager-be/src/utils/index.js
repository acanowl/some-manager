const mongoose = require('mongoose')
/**
 * 获取body
 * @param {*} ctx 上下文
 * @returns
 */
const getBody = ctx => ctx.request.body || {}

/**
 * 获取指定值
 * @param {*} items
 * @param {*} options
 * @returns
 */
const getItems = (items, options) => {
  let arr = Object.keys(options)
  if (Array.isArray(options)) {
    arr = options
  }
  return arr.reduce((obj, key) => ({ ...obj, [key]: items[key] }), {})
}

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
  return getItems(data, options)
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
  getItems,
  getBody,
  saveSchema,
  setSchema,
  getOne
}
