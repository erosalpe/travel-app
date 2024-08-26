<script setup>
import { onMounted } from 'vue'
import L from 'leaflet';

const emit = defineEmits(['map-ready']);

onMounted(() => {
  var map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  
  // Emetti l'istanza della mappa al componente padre
  emit('map-ready', map);
});


</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
  #map { 
    width: 100%;
    height: 100%;
  }
</style>