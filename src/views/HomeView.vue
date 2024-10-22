<script setup>
  import { computed, onMounted, ref, watch, watchEffect } from 'vue';
  import Card from '../components/Card.vue';
  import Filter from '../components/Filter.vue';
  import { useCoursesStore } from '@/stores/Courses.js'
  import api from '@/api/api';
  import { useWsStore } from '@/stores/Websocket';
  import Notif from '@/components/Notif.vue';

  const courseStore = useCoursesStore()
  const wsStore = useWsStore()

  const filter = ref()

  const filteredData = computed(() => {
    if (filter.value?.length > 0) {
      return courseStore.filterTypeCourse(filter.value)
    }
    return courseStore.datas
  })

  watchEffect(() => {
    if (!courseStore.isStorageExist()) {
      courseStore.datas = []
      if (wsStore.messages?.type == 'getCourses' && wsStore.messages?.status == 'success') {
        courseStore.datas = wsStore.messages.msg
        localStorage.setItem('courses', JSON.stringify(courseStore.datas))
        wsStore.messages = []
      }
    }
    if (wsStore.messages?.msg?.includes('timeout')) {
      courseStore.getCourse()
    }
    if (wsStore.loading.length > 0) {
      setTimeout(() => {
        wsStore.loading.splice(0, 1)
      }, 2000);
    }
    if (wsStore.errorMsg.length > 0) {
      setTimeout(() => {
        wsStore.errorMsg.shift()
      }, 5000)
    }
  })

</script>

<template>
  <main class="px-12">
    <div class="flex justify-center ">
      <div @click="courseStore.getCourse()"
        class="capitalize p-2 rounded-lg text-white cursor-pointer active:bg-violet-900 select-none bg-[#736CC8]">{{
          courseStore.isStorageExist() ? 'update courses' : 'get courses' }}</div>
    </div>
    <Filter v-model="filter" />
    <div class="flex flex-auto flex-wrap justify-between py-2 gap-4">
      <Card v-for="(data, index) in filteredData" :key="index" :data="data" class="w-72 relative"
        @selected="courseStore.selectCourses($event)" :checked="data.isSelected" :selectedItem="courseStore.selected"
        :max-batch="courseStore.maxBatch" />
    </div>

    <div class="flex justify-center ">
      <div v-if="courseStore.selected.length > 0" class="flex fixed bottom-10">
        <RouterLink :to="{ name: 'selectcourse' }"
          class="px-4 py-2 bg-green-500 rounded-s-lg text-white flex space-x-4 cursor-pointer font-semibold">
          <span class="space-x-2">{{ courseStore.selected.length
            }} courses</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            style="fill: rgba(255, 255, 255, 1);">
            <path
              d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z">
            </path>
          </svg>
        </RouterLink>
        <div @click="courseStore.clearSelected()" class="bg-red-600 text-white p-2 rounded-e-lg cursor-pointer"><svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            style="fill: rgba(255, 255, 255, 1);">
            <path
              d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
            </path>
          </svg></div>
      </div>
    </div>
  </main>
  <div class="fixed top-10 right-12 z-[999]">
    <Notif :datas="wsStore.errorMsg" @closeNotif="(i) => wsStore.errorMsg?.splice(i, 1)" :isSuccess="false" />
    <Notif :datas="wsStore.loading" @closeNotif="(i) => wsStore.loading?.splice(i, 1)" :isSuccess="true" />
  </div>
</template>
