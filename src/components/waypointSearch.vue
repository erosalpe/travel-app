<script setup>
    import { useInputStore } from '../stores/userInput.js'
    import { ref } from 'vue';

    const inputStore = useInputStore()

    // Variabili di stato
    const query = ref('');
    const results = ref([]);

    let timeout = null;

    const searchLocation = () => {
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
        if (query.value.length < 3) {
        results.value = [];
        return;
        }

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query.value)}&format=json&addressdetails=1&limit=5`;

        try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Errore nella richiesta');
        }
        const data = await response.json();
        results.value = data;
        } catch (error) {
        console.error('Errore durante la ricerca:', error);
        }
    }, 300); // Esegue la ricerca dopo 300ms di inattività
    };

    // Funzione per selezionare la località e salvare le coordinate nello store
    const selectLocation = (result) => {
        console.log(result.lat, result.lon);
        inputStore.setWaypointLat(result.lat);
        inputStore.setWaypointLon(result.lon);
        console.log('Coordinate salvate:', inputStore.waypointLat, inputStore.setWaypointLon);
        results.value = [];
    };
</script>

<template>
    <div>
        <div class="d-flex gap-3">
            <input 
                type="text" 
                v-model="query" 
                @input="searchLocation" 
                placeholder="Cerca un luogo..." 
            />
            <svg v-if="inputStore.waypointLat" class="green-check bg-success rounded-5 p-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#000000" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
        </div>
        <ul v-if="results.length" class="overflow-auto">
            <li v-for="(result, index) in results" :key="index" @click="selectLocation(result)" class="search-list-element">
                {{ result.display_name }}
            </li>
        </ul>
  </div>
</template>

<style scoped>
.green-check{
    width: 30px;
}

.search-list-element:hover{
    color: blue;
}

.search-list-element:hover{
    cursor: pointer;
}
</style>