<script setup>
    import InputForm from '@/components/InputForm.vue';
    import { useWsStore } from '@/stores/Websocket';
    import axios from 'axios';
    import { reactive, ref, watchEffect } from 'vue';
    import Notif from '@/components/Notif.vue';
    import { useRouter } from 'vue-router';
    import api from '@/api/api';

    const router = useRouter()
    const wsStore = useWsStore()
    const auth = reactive({
        email: null,
        password: null,
    })
    const isLoading = ref(false)

    async function login() {
        try {
            isLoading.value = true
            const res = await api.post('login', {
                email: auth.email,
                password: auth.password
            })
            return res
        } catch (error) {
            console.error('Error:', error.response || error.message);
            wsStore.errorMsg.push({ msg: error.response || error.message, status: true })
        }
    }
    async function loginBrowser() {
        wsStore.messages = []
        if (!auth.email?.includes('@')) {
            wsStore.errorMsg.push({ msg: 'please fill your email', status: true })
            return
        }
        try {
            if (wsStore.isWsOpen()) {
                const loginStatus = await login()
                if (loginStatus.status == 201) {
                    wsStore.socket.send(JSON.stringify({ type: 'login' }))
                }
            } else {
                await wsStore.reconnectWebsocket()
                await loginBrowser()
            }
        } catch (error) {
            wsStore.errorMsg.push({ msg: error, status: true })
        }
    }


    watchEffect(() => {
        if (wsStore.errorMsg.length > 0) {
            setTimeout(() => {
                wsStore.errorMsg.splice(0, 1)
            }, 5000);
        }
        if (wsStore.loading?.length > 0) {
            setTimeout(() => {
                wsStore.loading = ''
            }, 5000);
        }
        if (wsStore.messages?.status == 'success') {
            const token = wsStore.messages.msg
            if (token !== undefined) {
                isLoading.value = false
                $cookies.set("token_client", token)
                router.push({ name: "home" })
            }
        }

    })
</script>

<template>
    <div class="min-h-screen bg-gradient-to-b from-violet-300 flex justify-center items-center px-12">
        <div class="flex flex-col w-96 rounded-3xl bg-white">
            <div
                class="bg-gradient-to-b from-pink-400 to-violet-600 to-90% h-28 rounded-t-3xl flex justify-center items-center">
                <label for="" class="uppercase font-bold text-2xl text-white text-center">vueschool <br>
                    downloader</label>
            </div>
            <div class="h-40 flex flex-col justify-center px-12 space-y-8 py-2">
                <InputForm type="email" name="email" v-model="auth.email" />
                <InputForm type="password" name="password" v-model="auth.password" />
            </div>
            <div class="flex justify-center mt-12">
                <div v-if="!isLoading" @click="loginBrowser"
                    class="capitalize rounded-b-3xl w-full bg-violet-600 p-2 text-white font-bold text-lg text-center cursor-pointer hover:bg-violet-700 focus:bg-violet-600">
                    login</div>
                <div v-else @click="loginBrowser"
                    class="rounded-b-3xl w-full bg-violet-700 p-2 text-white font-bold text-lg text-center cursor-not-allowed flex justify-center">
                    <div class="w-7 h-7 border-b-2 border-white rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="absolute top-6 right-12">
        <Notif :datas="wsStore.errorMsg" @closeNotif="(i) => wsStore.errorMsg.splice(i, 1)" :isSusccess="false" />
        <Notif :datas="wsStore.loading" @closeNotif="(i) => wsStore.loading.splice(i, 1)" :isSusccess="true" />
    </div>
</template>