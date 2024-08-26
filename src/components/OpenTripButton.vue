<script setup>
    import { defineEmits } from 'vue';

    const emit = defineEmits(['chevron-clicked']);

    function handleClick() {
    emit('chevron-clicked');
    }
</script>

<template>
    <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" @click="handleClick">
        <path fill="#000000" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
    </svg>
</template>

<style scoped>
    .chevron{
        width: 4%;
        cursor: pointer;
        align-self: start;
    }
</style>