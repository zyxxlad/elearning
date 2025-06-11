<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section>
    <div class="container m-auto py-6 px-6">
      <!--кнопка-ссылка для возвращения на страницу всех курсов-->
      <RouterLink to="/courses" class="text-green-500 hover:text-green-600 flex items-center">
        <i class="pi pi-arrow-circle-left mr-3"></i> Назад ко всем курсам
      </RouterLink>
    </div>
  </section>
</template>
