<template>
  <sl-button type="submit" v-show="index !== 0" @click="prevTab()">
    {{$t("viur.shop.stepper.previous")}}
  </sl-button>

  <sl-button type="submit" variant="primary" @click="nextTab()">
    {{$t("viur.shop.stepper.next")}}
  </sl-button>
</template>

<script setup>
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits({prevTab: null, nextTab: null});

function prevTab() {
  emit("prevTab");
}

function nextTab() {
  emit("nextTab");
}
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>
