import { defineStore } from "pinia"
import { reactive } from "vue"
import { useWsStore } from "./Websocket"
import { useCoursesStore } from "./Courses"


export const useDownloadStore = defineStore('download', () => {
    const wsStore = useWsStore()
    const courseStore = useCoursesStore()

    const token = $cookies.get('token_client')
    async function startDownload() {
        try {
            if (!wsStore.isWsOpen()) {
                await wsStore.reconnectWebsocket()
                await startDownload()
            } else {
                wsStore.socket.send(JSON.stringify({ type: 'downloader', token: token, data: courseStore.videoLessons }))
            }
        } catch (error) {
            wsStore.errorMsg.push(({ type: 'downloader', status: 'error', msg: error }))
        }
    }
    async function cancelDownload() {
        try {
            if (!wsStore.isWsOpen()) {
                await wsStore.reconnectWebsocket()
                await cancelDownload()
            } else {
                wsStore.socket.send(JSON.stringify({ type: 'cancel', token: token }))
            }
        } catch (error) {
            wsStore.errorMsg.push(({ type: 'downloader', status: 'error', msg: error }))
        }
    }

    return {
        startDownload,
        cancelDownload
    }
})