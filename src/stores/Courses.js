import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useWsStore } from "./Websocket";

export const useCoursesStore = defineStore("courses", () => {
  const wsStore = useWsStore()

  const selected = reactive([]);
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
    selected.length = 0;
    datas.map((data) => (data.isSelected = false));
  }

  function selectCourses(event) {
    if (selected.includes(event.id)) {
      selected.splice(selected.indexOf(event.id), 1);
    } else {
      if (selected.length > 3) {
        selected.push(event.id)
      } else {
        wsStore.errorMsg.value = `can't select course more than 3`
      }
    }
    isChecked(event);
  }
  function selectedCourses() {
    return datas.filter((data) => selected.includes(data.id));
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
