<script setup>
import { ref, watch, watchEffect } from 'vue';
import Card from '../components/Card.vue';
import Filter from '../components/Filter.vue';

const datas = ref([
  {
    id: 7,
    title: "Learn JavaScript the Fun Way: A Comprehensive Guide to Modern JavaScript Programming Techniques, Including ES6, Async/Await, and More for Aspiring Developers",
    isSelected: false,
    img: "https://picsum.photos/200?random=1"
  },
  {
    id: 2,
    title: "Mastering Python for Beginners: An In-Depth Guide to Python Programming, Covering Basic Syntax, Advanced Topics, and Real-World Projects to Boost Your Coding Skills",
    isSelected: false,
    img: "https://picsum.photos/200?random=2"
  },
  {
    id: 9,
    title: "The Ruby on Rails Tutorial: From Zero to Deployment, A Step-by-Step Guide to Building Web Applications with Ruby on Rails, Including Testing, Security, and Performance Optimization",
    isSelected: false,
    img: "https://picsum.photos/200?random=3"
  },
  {
    id: 4,
    title: "Java for Absolute Beginners: A Practical Introduction to Java Programming, Covering Basic Concepts, Object-Oriented Programming, and Building Real-World Applications",
    isSelected: false,
    img: "https://picsum.photos/200?random=4"
  },
  {
    id: 10,
    title: "Swift Programming: The Big Nerd Ranch Guide: An All-Inclusive Manual for Learning Swift, From the Basics to Advanced Techniques, Including UI Development and Performance Optimization",
    isSelected: false,
    img: "https://picsum.photos/200?random=5"
  },
  {
    id: 1,
    title: "Understanding C++: A Practical Approach: Mastering C++ Programming Through Real-World Examples and Projects, Including Object-Oriented Programming and STL Libraries",
    isSelected: false,
    img: "https://picsum.photos/200?random=6"
  },
  {
    id: 5,
    title: "Kotlin in Action: An Expert Guide to Modern Android Development, Covering Kotlin Syntax, Coroutines, and Building Robust Android Applications with Best Practices",
    isSelected: false,
    img: "https://picsum.photos/200?random=7"
  },
  {
    id: 3,
    title: "Effective TypeScript: 62 Specific Ways to Improve Your TypeScript: A Practical Guide to Enhancing Your TypeScript Skills, Covering Advanced Types, Generics, and Real-World Applications",
    isSelected: false,
    img: "https://picsum.photos/200?random=8"
  },
  {
    id: 8,
    title: "PHP and MySQL Web Development: Creating Dynamic and Interactive Websites, From Basic Syntax to Advanced Techniques, Including Security, Performance Optimization, and Real-World Projects",
    isSelected: false,
    img: "https://picsum.photos/200?random=9"
  },
  {
    id: 6,
    title: "Head First Java: A Brain-Friendly Guide to Java Programming, Covering the Basics of Java, Object-Oriented Programming, and Real-World Examples to Help You Become a Proficient Java Developer",
    isSelected: false,
    img: "https://picsum.photos/200?random=10"
  }
]);


const courses = ref([])

function isChecked(event) {
  datas.value = datas.value.map(val =>
    val.id === event.id ? { ...val, isSelected: val.isSelected = !event.isSelected } : val
  )
}

function removeSelected() {
  courses.value = []
  datas.value = datas.value.map(data => ({ ...data, isSelected: false }))
}

function selectCourse(event) {
  if (courses.value.includes(event.id)) {
    courses.value.splice(courses.value.indexOf(event.id), 1)
  } else {
    courses.value.push(event.id)
  }
  isChecked(event)
}

</script>

<template>
  <main class="px-12">
    <Filter />
    <div class="flex flex-auto flex-wrap justify-between py-2 gap-4">
      <Card v-for="(data, index) in datas" :key="index" :data="data" class="w-72 relative"
        @selected="selectCourse($event)" :checked="data.isSelected" />
    </div>

    <div class="flex justify-center ">
      <div v-if="courses.length > 0" class="flex fixed bottom-5">
        <RouterLink to="/" class="px-4 py-2 bg-green-500 rounded-s-lg text-white flex space-x-2">
          <span class="space-x-2 ">{{ courses.length
            }} courses</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            style="fill: rgba(255, 255, 255, 1);">
            <path
              d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z">
            </path>
          </svg>
        </RouterLink>
        <div @click="removeSelected()" class="bg-red-600 text-white p-2 rounded-e-lg cursor-pointer"><svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            style="fill: rgba(255, 255, 255, 1);">
            <path
              d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
            </path>
          </svg></div>
      </div>
    </div>
  </main>
</template>
