<script setup>
import MapComponent from '../components/MapComponent.vue'
import { ref } from 'vue'
import AddTripModal from '../components/AddTripModal.vue'
import AddWaypointModal from '../components/AddWaypointModal.vue'
import OpenTripButton from '../components/OpenTripButton.vue'
import { useInputStore } from '../stores/userInput.js'
import L from 'leaflet';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';  // Importa gli stili del carosello

const inputStore = useInputStore();
const markers = ref([]); // Array per memorizzare i marker


// Stato per tracciare quale elemento è attualmente attivo
const activeIndex = ref(null)

// Funzione per aggiornare l'indice attivo
const setActiveIndex = (index) => {
    // Se l'elemento cliccato è già attivo, lo disattiviamo
    if (activeIndex.value === index) {
        activeIndex.value = null;

        // Itera su tutti i marker e rimuovili dalla mappa
        markers.value.forEach(marker => {
            marker.remove(); // Rimuove il marker dalla mappa
        });

        // Svuota l'array dei marker
        markers.value = [];
    } else {
        // Itera su tutti i marker e rimuovili dalla mappa
        markers.value.forEach(marker => {
            marker.remove(); // Rimuove il marker dalla mappa
        });

        // Svuota l'array dei marker
        markers.value = [];
        // Altrimenti, attiviamo l'elemento cliccato
        activeIndex.value = index;

        //crea i marker e li inserisce nell'array
        if (mapInstance.value) {
            inputStore.arrayViaggi[index].tappe.forEach((element) => {
                console.log(element.lat, element.lon);
                const newMarker = L.marker([element.lat, element.lon])
                    .addTo(mapInstance.value)
                    .bindPopup(`<b>${element.nome}</b>`)
                    .openPopup();
                markers.value.push(newMarker); // Aggiungi direttamente il marker
            });
        }
    }
}

// Funzione per ottenere lo stile in base all'elemento attivo
const getStyle = (index) => {
  // Imposta l'altezza di tutti a 70px
  inputStore.arrayViaggi.forEach((viaggio, indice) => {
    if (indice !== index) {
      viaggio.style = {
        height: '60px',
        transition: 'height 0.3s ease'
      };
    }
  });

  // Ritorna lo stile per l'elemento selezionato
  return {
    height: activeIndex.value === index ? '700px' : '60px',
    transition: 'height 0.3s ease'
  };
};

function getTripId(value){
    inputStore.setClickedTripId(value);
}

const mapInstance = ref(null);

function onMapReady(map) {
  mapInstance.value = map;
}

function showMarker(lat, lon, title) {
    console.log(lat, lon);
    if (mapInstance.value) {
        const precision = 1e-6; // Precisione di confronto
        const exists = markers.value.some(marker => 
            Math.abs(marker.getLatLng().lat - lat) < precision && 
            Math.abs(marker.getLatLng().lng - lon) < precision
        );

        if (!exists) {
            // Aggiungi il marker alla mappa
            const newMarker = L.marker([lat, lon]).addTo(mapInstance.value).bindPopup(`<b>${title}</b>`).openPopup();
            // Aggiungi il marker al tuo array di markers
            markers.value.push(newMarker); // Aggiungi direttamente il marker
            console.log('Marker aggiunto!');
        } else {
            console.log('Il marker esiste già.');
        }
        mapInstance.value.setView([lat, lon], 15);
    }
}
</script>






<template>
    <div id="h-app" class="d-flex gap-5">
        <div id="trip-container" class="w-50 bg-light p-4 rounded d-flex flex-column h-100 overflow-auto">
            <div class="align-self-end">

                <!-- Bottone aggiunta viaggi -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#tripModal">
                    Aggiungi un Viaggio
                </button>
                <AddTripModal/>
            </div>
            <span class="align-self-center m-auto fs-2"  v-if="inputStore.arrayViaggi.length <= 0">Non ci sono viaggi, aggiungine uno</span>
            
            <!--Parte sinistra contenente i viaggi-->
            <div v-else>
                <div class="d-flex flex-column gap-5 mt-5 w-100">
                    <div v-for="(trip,index) in inputStore.arrayViaggi" class="d-flex justify-content-between bg-primary p-3 rounded fs-6 single-trip" :id="index" :style="getStyle(index)">
                        <div class="overflow-hidden w-100">
                            <div class="gap-3 d-flex align-items-center align-self-start">
                                <span class="text-light">Nome: {{ trip.nome }}</span>
                                <span class="text-light">Durata: {{ trip.durata }} giorni</span>
                                <span class="text-light">Costo: {{ trip.costo }}€</span>
                            </div>
                            <div class="mt-4 d-flex gap-4">
                                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#waypointModal" @click="getTripId(index)">
                                    Aggiungi una Tappa
                                </button>
                                <button class="btn btn-danger" @click="inputStore.removeItem(index)">Rimuovi Viaggio</button>
                                <AddWaypointModal/>
                            </div>
                            <div class="d-flex gap-4 mt-3 flex-column waypoints-container">
                                <div v-for="(waypoint,index) in inputStore.arrayViaggi[index].tappe"class="bg-secondary-subtle rounded gap-3 waypoint-margin" @click="showMarker(waypoint.lat, waypoint.lon, waypoint.nome)">
                                    <div class="d-flex gap-4 p-3">
                                        <!-- Utilizza il componente Carousel con i componenti Slide, Pagination, e Navigation -->
                                        <Carousel :items-to-show="1" class="w-50">
                                            <Slide v-for="(image,index) in waypoint.immagini" :key="index">
                                                <img :src="image" class="card-img-top" alt="image">
                                            </Slide>

                                            <!-- Utilizza i template slots per aggiungere componenti aggiuntivi -->
                                            <template #addons>
                                                <Navigation />
                                                <Pagination />
                                            </template>
                                        </Carousel>
                                        <div class="card-body w-50 d-flex flex-column justify-content-between">
                                            <div>
                                                <h5 class="card-title mb-2 text-capitalize">{{ waypoint.nome }}</h5>
                                                <p class="card-text overflow-auto">{{ waypoint.descrizione }}</p>
                                            </div>
                                            <div>
                                                <p class="card-text">Data: {{ waypoint.data }}</p>
                                                <p class="card-text">Ora: {{ waypoint.ora }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <OpenTripButton :class="{ rotated: activeIndex === index }" @chevron-clicked="setActiveIndex(index)"/>
                    </div>
                </div>
            </div>
        </div>

        <!--Parte destra con mappa-->
        <div class="w-50 h-100" id="map-container">
            <MapComponent @map-ready="onMapReady"/>
        </div>
        
    </div>
</template>








<style scoped>
    #h-app{
        height: 88vh;
    }

    .rotated {
        transform: rotate(180deg);
        transition-duration: 0.3s ease;
    }

    #trip-container,
    #map-container,
    .single-trip
    {
        box-shadow: -1px 0px 15px 5px rgba(0,0,0,0.45);
        -webkit-box-shadow: -1px 0px 15px 5px rgba(0,0,0,0.45);
        -moz-box-shadow: -1px 0px 15px 5px rgba(0,0,0,0.45);
    }
    
    .card-img-top{
        width: 200px;
        height: 200px;
        border: 2px solid black;
        border-radius: 5px;
    }

    .waypoints-container{
        overflow: auto;
        height: 100%;
    }

    ::-webkit-scrollbar {
        display: none; /* Nascondi la barra di scorrimento */
    }

    .card-text.overflow-auto{
        height: 120px;
    }

    .waypoint-margin:last-child{
        margin-bottom: 100px;
    }
</style>