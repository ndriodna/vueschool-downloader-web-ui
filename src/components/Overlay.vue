<script setup>
import { onMounted, onUnmounted } from 'vue'

let body = document.body
onMounted(() => {
    body.classList.add('overflow-hidden', 'md:overflow-y-auto', 'w-screen', 'h-screen')
})
onUnmounted(() => {
    body.classList.remove('overflow-hidden', 'md:overflow-y-auto', 'w-screen', 'h-screen')
})
</script>
<template>
    <div class="fixed inset-0 bg-gray-900 opacity-50 z-[999]"></div>
</template>