import { get, post } from '@/utils/axios.js'

const prefix = '/system-log'

/**
 * 库存列表接口
 * @param {*} params
 * @returns
 */
export const systemLogListApi = params => get(`${prefix}/list`, params)

/**
 * 删除接口
 * @param {*} params
 * @returns
*/
export const systemLogDeleteApi = params => post(`${prefix}/delete`, params)
