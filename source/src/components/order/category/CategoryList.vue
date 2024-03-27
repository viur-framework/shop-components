<template>
  <div>HALLO WELT</div>
  <div v-for="item in list" :key="item">{{ item }}</div>
</template>

<script setup>
const props = defineProps({
  list: { type: Array, required: true },
});
</script>
