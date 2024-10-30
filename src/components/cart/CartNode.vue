<template>
  <h1 class="viur-shop-cart-headline">
    {{ node.name }}
  </h1>
</template>

<script setup>
import { computed, reactive } from "vue";

const props = defineProps({
  node: { type: Object, required: true },
});

const state = reactive({});
</script>

<style scoped>
.viur-shop-cart-headline {
  font-size: 2rem;
}
</style>
