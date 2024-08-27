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
    };
</script>

<template>
    <div>
        <input 
            type="text" 
            v-model="query" 
            @input="searchLocation" 
            placeholder="Cerca un luogo..." 
        />
        <ul v-if="results.length">
            <li v-for="(result, index) in results" :key="index" @click="selectLocation(result)">
                {{ result.display_name }}
            </li>
        </ul>
  </div>
</template>

<style scoped>

</style>