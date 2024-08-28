<script setup>
import { useInputStore } from '../stores/userInput.js'
import { computed } from 'vue'

const inputStore = useInputStore()

const tripName = computed({
  get: () => inputStore.tripName,
  set: (value) => inputStore.setTripName(value)
})

const tripDays = computed({
  get: () => inputStore.tripDays,
  set: (value) => inputStore.setTripDays(value)
})

const tripCost = computed({
  get: () => inputStore.tripCost,
  set: (value) => inputStore.setTripCost(value)
})

function saveTrip(){
    inputStore.addItem(
        {
            nome: inputStore.tripName,
            durata: inputStore.tripDays,
            costo: inputStore.tripCost,
            tappe: [],
        }
    );

    inputStore.setTripName();
    inputStore.setTripDays();
    inputStore.setTripCost();
    console.log(inputStore.arrayViaggi);
}
</script>

<template>
    <div class="modal fade" id="tripModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Aggiungi un viaggio</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex flex-column gap-4">

                    <div class="d-flex flex-column">
                        <label for="tripName">Nome del viaggio:</label>
                        <input type="text" v-model="tripName" maxlength="32" placeholder="Massimo 32 caratteri" id="tripName" name="tripName"/>
                    </div>

                    <div class="d-flex flex-column">
                        <label for="tripDays">Durata del viaggio in giorni:</label>
                        <input type="number" v-model="tripDays" min="0" max="365" placeholder="Massimo 32 caratteri" id="tripDays" name="tripDays"/>
                    </div>

                    <div class="d-flex flex-column">
                        <label for="tripCost">Costo del viaggio:</label>
                        <input type="number" v-model="tripCost" min="0" max="9999999" placeholder="Massimo 32 caratteri" id="tripCost" name="tripCost"/>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Indietro</button>
                    <button type="button" class="btn btn-success" @click="saveTrip" data-bs-dismiss="modal">Aggiungi</button>
                </div>
            </div>
        </div>
    </div>
</template>