<script setup>//сприпты компонета
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template><!--html шаблон компонента-->
  <Navbar/> <!--Компонент навигационной панели, показывается всегда вне зависимости от адреса-->
  <RouterView/> <!--Компонент который отображает разные страницы (элементы страницы) в зависимости от адреса-->
</template>
