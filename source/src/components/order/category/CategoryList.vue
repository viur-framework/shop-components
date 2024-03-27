<template>
  <div v-for="item in list" :key="item">
    <ItemCard :item="item" />
  </div>
</template>

<script setup>
import ItemCard from "../item/ItemCard.vue";

const props = defineProps({
  list: { type: Array, required: true },
});
</script>
