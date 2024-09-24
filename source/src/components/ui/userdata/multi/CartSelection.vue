<template>
  <sl-select
    @sl-change="handleSelect"
    multiple="true"
    @sl-clear="reset"
    clearable
  >
    <sl-option v-for="cart in carts" :key="cart.key" :value="cart.key">
      Warenkorb {{ cart.name }}
    </sl-option>
  </sl-select>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  carts: { type: Array, required: true },
});
const emit = defineEmits(["cartSelected", "onReset"]);

function handleSelect(e) {
  emit("cartSelected", e.target.value);
}

function reset() {
  emit("onReset");
}
</script>
<style scoped></style>
