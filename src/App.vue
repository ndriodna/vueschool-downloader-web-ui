<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/layout/Header.vue";
</script>

<template>
  <Header />

  <div class="relative top-20">
    <RouterView />
  </div>
</template>

<style>
body {
  background: #EDF3FF;
}
</style>
