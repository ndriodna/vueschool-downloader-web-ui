<script setup>
    defineProps(['type', 'name'])
    const model = defineModel()
</script>
<template>
    <div class="relative top-4">
        <input :type="type" :placeholder="name" v-model="model"
            class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-violet-600">
        <label for=""
            class="capitalize absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-lg">{{
                name }}</label>
    </div>
</template>