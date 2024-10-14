<script setup>
    import SlideTransition from './SlideTransition.vue'

    const props = defineProps(['datas', 'status', 'isActive'])
    const emit = defineEmits(['closeNotif'])
    const removeNotif = (index) => {
        emit('closeNotif', index)
    }
</script>
<template>
    <SlideTransition>
        <div v-for="(data, index) in datas" :key="index"
            class="relative rounded-lg border-2 px-4 py-2 space-x-2 my-2 flex justify-between"
            :class="[status ? 'border-green-500' : 'border-red-500']">
            <label for="">{{ data?.msg }}</label>
            <label for="" @click="removeNotif(index)" class="relative right-0 text-red-700">X</label>
        </div>
    </SlideTransition>
</template>