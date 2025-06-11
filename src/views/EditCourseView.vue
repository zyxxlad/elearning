<script setup>
import router from '@/router';
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { getDatabase, ref, set, onValue, off } from "firebase/database";

const route = useRoute(); //для манипуляций с адресами

const db = getDatabase(); //для манипуляции с базой

const courseId = route.params.id; //идентификатор курса, берется из параметров адреса (в адресной строке)
var courseRef = {};

const form = reactive({
  category: 'История',
  title: '',
  description: '',
  date: '',
  duration: '',
});

const state = reactive({
  course: {},
  isLoading: true, //пока isLoading = true, на странице будет отображаться иконка загрузки вместо формы курса
});

const toast = useToast(); //для сообщений

//срабатывает при нажатии на кнопку "сохранить"
const handleSubmit = async () => {
  const updatedCourse = {
    title: form.title,
    category: form.category,
    description: form.description,
    date: form.date,
    duration: form.duration,
  };

  try {
    //попытаться изменить курс в базе
    off(courseRef);
    set(courseRef, updatedCourse);

    //показать сообщение об успехе
    toast.success('Курс успешно обновлен!');
    router.push(`/courses/${courseRef.key}`);
  } catch (error) {
    //показать сообщение об ошибке
    console.error('Ошибка при обновлении курса', error);
    toast.error('Курс не был обновлен');
  }
};

//срабатывает при встраивании компонента в страницу
onMounted(async () => {
  try {

    //попытаться достать курс с заданным идентификатором с базы
    courseRef = ref(db, `courses/${courseId}`);
    onValue(courseRef, (snapshot) => {
      var c = snapshot.val();
      c.id = courseId;
      state.course = c;

      //заполнить поля формы, данными курса
      form.category = state.course.category;
      form.title = state.course.title;
      form.description = state.course.description;
      form.date = state.course.date;
      form.duration = state.course.duration;

      state.isLoading = false;
    });
  } catch (error) {
    console.error('Ошибка при обновлении курса', error);
  }
});
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <!-- Форма данных курса -->
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Редактировать курс</h2>

          <!-- Категория курса -->
          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2">Категория курса</label>
            <select v-model="form.category" id="category" name="category" class="border rounded w-full py-2 px-3"
              required>
              <option value="История">История</option>
              <option value="Экономика">Экономика</option>
              <option value="Физика">Физика</option>
              <option value="Психология">Психология</option>
            </select>
          </div>

          <!-- Название курса -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Название</label>
            <input type="text" v-model="form.title" id="name" name="name" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="прим. Квантовая физика" required />
          </div>

          <!-- Описание курса -->
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2">Описание</label>
            <textarea id="description" v-model="form.description" name="description"
              class="border rounded w-full py-2 px-3" rows="4" placeholder="Добавьте описание курса"></textarea>
          </div>

          <!-- Дата курса -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Дата </label>
            <input type="text" v-model="form.date" id="date" name="date" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Дата начала курса" required />
          </div>

          <!-- Продолжительность курса -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Продолжительность </label>
            <input type="text" v-model="form.duration" id="duration" name="duration"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Продолжительность курса" required />
          </div>

          <!-- Кнопка для добавления курса с заданными данными -->
          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
