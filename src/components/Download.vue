<script setup>
    import { ref } from 'vue';

    const props = defineProps(['data'])
    const cancel = defineEmits(['cancel'])
    const terminal = ref(null)
    defineExpose({ terminal })
</script>
<template>
    <div class="z-[999] fixed top-1/2 md:top-1/4 inset-x-0 mx-auto max-w-[500px] bg-white p-4 rounded-lg">
        <div class="flex flex-col space-y-2 px-6">
            <span class="font-bold tracking-wider text-center text-black uppercase text-xl">downloading</span>
            <span class="text-red-500 capitalize text-center text-xs font-semibold">*please don't close the tab</span>
            <div ref="terminal" class="bg-black p-2 py-4 min-h-72 max-h-96 overflow-y-auto rounded-lg text-white">
                <p v-for="log in data" class="break-words font-thin">
                    {{ log.msg }}
                </p>
            </div>
        </div>
        <div @click="$emit('cancel', $event)"
            class="bg-red-600 p-2 uppercase text-lg tracking-wider text-white cursor-pointer my-2 mx-12 rounded-lg text-center">
            cancel</div>
    </div>
</template>