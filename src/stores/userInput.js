import { defineStore } from 'pinia'

export const useInputStore = defineStore('inputStore', {
  state: () => ({
    tripName: '',
    tripDays: '',
    tripCost: ''
  }),
  actions: {
    setTripName(value) {
      this.tripName = value;
    },
    setTripDays(value) {
        this.tripDays = value;
    },
    setTripCost(value) {
        this.tripCost = value;
    },
  }
})