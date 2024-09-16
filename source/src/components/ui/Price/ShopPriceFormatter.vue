<template>
  <sl-format-number :value="priceGetter(price)"></sl-format-number>
  {{ price }}
</template>

<script setup>
const props = defineProps({
  price: {
    type: Object,
    required: true,
  },
});

function priceGetter() {}
</script>
