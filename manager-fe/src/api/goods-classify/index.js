import { post, get } from '@/utils/axios.js'

const prefix = '/goods-classify'

/**
 * 新增接口
 * @param {*} params
 * @returns
 */
export const goodsClassifyAddApi = params => post(`${prefix}/add`, params)

/**
 * 更新接口
 * @param {*} params
 * @returns
 */
export const goodsClassifyUpdateApi = params => post(`${prefix}/update`, params)

/**
 * 列表接口
 * @param {*} params
 * @returns
 */
export const goodsClassifyListApi = params => get(`${prefix}/list`, params)

/**
 * 删除接口
 * @param {*} params
 * @returns
*/
export const goodsClassifyDeleteApi = params => post(`${prefix}/delete`, params)
