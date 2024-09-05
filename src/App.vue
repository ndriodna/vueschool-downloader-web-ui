<script setup>
  import { onMounted, onUnmounted } from "vue";
  import { RouterLink, RouterView } from "vue-router";
  import { useWs } from "./stores/Websocket";
  const { socket, connectWebsocket } = useWs()
  onMounted(() => {
    connectWebsocket()
  })
  onUnmounted(() => {
    if (socket.value) {
      socket.value.close()
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
