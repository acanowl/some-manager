import { post } from '@/utils/axios.js'

const prefix = '/auth'

/**
 * 注册接口
 * @param {*} params
 * @returns
 */
export const registerApi = params => post(`${prefix}/register`, params)

/**
 * 登陆接口
 * @param {*} params
 * @returns
 */
export const loginApi = params => post(`${prefix}/login`, params)
