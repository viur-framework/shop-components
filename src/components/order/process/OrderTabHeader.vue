<template>
  HALLO
  <div v-if="a">{{ a }}</div>
  <div v-if="b">{{ b }}</div>
</template>

<script setup>
const props = defineProps({
  a: {
    type: String,
  },
  b: {
    type: String,
  },
});
</script>
