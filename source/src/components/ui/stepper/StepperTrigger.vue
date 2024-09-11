<template>
  <sl-button type="submit" v-show="index !== 0" @click="prevTab()">
    Zurück
  </sl-button>
  <!-- :disabled="!state.requiredFieldsFilled" -->
  <sl-button type="submit" variant="primary" @click="nextTab()">
    Weiter
  </sl-button>
</template>

<script setup>
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["nextTab", "prevTab"]);

function prevTab() {
  emit("prevTab");
}

function nextTab() {
  emit("nextTab");
}
</script>

<style scoped></style>
