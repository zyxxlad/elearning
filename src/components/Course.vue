<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, ref, computed } from 'vue';

const props = defineProps({//параметры компонента
  course: Object, //курс, который надо отобразить
});

const showFullDescription = ref(false); //показывать ли полное описание курса

//функция, срабатывает при нажатии кнопки "больше" на плитке курса. 
const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;//переключает с короткого описание на полное и наоборот
};

//вычисляемая переменная, определяет короткое/полное описание курса
const truncatedDescription = computed(() => {
  let description = props.course.description;
  if (!showFullDescription.value) {
    description = description.substring(0, 90) + '...';
  }
  return description;
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ course.category }}</div>
        <h3 class="text-xl font-bold">{{ course.title }}</h3>
      </div>

      <div class="mb-5">
        <div>
          {{ truncatedDescription }}<!--описание курса-->
        </div>
        <button @click="toggleFullDescription" class="text-green-500 hover:text-green-600 mb-5">
          {{ showFullDescription ? 'Меньше' : 'Больше' }} <!--кнопка больше/меньше-->
        </button>
      </div>

      <h3 class="text-green-500 mb-2">{{ course.duration }}</h3>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3">
          <i class="pi pi-clock text-orange-700"></i>
          {{ course.date }}
        </div>
        <!--кнопка-ссылка на страницу с подробным описанием описанием курса-->
        <RouterLink :to="'/courses/' + course.id"
          class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm">
          Подробнее
        </RouterLink>
      </div>
    </div>
  </div>
</template>
