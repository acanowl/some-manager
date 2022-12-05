import { post } from '@/utils/axios.js'

/**
 * 注册接口
 * @param {*} params
 * @returns
 */
export const registerApi = params => post('/auth/register', params)

/**
 * 登陆接口
 * @param {*} params
 * @returns
 */
export const loginApi = params => post('/auth/login', params)
