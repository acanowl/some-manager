import { ElMessage } from 'element-plus'

/**
 * 统一处理表单验证
 * @param {*} instance 表单实例
 * @param {*} autoShowMessage 默认展示消息提示
 * @returns 是否验证通过
 */
export const formValidate = async (instance, autoShowMessage = true) => {
  if (!instance || !instance.validate) return false
  try {
    const valid = await instance.validate()
    return valid
  } catch (error) {
    if (typeof error === 'object' && autoShowMessage) {
      const errorList = Object.values(error)
      errorList.forEach(items => {
        const { message = '' } = items[0] || {}
        message && ElMessage.error(message)
      })
    }
    return false
  }
}
