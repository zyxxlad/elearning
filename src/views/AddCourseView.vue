<script setup>
import router from '@/router';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import { getDatabase, ref, push, set } from "firebase/database";

//переменная с данными формы
const form = reactive({
  category: 'История',
  title: '',
  description: '',
  date: '',
  duration: '',
});

//использоваеть всплывающие подсказки
const toast = useToast();

//подключиться к базе
const db = getDatabase();
const coursesRef = ref(db, 'courses');

//срабатывает при нажатии на кнопку
const handleSubmit = async () => {

  const newCourse = {
    title: form.title,
    category: form.category,
    description: form.description,
    date: form.date,
    duration: form.duration,
  };

  try {
    //добавить новый курс в базу
    const newCoursesRef = push(coursesRef);
    set(newCoursesRef, newCourse);

    //показать всплывающее сообщение об успехе
    toast.success('Курс успешно добавлен');
    router.push(`/courses/${newCoursesRef.key}`);
  } catch (error) {
    //показать всплывающее сообщение об ошибке
    console.error('Ошибка при добавлении курса', error);
    toast.error('Курс не был добавлен');
  }
};
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <!--форма для данных нового курса-->
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Добавить курс</h2>

          <!-- Категория курса -->
          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2">Категория курса</label>
            <select v-model="form.category" id="type" name="type" class="border rounded w-full py-2 px-3" required>
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

          <!-- Дата начала курса -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Дата </label>
            <input type="text" v-model="form.date" id="date" name="date" class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Дата начала курса" required />
          </div>

          <!-- Длительность курса -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Длительность </label>
            <input type="text" v-model="form.duration" id="duration" name="duration"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="Длительность курса" required />
          </div>

          <!-- Кнопка для добавления курса с заданными данными -->
          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">
              Добавить курс
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
