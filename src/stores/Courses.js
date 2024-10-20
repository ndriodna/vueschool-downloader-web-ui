import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useWsStore } from "./Websocket";

export const useCoursesStore = defineStore("courses", () => {
  const wsStore = useWsStore()

  const selected = ref([]);
  const datas = reactive(JSON.parse(localStorage.getItem('courses')) || []);
  const maxBatch = ref(5)
  const lessons = reactive([])

  function isStorageExist() {
    return localStorage.getItem('courses') ? true : false
  }
  function getCourse() {
    if (!wsStore.isWsOpen()) return
    if (isStorageExist()) {
      datas.splice(0, datas.length)
      localStorage.removeItem('courses')
    }
    const token = $cookies.get('token_client')
    wsStore.socket.send(JSON.stringify({ type: 'getCourses', token: token }))
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
    lessons.length = 0
    datas.map((data) => (data.isSelected = false));
  }

  function selectCourses(event) {
    if (selected.value.includes(event.id)) {
      selected.value.splice(selected.value.indexOf(event.id), 1);
    } else if (selected.value.length < maxBatch.value) {
      selected.value.push(event.id)
    }
    isChecked(event);
  }
  function selectedCourses() {
    return datas.filter((data) => selected.value.includes(data.id));
  }
  function removeSelected(id) {
    if (selected.value.splice(id, 1)) {
      return selectedCourses()
    }
  }

  function getLessons() {
    if (!wsStore.isWsOpen()) return
    lessons.splice(0)
    const token = $cookies.get('token_client')
    wsStore.socket.send(JSON.stringify({ type: 'getSelectedLesson', token: token, selected: selectedCourses() }))
  }


  return {
    selected,
    datas,
    maxBatch,
    lessons,
    isChecked,
    clearSelected,
    selectCourses,
    selectedCourses,
    isStorageExist,
    getCourse,
    removeSelected,
    getLessons,
  };
});
