import { post, get } from '@/utils/axios.js'

const prefix = '/user'

/**
 * 新增接口
 * @param {*} params
 * @returns
 */
export const userAddApi = params => post(`${prefix}/add`, params)

/**
 * 更新接口
 * @param {*} params
 * @returns
 */
export const userUpdateApi = params => post(`${prefix}/update`, params)

/**
 * 密码重置接口
 * @param {*} params
 * @returns
 */
export const userResetPasswordApi = params => post(`${prefix}/reset/password`, params)

/**
 * 列表接口
 * @param {*} params
 * @returns
 */
export const userListApi = params => get(`${prefix}/list`, params)

/**
 * 删除接口
 * @param {*} params
 * @returns
 */
export const userDeleteApi = params => post(`${prefix}/delete`, params)
