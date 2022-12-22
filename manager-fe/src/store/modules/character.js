import { defineStore } from 'pinia'
import { characterListApi } from '@/api'
import { CHARACTER_LIST_KEY } from '@/store/modules-types.js'

export const useCharacterStore = defineStore({
  id: 'character',
  state: () => ({
    characterList: []
  }),
  getters: {
    getCharacterList() {
      return (
        this.characterList ||
        JSON.parse(localStorage.getItem(CHARACTER_LIST_KEY))
      )
    }
  },
  actions: {
    async setCharacterList(params = {}) {
      const res = await characterListApi(params)
      const list = res.data?.rows || []
      this.characterList = list
      localStorage.setItem(CHARACTER_LIST_KEY, JSON.stringify(list))
    }
  }
})
