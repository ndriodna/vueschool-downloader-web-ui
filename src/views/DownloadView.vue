<script setup>
import { useCoursesStore } from '@/stores/Courses.js'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const { datas, selected } = useCoursesStore()
function selectedCourses() {
    return datas.filter(data => selected.value.includes(data.id))
}
function backHome() {
    selected.value = []
    router.push({ name: 'home' })
}
console.log(selected)
</script>
<template>
    <div class="mx-auto max-w-96 py-6">
        <div v-for="data in selectedCourses()" :key="data.id" class="flex flex-col bg-white rounded-lg px-2 py-1 mb-5 ">
            <div class="flex justify-center space-x-6 text-sm font-bold capitalize">
                <span class="text-blue-500">{{ data.lesson }} lesson</span>
                <span class="text-orange-300">{{ data.level }}</span>
            </div>
            <div class="flex items-center px-2 text-lg font-semibold">
                <div class="w-full flex justify-center">{{ data.title }}</div>
            </div>
            <div class="relative">
                <svg class="absolute right-0 bottom-2.5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" viewBox="0 0 24 24" style="fill: red;">
                    <path
                        d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z">
                    </path>
                    <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                </svg>
            </div>
        </div>
        <div class="space-y-2">
            <div class="p-4 rounded-lg bg-green-500 text-white items-center text-center cursor-pointer">Start Download
            </div>
            <div @click="backHome" class="bg-red-400 text-white p-2 rounded-lg cursor-pointer text-center items-center">
                Back
            </div>
        </div>
    </div>
</template>