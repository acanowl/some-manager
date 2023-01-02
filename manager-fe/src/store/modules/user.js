import { defineStore } from 'pinia'
import { filterAsyncRouter, clone } from '@/utils/tool'
import { USER_INFO_KEY, ROUTERS_KEY } from '@/store/modules-types.js'
import { layoutMap } from '@/router/routes'

export const useUserStore = defineStore({
  id: 'user',
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage, //localStorage存储多个key
        paths: ['userInfo'],
        key: USER_INFO_KEY
      },
      {
        storage: localStorage,
        paths: ['routers'],
        key: ROUTERS_KEY
      }
    ]
  },
  state: () => ({
    userInfo: null,
    routers: []
  }),
  getters: {
    getUserInfo() {
      return this.userInfo
    },
    getRouters() {
      return this.routers
    }
  },
  actions: {
    setUserInfo(info) {
      this.userInfo = info
      const deepCopy = clone(layoutMap)
      const accessedRouters = filterAsyncRouter(deepCopy, info.character)
      this.routers = accessedRouters
    }
  }
})
