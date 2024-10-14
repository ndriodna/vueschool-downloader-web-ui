<script setup>
  import { onMounted, ref, watch, watchEffect } from 'vue';
  import Card from '../components/Card.vue';
  import Filter from '../components/Filter.vue';
  import { useCoursesStore } from '@/stores/Courses.js'
  import api from '@/api/api';
  import { useWsStore } from '@/stores/Websocket';

  const courseStore = useCoursesStore()
  const wsStore = useWsStore()

  const getCourse = () => {
    if (wsStore.isWsOpen()) {
      const token = $cookies.get('token_client')
      wsStore.socket.send(JSON.stringify({ type: 'getCourses', token: token }))
    } else {
      wsStore.errorMsg = 'disconnected from server, please refresh page'
    }
  }

  watch(wsStore.messages, (newMsg) => {
    if (newMsg.status == 'success') {
      courseStore.datas.push(newMsg.msg)
    }
  })

</script>

<template>
  <div @click="getCourse">get auth</div>
  <main class="px-12">
    <Filter />
    <div class="flex flex-auto flex-wrap justify-between py-2 gap-4">
      <Card v-for="(data, index) in courseStore.datas" :key="index" :data="data" class="w-72 relative"
        @selected="selectCourses($event)" :checked="data.isSelected" />
    </div>

    <div class="flex justify-center ">
      <div v-if="courseStore.selected.length > 0" class="flex fixed bottom-5">
        <RouterLink :to="{ name: 'download' }"
          class="px-4 py-2 bg-green-500 rounded-s-lg text-white flex space-x-2 cursor-pointer">
          <span class="space-x-2 ">{{ courseStore.selected.length
            }} courses</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            style="fill: rgba(255, 255, 255, 1);">
            <path
              d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z">
            </path>
          </svg>
        </RouterLink>
        <div @click="clearSelected()" class="bg-red-600 text-white p-2 rounded-e-lg cursor-pointer"><svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            style="fill: rgba(255, 255, 255, 1);">
            <path
              d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
            </path>
          </svg></div>
      </div>
    </div>
    <div class="absolute top-6 right-12">
      <Notif :datas="ErrorMsg" @closeNotif="(i) => ErrorMsg.splice(i, 1)" :status="false" />
      <Notif :datas="LoadingsMsg" @closeNotif="(i) => LoadingsMsg?.splice(i, 1)" :status="true" />
    </div>
  </main>
</template>
