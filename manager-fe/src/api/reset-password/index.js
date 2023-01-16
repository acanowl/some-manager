import { get, post } from '@/utils/axios.js'

const prefix = '/reset-password'

/**
 * 库存列表接口
 * @param {*} params
 * @returns
 */
export const resetPasswordListApi = params => get(`${prefix}/list`, params)

/**
 * 新增接口
 * @param {*} params
 * @returns
*/
export const resetPasswordAddApi = params => post(`${prefix}/add`, params)

/**
 * 修改接口
 * @param {*} params
 * @returns
*/
export const changeAccountStatusApi = params => post(`${prefix}/changeStatus`, params)

/**
 * 修改接口
 * @param {*} params
 * @returns
*/
export const changePasswordStatusApi = params => post(`${prefix}/reset`, params)
