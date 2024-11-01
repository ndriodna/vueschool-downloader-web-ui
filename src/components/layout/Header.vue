<script setup>

</script>
<template>
    <nav class="fixed bg-violet-950 w-full py-2 z-[999] select-none">
        <div class="mx-auto flex content-center">
            <div class="flex justify-center w-full font-bold text-lg text-white">
                <router-link :to="{ name: 'home' }" class="p-2 bg-slate-400 rounded-xl">Vue-School
                    Downloader</router-link>
            </div>
        </div>
    </nav>
</template>