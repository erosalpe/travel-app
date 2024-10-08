import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'vue3-carousel/dist/carousel.css';
import { useInputStore } from './stores/userInput';

import { createApp,watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const inputStore = useInputStore();
inputStore.loadFromLocalStorage();

app.mount('#app')
