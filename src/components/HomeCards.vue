<script setup>
import { RouterLink } from 'vue-router';
import Card from '@/components/Card.vue';
</script>

<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card>
          <h2 class="text-2xl font-bold">Для учеников</h2>
          <p class="mt-2 mb-4">
            Посмотрите наши курсы и начните обучение сегодня
          </p>
          <RouterLink to="/courses" class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
            Смотреть курсы
          </RouterLink>
        </Card>
        <Card bg="bg-green-100">
          <h2 class="text-2xl font-bold">Для преподователей</h2>
          <p class="mt-2 mb-4">
            Создайте и опубликуйте свою программу обучения
          </p>
          <RouterLink to="/courses/add"
            class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600">
            Создать курс
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>
