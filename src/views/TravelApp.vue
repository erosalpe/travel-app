<script setup>
import MapComponent from '../components/MapComponent.vue'
import { useArrayStore } from '../stores/travels.js'
import { ref } from 'vue'
import AddTripModal from '../components/AddTripModal.vue'
import AddWaypointModal from '../components/AddWaypointModal.vue'
import OpenTripButton from '../components/OpenTripButton.vue'
const arrayStore = useArrayStore();

// Stato per tracciare quale elemento è attualmente attivo
const activeIndex = ref(null)

// Funzione per aggiornare l'indice attivo
const setActiveIndex = (index) => {
  // Se l'elemento cliccato è già attivo, lo disattiviamo
  if (activeIndex.value === index) {
    activeIndex.value = null
  } else {
    // Altrimenti, attiviamo l'elemento cliccato
    activeIndex.value = index
  }
}

// Funzione per ottenere lo stile in base all'elemento attivo
const getStyle = (index) => {
  return {
    height: activeIndex.value === index ? '500px' : '68px',
    transition: 'height 0.3s ease'
  }
}
</script>






<template>
    <div id="h-app" class="d-flex gap-5">
        <div id="empty-trip-container" class="w-50 bg-light p-3 rounded d-flex flex-column h-100">
            <div class="align-self-end">

                <!-- Bottone aggiunta viaggi -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#tripModal">
                    Aggiungi un Viaggio
                </button>
                <AddTripModal/>
            </div>
            <span class="align-self-center m-auto fs-2"  v-if="arrayStore.arrayViaggi.length <= 0">Non ci sono viaggi, aggiungine uno</span>
            
            <!--Parte sinistra contenente i viaggi-->
            <div v-else>
                <div class="d-flex flex-column gap-5 mt-5 w-100">
                    <div v-for="(trip,index) in arrayStore.arrayViaggi" class="d-flex justify-content-between bg-primary p-3 rounded fs-4" :id="index" :style="getStyle(index)"  @click="setActiveIndex(index)">
                        <div class="gap-3 d-flex align-items-start">
                            <span class="text-light">Nome: {{ trip.nome }}</span>
                            <span class="text-light">Durata: {{ trip.durata }} giorni</span>
                            <span class="text-light">Costo: {{ trip.costo }}€</span>
                            <button type="button" class="btn btn-warning align-self-start" data-bs-toggle="modal" data-bs-target="#waypointModal">
                                Aggiungi una Tappa
                            </button>
                            <AddWaypointModal/>
                        </div>
                        <OpenTripButton :class="{ rotated: activeIndex === index }" />
                    </div>
                </div>
            </div>
        </div>

        <!--Parte destra con mappa-->
        <div class="w-50 h-100">
            <MapComponent/>
        </div>
        
    </div>
</template>








<style scoped>
    #h-app{
        height: 90vh;
    }

    .rotated {
        transform: rotate(180deg);
        transition-duration: 0.3s ease;
    }
</style>