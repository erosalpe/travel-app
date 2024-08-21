import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useArrayStore = defineStore('arrayStore', {
  state: () => ({
    arrayViaggi: []  // array contenente i viaggi
  }),
  actions: {
    addItem(item) {
      this.items.push(item)
    },
    removeItem(index) {
      this.items.splice(index, 1)
    },
  }
})
