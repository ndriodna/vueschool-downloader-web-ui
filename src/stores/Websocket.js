import { defineStore } from "pinia";
import { ref } from "vue";


export const useWs = defineStore('websocket', () => {
    const socket = ref(null)
    const message = ref(null)
    const messages = ref([])
    const errorMsg = ref(null)

    async function connectWebsocket() {
        socket.value = new WebSocket('ws://localhost:3000', 'Upgrade', {
            'websocket-key': 'secret-key'
        });

        socket.value.addEventListener('open', () => {
            console.log('WebSocket connection established');
        });

        socket.value.addEventListener('message', (event) => {
            messages.value.push(JSON.parse(event.data));
        });

        socket.value.addEventListener('close', (event) => {
            console.log('WebSocket connection closed');
        });
        socket.value.addEventListener('error', (error) => {
            errorMsg.value = 'failed connect to websocket'
            throw new Error('failed connect to websocket')
        })
    }

    async function reconnectWebsocket() {
        return new Promise((resolve, reject) => {
            connectWebsocket()

            setInterval(() => {
                if (socket && socket.readyState === WebSocket.OPEN) {
                    clearInterval(checkConnection)
                    resolve()
                } else {
                    reject(errorMsg)
                }
            }, 100);
        })
    }

    return { socket, message, message, connectWebsocket, reconnectWebsocket }
})