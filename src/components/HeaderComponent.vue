<script setup>
    import { useInputStore } from '../stores/userInput.js'
    const inputStore = useInputStore()
    import { computed } from 'vue'
    const userName = computed({
        get: () => inputStore.userName,
        set: (value) => inputStore.setUserName(value)
    })
</script>






<template>
    <div class="d-flex justify-content-between align-items-center header">
        <div>
            <div v-if="!inputStore.userName">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#usernameModal">Set your username</button>
            </div>
            <h2 v-else data-bs-toggle="modal" data-bs-target="#usernameModal">{{ inputStore.userName }}</h2>

            <!-- Modale per l'inserimento del nome utente -->
            <div class="modal fade" id="usernameModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="usernameModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="usernameModalLabel">Inserisci Username</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex flex-column gap-4">
                            <label for="userName">Username</label>
                            <input type="text" v-model="userName" id="userName" name="userName" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Indietro</button>
                            <button type="button" class="btn btn-success" data-bs-dismiss="modal">Salva</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img src="../../public/logo.png" alt="Travel Buddy Logo" class="logo">
    </div>


  


</template>








<style scoped>
    .header{
        height: 10vh;
    }

    .logo{
        width: 5%;
    }


</style>