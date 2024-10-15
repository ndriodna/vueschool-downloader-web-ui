<script setup>
    import SlideTransition from './SlideTransition.vue'

    const props = defineProps(['datas', 'isSuccess'])
    const emit = defineEmits(['closeNotif'])
    const removeNotif = (index) => {
        emit('closeNotif', index)
    }
</script>
<template>
    <SlideTransition>
        <div v-for="(data, index) in datas" :key="index"
            class="relative rounded-lg text-white font-semibold capitalize px-4 py-2 space-x-6 my-2 flex justify-between z-50"
            :class="[isSuccess ? 'bg-green-500' : 'bg-red-500']">
            <label for="">{{ data?.msg }}</label>
            <label for="" @click="removeNotif(index)" class="relative right-0 font-bold text-white ">X</label>
        </div>
    </SlideTransition>
</template>