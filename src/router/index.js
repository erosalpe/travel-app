import { createRouter, createWebHistory } from 'vue-router'
import TravelApp from '../views/TravelApp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TravelApp
    },
  ]
})

export default router
