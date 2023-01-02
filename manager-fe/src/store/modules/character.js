import { defineStore } from 'pinia'
import { characterListApi } from '@/api'
import { CHARACTER_LIST_KEY } from '@/store/modules-types.js'

export const useCharacterStore = defineStore({
  id: 'character',
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage, //localStorage存储多个key
        key: CHARACTER_LIST_KEY
      }
    ]
  },
  state: () => ({
    characterList: []
  }),
  getters: {
    getCharacterList() {
      return this.characterList
    }
  },
  actions: {
    async setCharacterList(params = {}) {
      const res = await characterListApi(params)
      const list = res.data?.rows || []
      this.characterList = list
    }
  }
})
