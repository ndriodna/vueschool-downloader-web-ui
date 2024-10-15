import { defineStore } from "pinia";
import { ref } from "vue";


export const useWsStore = defineStore('websocket', () => {
    const socket = ref(null)
    const loading = ref([])
    const messages = ref(null)
    const errorMsg = ref([])

    async function connectWebsocket() {
        if (socket.value) {
            console.log('close connection')
            socket.value.close()
        }
        socket.value = new WebSocket('ws://localhost:3000', 'Upgrade', {
            'websocket-key': 'secret-key'
        });

        socket.value.addEventListener('open', () => {
            console.log('WebSocket connection established');
        });

        socket.value.addEventListener('message', (event) => {
            const parseData = JSON.parse(event.data)
            if (parseData.status == 'success') {
                messages.value = parseData
            } else if (parseData.status == 'loading') {
                loading.value.push(parseData)
            } else {
                errorMsg.value.push(parseData)
            }
        });

        socket.value.addEventListener('close', (event) => {
            console.log('WebSocket connection closed');
        });
        socket.value.addEventListener('error', (error) => {
            errorMsg.value.push({ msg: 'failed connect to websocket' })
        })
    }

    async function reconnectWebsocket() {
        return new Promise((resolve, reject) => {

            connectWebsocket()

            const checkConnection = setInterval(() => {
                if (socket.value && socket.value.readyState === WebSocket.OPEN) {
                    clearInterval(checkConnection)
                    resolve()
                }
            }, 100);
        })
    }

    function isWsOpen() {
        const readyState = socket.value.readyState === 1
        return readyState ? readyState : errorMsg.value.push({ msg: 'disconnected from server, please refresh page' })
    }

    return { socket, loading, messages, errorMsg, connectWebsocket, reconnectWebsocket, isWsOpen }
})