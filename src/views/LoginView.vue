<script setup>
    import InputForm from '@/components/InputForm.vue';
    import { useWs } from '@/stores/Websocket';
    import axios from 'axios';
    import { onMounted, onUnmounted, reactive, ref, watch, watchEffect } from 'vue';
    import SlideTransition from "@/components/SlideTransition.vue"
    import Notif from '@/components/Notif.vue';

    const wsStore = useWs()
    const auth = reactive({
        email: null,
        password: null,
    })
    const ErrorMsg = ref([])

    async function login() {
        try {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email: auth.email,
                    password: auth.password
                }
            });
            return res
        } catch (error) {
            console.error('Error:', error.response || error.message);
            ErrorMsg.value.push({ msg: error.response || error.message, status: true })
        }
    }
    async function loginBrowser() {
        wsStore.messages = []
        try {
            if (wsStore.socket && wsStore.socket.readyState == WebSocket.OPEN) {
                const loginStatus = await login()
                console.log(loginStatus)
                if (loginStatus.status == 201) {
                    wsStore.socket.send(JSON.stringify({ type: 'login' }))
                }
            } else {
                await wsStore.reconnectWebsocket()
                await loginBrowser()
            }
        } catch (error) {
            ErrorMsg.value.push({ msg: error, status: true })
        }
    }
    function removeNotif(index) {
        ErrorMsg.value.splice(index, 1)
    }

    watchEffect(() => {
        if (ErrorMsg.value.length > 0) {
            setTimeout(() => {
                ErrorMsg.value.splice(ErrorMsg.value.length - 1, 1)
            }, 5000);
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
                <div @click="loginBrowser"
                    class="capitalize rounded-b-3xl w-full bg-violet-600 p-2 text-white font-bold text-lg text-center cursor-pointer hover:bg-violet-700 focus:bg-violet-600">
                    login</div>
            </div>
        </div>
    </div>
    <<div class="absolute top-6 right-12">
        <SlideTransition>
            <Notif v-for="(val, index) in ErrorMsg" :key="index" @close="removeNotif(index)" :msg="val" />
        </SlideTransition>
        </div>
</template>