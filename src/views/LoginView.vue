<script setup>
    import InputForm from '@/components/InputForm.vue';
    import axios from 'axios';
    import { reactive, ref } from 'vue';
    const auth = reactive({
        email: null,
        password: null,
    })
    let socket = null
    const message = ref('')
    const messages = ref([])
    async function connectWebSocket() {
        socket = new WebSocket('ws://localhost:3000', 'Upgrade', {
            'websocket-key': 'secret-key'
        });

        socket.addEventListener('open', () => {
            console.log('WebSocket connection established');
        });

        socket.addEventListener('message', (event) => {
            messages.value.push(JSON.parse(event.data));
        });

        socket.addEventListener('close', () => {
            console.log('WebSocket connection closed');
        });
    };

    async function reconnectWebsocket() {
        return new Promise((resolve) => {
            function checkConnection() {
                setInterval(() => {
                    if (socket && socket.readyState === WebSocket.OPEN) {
                        clearInterval(checkConnection)
                        resolve()
                    }
                }, 100);
            }
            connectWebSocket()
            checkConnection()
        })
    }

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
        }
    }
    async function loginBrowser() {
        messages.value = []
        try {
            if (socket && socket.readyState == WebSocket.OPEN) {
                const loginStatus = await login()
                console.log(loginStatus)
                if (loginStatus.status == 201) {
                    socket.send(JSON.stringify({ type: 'login' }))
                }
            } else {
                await reconnectWebsocket()
                await loginBrowser()
            }
        } catch (error) {
            console.log(error)
        }
    }
</script>

<template>
    {{ messages?.length ? messages[messages?.length - 1].msg : '' }}
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
</template>