import { get } from '@/utils/axios.js'

const prefix = '/inventory-log'

/**
 * 库存列表接口
 * @param {*} params
 * @returns
 */
export const goodsInventoryLogApi = params => get(`${prefix}/list`, params)
