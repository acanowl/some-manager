import { post, get } from '@/utils/axios.js'

const prefix = '/goods'

/**
 * 新增接口
 * @param {*} params
 * @returns
 */
export const goodsAddApi = params => post(`${prefix}/add`, params)

/**
 * 更新接口
 * @param {*} params
 * @returns
 */
export const goodsUpdateApi = params => post(`${prefix}/update`, params)

/**
 * 列表接口
 * @param {*} params
 * @returns
 */
export const goodsListApi = params => get(`${prefix}/list`, params)
