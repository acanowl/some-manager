import { get } from '@/utils/axios.js'

const prefix = '/character'

/**
 * 角色列表接口
 * @param {*} params
 * @returns
 */
export const characterListApi = params => get(`${prefix}/list`, params)
