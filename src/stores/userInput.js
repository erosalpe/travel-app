import { defineStore } from 'pinia'

export const useInputStore = defineStore('inputStore', {
  state: () => ({
    userName: '',
    clickedTripId: '',
    tripName: '',
    tripDays: '',
    tripCost: 0,
    waypointName: '',
    waypointDescription: '',
    waypointDate: '',
    waypointTime: '',
    waypointImages: [],
    waypointLat: 0,
    waypointLon: 0,
  }),
  actions: {
    setUserName(value) {
      this.userName = value;
    },
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
    setWaypointImages(newImages) {
      this.waypointImages = [...this.waypointImages, ...newImages];
    },
    resetWaypointImages(value) {
      this.waypointImages = value;
    },
    setWaypointLat(value) {
      this.waypointLat = value;
    },
    setWaypointLon(value) {
      this.waypointLon = value;
    },
  }
})