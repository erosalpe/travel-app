import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useArrayStore = defineStore('arrayStore', {
  state: () => ({
    arrayViaggi: []  // array contenente i viaggi
  }),

  actions: {
    addItem(item) {
      this.arrayViaggi.push(item);
      this.saveToLocalStorage();
    },
    removeItem(index) {
      this.arrayViaggi.splice(index, 1);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('arrayViaggi', JSON.stringify(this.arrayViaggi));
    },
    loadFromLocalStorage() {
      const storedArray = localStorage.getItem('arrayViaggi');
      if (storedArray) {
        this.arrayViaggi = JSON.parse(storedArray);
      }
    }
  }
});