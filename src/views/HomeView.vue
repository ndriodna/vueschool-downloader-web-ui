<script setup>
import { ref, watch, watchEffect } from 'vue';
import Card from '../components/Card.vue';
import Filter from '../components/Filter.vue';

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const selectedCourse = ref()

const courses = ref([])
function selectCourse(id) {

  if (courses.value.includes(id)) {
    courses.value.splice(courses.value.indexOf(id), 1)
  } else {
    courses.value.push(id)
  }
}

</script>

<template>
  <main class="px-12">
    <Filter />

    {{ courses }}
    <div class="flex flex-auto flex-wrap justify-between py-2 gap-4">
      <Card v-for="(d, index) in data" :key="index" class="w-72 relative" @checked="selectCourse(index)"
        v-model="selectedCourse" />
    </div>
  </main>
</template>
