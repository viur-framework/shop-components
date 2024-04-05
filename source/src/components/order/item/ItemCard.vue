<template>
  <sl-card class="item-card">
    <slot></slot>
  </sl-card>
</template>

<script setup>
const props = defineProps(["item"]);
</script>

<style scoped>
.item-card {
  width: 200px;
}
</style>
