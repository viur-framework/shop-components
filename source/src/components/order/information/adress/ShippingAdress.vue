<template>
  <sl-splinner
    v-if="!cartStore.state.carts[cartStore.state.basket]?.items"
  ></sl-splinner>
  <template v-else>
    <h1 v-if="multiAdress">Lieferadresse für: {{ state.selectedItem }}</h1>
    <sl-select v-if="multiAdress" @sl-change="onItemSelect">
      <sl-option
        v-for="item in cartStore.state.carts[cartStore.state.basket]?.items"
        :value="item.key"
      >
        {{ item.key }}</sl-option
      >
    </sl-select>
    <sl-input name="street" @sl-change="onInput" placeholder="Straße">
      <label slot="label">Strasse / Haus Nr.*</label>
    </sl-input>
    <sl-input name="province" @sl-change="onInput" placeholder="Bundesland">
      <label slot="label">Bundesland</label>
    </sl-input>
    <sl-input name="city" @sl-change="onInput" placeholder="Stadt">
      <label slot="label">Stadt*</label>
    </sl-input>
  </template>
</template>

<script setup>
import { watchEffect, reactive, ref } from "vue";
import { useCartStore } from "../../../../stores/cart";

const props = defineProps({
  multiAdress: { type: Boolean, default: false },
});

const emit = defineEmits(["adressInput"]);

const state = reactive({
  selectedItem: null,
});

const cartStore = useCartStore();

function onInput(e) {
  let key = `${[state.selectedItem]}.${[e.target.name]}`;
  emit("adressInput", { [`${[state.selectedItem]}.${[e.target.name]}`]: e.target.value });
}

function onItemSelect(e) {
  console.log(e.target.value);
  state.selectedItem = e.target.value;
}
</script>
