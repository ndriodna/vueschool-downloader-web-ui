import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCoursesStore = defineStore("courses", () => {
  const selected = ref([]);
  const datas = ref([
    {
      id: 1783456213,
      title: "JavaScript for Beginners",
      isSelected: false,
      img: "https://source.unsplash.com/random?programming&random=1",
      lesson: 150,
      level: "beginner",
    },
    {
      id: 2837461253,
      title: "Mastering Python",
      isSelected: false,
      img: "https://source.unsplash.com/random?programming&random=2",
      lesson: 320,
      level: "intermediate",
    },
    {
      id: 3964573829,
      title: "Advanced Java Concepts",
      isSelected: false,
      img: "https://source.unsplash.com/random?programming&random=3",
      lesson: 450,
      level: "advance",
    },
    {
      id: 4839201745,
      title: "HTML & CSS Design",
      isSelected: false,
      img: "https://source.unsplash.com/random?programming&random=4",
      lesson: 200,
      level: "beginner",
    },
    {
      id: 5172839456,
      title: "Learning SQL",
      isSelected: false,
      img: "https://source.unsplash.com/random?programming&random=5",
      lesson: 275,
      level: "intermediate",
    },
    {
      id: 6283745091,
      title: "C++ Programming",
      isSelected: false,
      img: "https://source.unsplash.com/random?programming&random=6",
      lesson: 380,
      level: "advance",
    },
    {
      id: 7193846207,
      title: "Introduction to Ruby",
      isSelected: false,
      img: "https://source.unsplash.com/random?programming&random=7",
      lesson: 180,
      level: "beginner",
    },
    {
      id: 8246357912,
      title: "JavaScript: The Good Parts",
      isSelected: false,
      img: "https://source.unsplash.com/random?programming&random=8",
      lesson: 220,
      level: "intermediate",
    },
    {
      id: 9734561823,
      title: "Data Structures and Algorithms",
      isSelected: false,
      img: "https://source.unsplash.com/random?programming&random=9",
      lesson: 500,
      level: "advance",
    },
    {
      id: 1052839467,
      title: "React for Beginners",
      isSelected: false,
      img: "https://source.unsplash.com/random?programming&random=10",
      lesson: 160,
      level: "beginner",
    },
  ]);
  function selectCourses() {
    count.value++;
  }

  return { selected, datas, selectCourses };
});
