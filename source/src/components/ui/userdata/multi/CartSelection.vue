<template>
  <sl-select
    v-model="state.allCarts"
    multiple="true"
    @sl-change="handleSelect"
    clearable
    @sl-clear="reset"
  >
    <sl-option v-for="cart in carts" :key="cart.key" :value="cart.key">
      Warenkorb {{ cart.name }}
    </sl-option>
  </sl-select>
</template>
<script setup>
import { onBeforeMount, reactive } from "vue";

const props = defineProps({
  carts: { type: Array, required: true },
});
const emit = defineEmits(["cartSelected", "onReset"]);

const state = reactive({
  selectedCarts: [],
});

function handleSelect(e) {
  emit("cartSelected", e.target.value);
}

function reset() {
  emit("onReset");
}

onBeforeMount(() => {
  props.carts.forEach((cart) => {
    state.selectedCarts.push(cart.key);
  });
});
</script>
<style scoped></style>
