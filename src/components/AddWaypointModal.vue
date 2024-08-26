<script setup>
import { useInputStore } from '../stores/userInput.js'
import { computed } from 'vue'
import { useArrayStore } from '../stores/travels.js'

const arrayStore = useArrayStore();

const inputStore = useInputStore()

const waypointName = computed({
  get: () => inputStore.waypointName,
  set: (value) => inputStore.setWaypointName(value)
})

const waypointDescription = computed({
  get: () => inputStore.waypointDescription,
  set: (value) => inputStore.setWaypointDescription(value)
})

const waypointDate = computed({
  get: () => inputStore.waypointDate,
  set: (value) => inputStore.setWaypointDate(value)
})

const waypointTime = computed({
  get: () => inputStore.waypointTime,
  set: (value) => inputStore.setWaypointTime(value)
})

const waypointImages = computed({
  get: () => inputStore.waypointImages,
  set: (value) => inputStore.setWaypointImages(value)
})

const waypointCoordinates = computed({
  get: () => inputStore.waypointCoordinates,
  set: (value) => inputStore.setWaypointCoordinates(value)
})

function saveWaypoint(){
    arrayStore.arrayViaggi[inputStore.clickedTripId].tappe.push(
        {
            nome: inputStore.waypointName,
            descrizione: inputStore.waypointDescription,
            data: inputStore.waypointDate,
            ora: inputStore.waypointTime,
            immagini: inputStore.waypointImages,
            coordinate: inputStore.waypointCoordinates
        }
    );

    console.log(arrayStore.arrayViaggi[inputStore.clickedTripId].tappe);
    inputStore.setWaypointName()
    inputStore.setWaypointDescription()
    inputStore.setWaypointDate()
    inputStore.setWaypointTime()
    inputStore.setWaypointImages()
    inputStore.setWaypointCoordinates()
    
}
</script>






<template>
    <div class="modal fade" id="waypointModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Aggiungi una Tappa</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex flex-column gap-4">

                    <div class="d-flex flex-column">
                        <label for="tripName">Nome della tappa:</label>
                        <input type="text" v-model="waypointName" maxlength="32" placeholder="Massimo 32 caratteri" id="tripName" name="tripName"/>
                    </div>

                    <div class="d-flex flex-column">
                        <label for="tripDays">Descrizione:</label>
                        <input type="number" v-model="waypointDescription" min="0" max="365" placeholder="Massimo 32 caratteri" id="tripDays" name="tripDays"/>
                    </div>

                    <div class="d-flex flex-column">
                        <label for="tripCost">Data:</label>
                        <input type="number" v-model="waypointDate" min="0" max="9999999" placeholder="Massimo 32 caratteri" id="tripCost" name="tripCost"/>
                    </div>

                    <div class="d-flex flex-column">
                        <label for="tripCost">Orario:</label>
                        <input type="number" v-model="waypointTime" min="0" max="9999999" placeholder="Massimo 32 caratteri" id="tripCost" name="tripCost"/>
                    </div>

                    <div class="d-flex flex-column">
                        <label for="tripCost">Immagini:</label>
                        <input type="number" v-model="waypointImages" min="0" max="9999999" placeholder="Massimo 32 caratteri" id="tripCost" name="tripCost"/>
                    </div>

                    <div class="d-flex flex-column">
                        <label for="tripCost">Coordinate:</label>
                        <input type="number" v-model="waypointCoordinates" min="0" max="9999999" placeholder="Massimo 32 caratteri" id="tripCost" name="tripCost"/>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Indietro</button>
                    <button type="button" class="btn btn-success" @click="saveWaypoint">Aggiungi</button>
                </div>
            </div>
        </div>
    </div>
</template>








<style scoped>
    




</style>