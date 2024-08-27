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
    setUserName(value) {
      this.userName = value;
      this.saveToLocalStorage();
    },
    setClickedTripId(value) {
      this.clickedTripId = value;
      this.saveToLocalStorage();
    },
    setTripName(value) {
      this.tripName = value;
      this.saveToLocalStorage();
    },
    setTripDays(value) {
        this.tripDays = value;
        this.saveToLocalStorage();
    },
    setTripCost(value) {
        this.tripCost = value;
        this.saveToLocalStorage();
    },
    setWaypointName(value) {
      this.waypointName = value;
      this.saveToLocalStorage();
    },
    setWaypointDescription(value) {
      this.waypointDescription = value;
      this.saveToLocalStorage();
    },
    setWaypointDate(value) {
      this.waypointDate = value;
      this.saveToLocalStorage();
    },
    setWaypointTime(value) {
      this.waypointTime = value;
      this.saveToLocalStorage();
    },
    setWaypointImages(newImages) {
      this.waypointImages = [...this.waypointImages, ...newImages];
      this.saveToLocalStorage();
    },
    resetWaypointImages(value) {
      this.waypointImages = value;
      this.saveToLocalStorage();
    },
    setWaypointLat(value) {
      this.waypointLat = value;
      this.saveToLocalStorage();
    },
    setWaypointLon(value) {
      this.waypointLon = value;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('inputStore', JSON.stringify(this.$state));
    },
    removeWaypoint(index){
      this.arrayViaggi.tappe.splice(index, 1)
    },
    loadFromLocalStorage() {
      const storedState = localStorage.getItem('inputStore');
      if (storedState) {
        this.$state = JSON.parse(storedState);
      }
    }
  }
});