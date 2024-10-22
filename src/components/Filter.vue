<script setup>
    const model = defineModel({ default: "" })
</script>
<template>
    <div class="flex justify-end space-x-4 w-full">
        <select v-model="model" class="bg-slate-300 p-2 rounded-lg">
            <option value="">Type courses</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
        </select>
    </div>
</template>