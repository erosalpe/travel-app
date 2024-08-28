<script setup>
import { useInputStore } from '../stores/userInput.js'
import { computed } from 'vue'
import waypointSearch from '../components/waypointSearch.vue'

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

function saveWaypoint(){
    inputStore.arrayViaggi[inputStore.clickedTripId].tappe.push(
        {
            nome: inputStore.waypointName,
            descrizione: inputStore.waypointDescription,
            data: inputStore.waypointDate,
            ora: inputStore.waypointTime,
            immagini: inputStore.waypointImages,
            lat: inputStore.waypointLat,
            lon: inputStore.waypointLon,
        }
    );

    console.log(inputStore.arrayViaggi[inputStore.clickedTripId].tappe);
    inputStore.setWaypointName()
    inputStore.setWaypointDescription()
    inputStore.setWaypointDate()
    inputStore.setWaypointTime()
    inputStore.resetWaypointImages([])
    inputStore.setWaypointLat(0)
    inputStore.setWaypointLon(0)
}

import { ref } from 'vue';

// Stato per memorizzare le anteprime delle immagini
const imagePreviews = ref([]);

// Funzione per gestire il caricamento dei file
const handleFileChange = (event) => {
  const files = event.target.files;
  console.log(inputStore.waypointImages);

  // Crea un array di FileReader Promises per leggere le immagini
  const filePromises = Array.from(files).map((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file); // Legge il file come URL di dati
    });
  });

  // Quando tutte le immagini sono lette, aggiorna lo stato delle anteprime
  Promise.all(filePromises).then((urls) => {
    imagePreviews.value = urls; // Solo per anteprima
    inputStore.setWaypointImages(urls); // Aggiungi le immagini allo store
  }).catch((error) => {
    console.error('Error reading files:', error);
  });
};
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
                        <label for="waypointName">Nome della tappa:</label>
                        <input type="text" v-model="waypointName" maxlength="32" placeholder="Massimo 32 caratteri" id="waypointName" name="waypointName"/>
                    </div>

                    <div class="d-flex flex-column">
                        <label for="waypointDesc">Descrizione:</label>
                        <textarea v-model="waypointDescription" rows="4" cols="50" id="waypointDesc" name="waypointDesc"/>
                    </div>

                    <div class="d-flex flex-column">
                        <label for="waypointDate">Data:</label>
                        <input type="date" v-model="waypointDate" id="waypointDate" name="waypointDate"/>
                    </div>

                    <div class="d-flex flex-column">
                        <label for="waypointTime">Orario:</label>
                        <input type="time" v-model="waypointTime" id="waypointTime" name="waypointTime"/>
                    </div>

                    <div>
                        <div class="d-flex flex-column">
                            <label for="waypointImage">Immagini:</label>
                            <input type="file" @change="handleFileChange" multiple accept="image/*" id="waypointImage" name="waypointImage"/>
                        </div>
    
                        <div v-if="inputStore.waypointImages.length">
                            <div v-for="(image, index) in inputStore.waypointImages" :key="index" class="image-preview">
                                <img :src="image" alt="Preview" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <waypointSearch/>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Indietro</button>
                    <button type="button" class="btn btn-success" @click="saveWaypoint" data-bs-dismiss="modal">Aggiungi</button>
                </div>
            </div>
        </div>
    </div>
</template>








<style scoped>
    
/* Aggiungi stili per le immagini di anteprima */
.image-preview {
  display: inline-block;
  margin: 5px;
}

.image-preview img {
  max-width: 150px;
  max-height: 150px;
}



</style>