const { defineStore } = require("pinia");
const { reactive } = require("vue");
const { useWsStore } = require("./Websocket");


const useDownloadStore = defineStore('download', () => {
    const wsStore = useWsStore()
    const download = reactive([])


})