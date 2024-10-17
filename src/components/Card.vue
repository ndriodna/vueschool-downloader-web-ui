<script setup>
    import { watchEffect } from 'vue';

    const emit = defineEmits(['selected'])
    const props = defineProps(['checked', 'data', "selectedItem"])

    function selectedCourses() {
        if (!isNotSelected()) {
            emit('selected', props.data)
        }
    }
    function isNotSelected() {
        return props.selectedItem.length >= 3 && !props.data.isSelected
    }
</script>
<template>
    <label :class="[isNotSelected() ? 'cursor-not-allowed select-none' : 'cursor-pointer']">
        <input type="checkbox" :checked="props.data.isSelected" @change="selectedCourses" class="peer sr-only"
            :disabled="isNotSelected()">
        <span :class="[isNotSelected() ? 'opacity-0 peer-checked:opacity-0' : 'opacity-100 peer-checked:opacity-0']"
            class=" absolute right-2 top-2 z-10 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                style="fill: rgba(0, 0, 0, 1);">
                <path
                    d="M12 2C6.486 2 2 6.486 2 12c.001 5.515 4.487 10.001 10 10.001 5.514 0 10-4.486 10.001-10.001 0-5.514-4.486-10-10.001-10zm0 18.001c-4.41 0-7.999-3.589-8-8.001 0-4.411 3.589-8 8-8 4.412 0 8.001 3.589 8.001 8-.001 4.412-3.59 8.001-8.001 8.001z">
                </path>
            </svg>
        </span>
        <span :class="[isNotSelected() ? 'opacity-0 peer-checked:opacity-0' : 'opacity-0 peer-checked:opacity-100']"
            class=" absolute right-2 top-2 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                style="fill: rgba(22, 163, 74, 1);">
                <path
                    d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z">
                </path>
            </svg>
        </span>
        <div :class="[isNotSelected() ? 'blur-sm' : 'bg-white peer-checked:ring-green-500 active:scale-90']"
            class="transition-all  flex flex-col space-y-4 justify-center rounded-lg px-8 py-8 ring ring-transparent ">
            <div class="flex justify-start">
                <div class="text-red-600 font-mono text-lg uppercase tracking-wide">Premium</div>
            </div>
            <img :src="data.thumbnail" alt="" class=" bg-slate-500 h-40 overflow-hidden rounded-xl w-full bg-contain">
            <div class="font-medium text-lg ">{{ data.title }}</div>
            <div class="p-1 bg-[#736CC8] flex justify-between space-x-6 rounded-xl font-bold mb-12 px-2 items-center">
                <div class="text-white">{{ data.lesson }} lesson</div>
                <div class="text-green-400">{{ data.level }}</div>
            </div>
        </div>
    </label>
</template>