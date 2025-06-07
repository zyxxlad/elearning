<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import Courses from '@/components/Courses.vue';
</script>

<template>
  <Hero />
  <HomeCards />
  <Courses :limit="3" :showButton="true" />
</template>
