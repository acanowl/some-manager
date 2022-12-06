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
const getOne = async (Schema, options) =>
  Schema ? await Schema.findOne(options).exec() : null

module.exports = {
  getBody,
  setSchema,
  getOne
}
