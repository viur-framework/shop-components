<template>
  <sl-button type="submit" v-show="index !== 0" @click="prevTab()">
    Zurück
    <!-- TODO: $t(i18n referenz) -->
  </sl-button>

  <sl-button type="submit" variant="primary" @click="nextTab()">
    Weiter
    <!-- TODO: $t(i18n referenz) -->
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
