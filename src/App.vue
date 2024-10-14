<script setup>
  import { onMounted, onUnmounted } from "vue";
  import { RouterLink, RouterView } from "vue-router";
  import { useWsStore } from "./stores/Websocket";
  const { socket, connectWebsocket } = useWsStore()
  onMounted(() => {
    connectWebsocket()
  })
  onUnmounted(() => {
    if (socket) {
      socket.close()
    }
  })
</script>

<template>
  <RouterView />
</template>

<style>
  body {
    background: #EDF3FF;
  }
</style>
