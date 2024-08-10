import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useCoursesStore = defineStore("courses", () => {
  const selected = reactive([]);
  const datas = reactive();

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
      selected.push(event.id);
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
  };
});
