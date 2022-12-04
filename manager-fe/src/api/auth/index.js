import { post } from '@/utils/axios.js'

export const registerAccount = params => {
  return post('/register', params)
}
