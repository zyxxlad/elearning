<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import Courses from '@/components/Courses.vue';
</script>

<template>
  <Hero /> <!-- приветственная надпись сайта -->
  <HomeCards /> <!-- плитки для учеников и учителей на главной странице-->
  <Courses :limit="3" :showButton="true" /> <!-- плитка курсов, параметр limit это то сколько плиток нужно отобразить, 
  showButton - показывать ли кнопку просмотра всех курсов-->
</template>
