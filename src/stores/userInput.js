import { defineStore } from 'pinia'

export const useInputStore = defineStore('inputStore', {
  state: () => ({
    clickedTripId: '',
    tripName: '',
    tripDays: '',
    tripCost: '',
    waypointName: '',
    waypointDescription: '',
    waypointDate: '',
    waypointTime: '',
    waypointImages: [],
    waypointCoordinates: '',
  }),
  actions: {
    setClickedTripId(value) {
      this.clickedTripId = value;
    },
    setTripName(value) {
      this.tripName = value;
    },
    setTripDays(value) {
        this.tripDays = value;
    },
    setTripCost(value) {
        this.tripCost = value;
    },
    setWaypointName(value) {
      this.waypointName = value;
    },
    setWaypointDescription(value) {
      this.waypointDescription = value;
    },
    setWaypointDate(value) {
      this.waypointDate = value;
    },
    setWaypointTime(value) {
      this.waypointTime = value;
    },
    setWaypointImages(value) {
      this.waypointImages = value;
    },
    setWaypointCoordinates(value) {
      this.waypointCoordinates = value;
    },
  }
})