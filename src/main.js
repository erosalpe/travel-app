import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'vue3-carousel/dist/carousel.css';
import { useArrayStore } from './stores/travels.js';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const arrayStore = useArrayStore();

// Load stored state from localStorage when app starts
arrayStore.loadFromLocalStorage();


app.mount('#app')
