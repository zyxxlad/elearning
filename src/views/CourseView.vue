<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { getDatabase, ref, onValue, remove, off } from "firebase/database";

const route = useRoute();//для манипуляций с адресами
const router = useRouter();//для манипуляций с адресами
const toast = useToast();//для всплывающих подсказок

const db = getDatabase();//для манипуляций с базой

const courseId = route.params.id;//идентификатор курса, берется из параметров адреса (в адресной строке)
var courseRef = {};

const state = reactive({
  course: {},
  isLoading: true, //пока isLoading = true, на странице будет отображаться иконка загрузки
});

//срабатывает при нажатии "удалить курс"
const deleteCourse = async () => {
  try {
    //сообщение с запросом подтверждения
    const confirm = window.confirm('Вы уверены что хотите удалить этот курс?');
    if (confirm) {
      //удалить курс из базы
      off(courseRef);
      remove(courseRef);
      //показать сообщение об успехе
      toast.success('Курс успешно удален');
      router.push('/courses');
    }
  } catch (error) {
    //показать сообщение об ошибке
    console.error('Ошибка удаления курса', error);
    toast.error('Курс не был удален');
  }
};

//срабатывает при встраивании компонента в страницу
onMounted(async () => {
  try {
    //попытаться получить курс с заданным идентификатором из базы
    courseRef = ref(db, `courses/${courseId}`);
    onValue(courseRef, (snapshot) => {
      var c = snapshot.val();
      c.id = courseId;
      state.course = c;

      state.isLoading = false; //убрать иконку загрузки
    });
  } catch (error) {
    console.error('Error fetching course', error);
  }
});
</script>

<template>
  <BackButton />
  <!-- если isLoading = false, убрать иконку загрузки и показать курс -->
  <section v-if="!state.isLoading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>

          <!-- Блок с основной информацией о курсе -->
          <div class="flex flex-row">
            <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left flex-1">
              <div class="text-gray-500 mb-4">{{ state.course.category }}</div>
              <h1 class="text-3xl font-bold mb-4">{{ state.course.title }}</h1>
              <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                <i class="pi pi-clock text-xl text-orange-700 mr-2"></i>
                <p class="text-orange-700">{{ state.course.date }}</p>
              </div>
            </div>

            <!-- Блок управление курсом -->
            <div class="bg-white p-6 rounded-lg shadow-md ml-10 flex-1">
              <h3 class="text-xl font-bold mb-6">Управление</h3>
              <div class="flex justify-center-safe">
                <RouterLink :to="`/courses/edit/${state.course.id}`"
                  class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block mx-2">
                  Редактировать</RouterLink>
                <button @click="deleteCourse"
                  class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block mx-2">
                  Удалить курс
                </button>
              </div>
            </div>

          </div>

          <!-- Блок с деталями курса -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Описание курса
            </h3>
            <p class="mb-4">
              {{ state.course.description }}
            </p>
            <h3 class="text-green-800 text-lg font-bold mb-2">Продолжительность</h3>
            <p class="mb-4">{{ state.course.duration }}</p>
          </div>
        </main>
      </div>
    </div>
  </section>

<!-- пока isLoading = true, на странице будет отображаться иконка загрузки -->
  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>
