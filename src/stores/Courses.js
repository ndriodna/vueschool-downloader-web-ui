import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useWsStore } from "./Websocket";

export const useCoursesStore = defineStore("courses", () => {
  const wsStore = useWsStore()

  const selected = ref([]);
  const datas = ref(JSON.parse(localStorage.getItem('courses')) || []);
  const maxBatch = ref(3)
  const lessons = ref([])
  const videoLessons = ref([])

  function isStorageExist() {
    return localStorage.getItem('courses') ? true : false
  }
  function getCourse() {
    if (!wsStore.isWsOpen()) return
    if (isStorageExist()) {
      datas.value = []
      localStorage.removeItem('courses')
    }
    const token = $cookies.get('token_client')
    wsStore.socket.send(JSON.stringify({ type: 'getCourses', token: token }))
  }

  function filterTypeCourse(cate) {
    const cat = {
      premium: 'PREMIUM',
      free: 'FREE'
    }
    if (cate in cat) {
      return datas.value.filter((e) => e.cat == cat[cate])
    }
  }
  function orderByLesson(param) {

  }
  function isChecked(event) {
    datas.value.map((val) =>
      val.id === event.id
        ? { ...val, checked: (val.checked = !event.checked) }
        : val
    );
  }
  function clearSelected() {
    selected.value = []
    lessons.value = []
    datas.value.map((data) => (data.checked = false));
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
    return datas.value.filter((data) => selected.value.includes(data.id));
  }
  function removeSelected(id) {
    if (selected.value.splice(id, 1)) {
      return selectedCourses()
    }
  }

  function getLessons() {
    if (!wsStore.isWsOpen()) return
    lessons.value = []
    const token = $cookies.get('token_client')
    wsStore.socket.send(JSON.stringify({ type: 'getSelectedLesson', token: token, selected: selectedCourses() }))
  }

  function getVideoLesson() {
    if (!wsStore.isWsOpen()) return
    videoLessons.value = []
    const token = $cookies.get('token_client')
    wsStore.socket.send(JSON.stringify({ type: 'getEachVideo', token: token, videoLessons: lessons.value }))
  }

  return {
    selected,
    datas,
    maxBatch,
    lessons,
    videoLessons,
    isChecked,
    clearSelected,
    selectCourses,
    selectedCourses,
    isStorageExist,
    getCourse,
    removeSelected,
    getLessons,
    filterTypeCourse,
    getVideoLesson
  };
});
