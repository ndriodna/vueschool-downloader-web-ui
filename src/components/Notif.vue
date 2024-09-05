<script setup>
    const props = defineProps(['msg', 'status', 'isActive'])
</script>
<template>
    <div class="relative rounded-lg border-2 px-4 py-2 space-x-4"
        :class="[status ? 'border-green-500' : 'border-red-500']">
        <label for="">{{ msg.msg }}</label>
        <label for="" @click="$emit('close')" class="relative right-0 text-red-700">X</label>
    </div>
</template>