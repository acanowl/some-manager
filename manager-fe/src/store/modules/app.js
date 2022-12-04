import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    breadCrumb: []
  }),
  getters: {
    getBreadCrumb() {
      return this.breadCrumb
    }
  },
  actions: {
    setBreadCrumb(breadCrumb) {
      this.breadCrumb = breadCrumb
    }
  }
})
