<script setup>
import MapComponent from '../components/MapComponent.vue'
import { useArrayStore } from '../stores/travels.js'
import { ref } from 'vue'
import AddTripModal from '../components/AddTripModal.vue'
const arrayStore = useArrayStore();

//arrayStore.arrayViaggi.push(1);
console.log(arrayStore.arrayViaggi);
</script>






<template>
    <div id="h-app" class="d-flex gap-5">
        <div id="empty-trip-container" class="w-50 bg-light p-3 rounded d-flex flex-column h-100">
            <div class="align-self-end">
                <!-- Bottone aggiunta viaggi -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Aggiungi un Viaggio
                </button>
                <AddTripModal/>
            </div>
            <span class="align-self-center m-auto fs-2"  v-if="arrayStore.arrayViaggi.length <= 0">Non ci sono viaggi, aggiungine uno</span>
            <div v-else>
                <div class="d-flex flex-column gap-5 mt-5 w-100">
                    <div v-for="trip in arrayStore.arrayViaggi" class="d-flex gap-5 bg-primary p-3 rounded text-light fs-4">
                        <span>Nome: {{ trip.nome }}</span>
                        <span>Durata: {{ trip.durata }} giorni</span>
                        <span>Costo: {{ trip.costo }}€</span>
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




</style>