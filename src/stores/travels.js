import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useArrayStore = defineStore('arrayStore', {
  state: () => ({
    arrayViaggi: []  // array contenente i viaggi
  }),
  actions: {
    addItem(item) {
      this.arrayViaggi.push(item)
    },
    removeItem(index) {
      this.arrayViaggi.splice(index, 1)
    },
  }
})
