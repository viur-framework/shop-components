<template>
  <sl-select
    :value="state.selectedCarts"
    multiple="true"
    clearable
    @sl-change="handleSelect"
    @sl-clear="reset"
  >
    <sl-option v-for="cart in carts" :key="cart.key" :value="cart.key">
       {{ cart.name }}
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
  state.selectedCarts = e.target.value;
  emit("cartSelected", e.target.value);
}

function reset() {
  emit("onReset");
}

onBeforeMount(() => {
  props.carts.forEach((cart) => {
    state.selectedCarts.push(cart.key);
  });
  emit("cartSelected", state.selectedCarts);
});
</script>
<style scoped></style>
