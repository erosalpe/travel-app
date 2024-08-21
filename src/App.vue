<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'

</script>

<template>
  <div class="px-5">
    <HeaderComponent/>
    <RouterView />
  </div>
</template>

<style scoped>

</style>
