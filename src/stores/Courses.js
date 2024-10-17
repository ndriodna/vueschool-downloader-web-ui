import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useWsStore } from "./Websocket";

export const useCoursesStore = defineStore("courses", () => {
  const wsStore = useWsStore()

  const selected = ref([]);
  const datas = reactive(JSON.parse(localStorage.getItem('courses')) || []);

  function isStorageExist() {
    return localStorage.getItem('courses') ? true : false
  }

  function getCourse() {
    if (wsStore.isWsOpen()) {
      if (isStorageExist()) {
        datas.splice(0, datas.length)
        localStorage.removeItem('courses')
      }
      const token = $cookies.get('token_client')
      wsStore.socket.send(JSON.stringify({ type: 'getCourses', token: token }))
    }
  }

  function isChecked(event) {
    datas.map((val) =>
      val.id === event.id
        ? { ...val, isSelected: (val.isSelected = !event.isSelected) }
        : val
    );
  }

  function clearSelected() {
    selected.value = []
    datas.map((data) => (data.isSelected = false));
  }

  function selectCourses(event) {
    console.log('ini event select', event.id)
    if (selected.value.includes(event.id)) {
      selected.value.splice(selected.value.indexOf(event.id), 1);
    } else if (selected.value.length < 3) {
      selected.value.push(event.id)
    } else {
      wsStore.errorMsg.push({ msg: `can't select course more than 3` })
      return
    }
    isChecked(event);
  }
  function selectedCourses() {
    return datas.filter((data) => selected.value.includes(data.id));
  }
  return {
    selected,
    datas,
    isChecked,
    clearSelected,
    selectCourses,
    selectedCourses,
    isStorageExist,
    getCourse
  };
});
