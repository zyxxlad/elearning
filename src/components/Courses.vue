<script setup>
import { RouterLink } from 'vue-router';
import Course from './Course.vue';
import { reactive, defineProps, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { getDatabase, ref, onValue } from "firebase/database";

defineProps({ //параметры компонента
  limit: Number, //максимальное количество курсов, которое надо отобразить
  showButton: { //показывать ли кнопку просмотра всех курсов
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  courses: [],
  isLoading: true, //пока isLoading = true, на странице будет отображаться иконка загрузки вместо плиток курсов
});

const db = getDatabase(); //для манипуляций с базой


//срабатывает при встраивании компонента в страницу
onMounted(async () => {
  try {
    //попытаться достать все курсы из базы
    const coursesRef = ref(db, 'courses/');
    onValue(coursesRef, (snapshot) => {
      const courses = [];
      snapshot.forEach(snapshotChild => {
        var course = snapshotChild.val();
        course.id = snapshotChild.key;
        courses.push(course);
      });
      state.courses = courses;
      state.isLoading = false; //убрать иконку загрузки
    });

  } catch (error) {
    console.error('Error fetching courses', error);
  }
});

</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Все курсы
      </h2>
      <!-- Показывать иконку загрузки пока isLoading = true-->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!-- Показать курсы когда  isLoading = false-->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Course v-for="course in state.courses.slice(0, limit || state.courses.length)" :key="course.id"
          :course="course" />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <!--Кнопка-ссылка на все курсы-->
    <RouterLink to="/courses" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
      Посмотреть все курсы</RouterLink>
  </section>
</template>
