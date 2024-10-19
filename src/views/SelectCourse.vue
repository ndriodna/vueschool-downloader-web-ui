<script setup>
    import { useCoursesStore } from '@/stores/Courses.js'
    import { useRoute, useRouter } from 'vue-router';
    import Download from '@/components/Download.vue'
    import Overlay from '@/components/Overlay.vue'
    import Notif from '@/components/Notif.vue';
    import { ref, watchEffect } from 'vue';
    import { useWsStore } from '@/stores/Websocket';

    const router = useRouter()
    const courseStore = useCoursesStore()
    const wsStore = useWsStore()

    const download = ref(false)

    function backHome() {
        courseStore.clearSelected()
        router.push({ name: 'home' })
    }
    watchEffect(() => {
        if (wsStore.messages?.type == 'getSelectedLesson' && wsStore.messages?.status == 'success') {
            courseStore.lessons = wsStore.messages.msg
            setTimeout(() => {
                wsStore.loading.shift()
            }, 2000);
        }
        if (wsStore.messages?.msg.includes('timeout')) {
            courseStore.getLessons()
        }
        if (wsStore.errorMsg.length > 0) {
            setTimeout(() => {
                wsStore.errorMsg.shift()
            }, 5000);
        }
    })
</script>
<template>
    <div class="mx-auto max-w-96 py-6">
        <div v-if="courseStore.selected.length > 0 || courseStore.lessons.length < 0"
            v-for="(data, index) in courseStore.selectedCourses()" :key="data.id"
            class="flex justify-center px-2 py-1 mb-5 w-full rounded-lg bg-white items-center">
            <div class="flex flex-col w-full">
                <div class="flex justify-center space-x-6 text-sm font-bold capitalize">
                    <span class="text-blue-500">{{ data.lesson }} lesson</span>
                    <span class="text-orange-300">{{ data.level }}</span>
                </div>
                <div class="flex items-center px-2 text-lg font-semibold">
                    <div class="w-full flex justify-center text-center">{{ data.title }}</div>
                </div>
            </div>
            <div class="relative">
                <svg @click="courseStore.removeSelected(index)" class="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: red;">
                    <path
                        d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z">
                    </path>
                    <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                </svg>
            </div>
        </div>

        <div class="space-y-2">
            <div v-if="courseStore.selected.length > 0 || courseStore.lessons.length < 0"
                @click="courseStore.getLessons"
                class="p-2 rounded-lg bg-green-500 text-white text-center cursor-pointer text-2xl font-bold tracking-wide capitalize select-none">
                get lessons
            </div>
            <span v-else class="uppercase text-2xl font-bold flex justify-center">please select courses
                first!</span>
            <div @click="backHome"
                class="bg-red-500 font-semibold text-white p-2 rounded-lg cursor-pointer text-center items-center">
                Back
            </div>
        </div>

        <div v-if="courseStore.lessons.length > 0" class="flex">
            <div v-for="lesson in courseStore.lessons">
                {{ lesson.title }}
                {{ lesson.urls }}
            </div>
        </div>
    </div>
    <Overlay v-if="download" />
    <Download v-if="download" @cancel="download = false" />
    <div class="fixed top-10 right-12 z-[999]">
        <Notif :datas="wsStore.errorMsg" @closeNotif="(i) => wsStore.errorMsg?.splice(i, 1)" :isSuccess="false" />
        <Notif :datas="wsStore.loading" @closeNotif="(i) => wsStore.loading?.splice(i, 1)" :isSuccess="true" />
    </div>
</template>