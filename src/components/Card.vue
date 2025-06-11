<script setup>
import { defineProps } from 'vue';

defineProps({//параметры компонента
  bg: {//параметр для определения цвета фона плитки
    type: String,
    default: 'bg-gray-100',
  },
});
</script>

<template>
  <div :class="`${bg} p-6 rounded-lg shadow-md`">
    <slot></slot>
  </div>
</template>
