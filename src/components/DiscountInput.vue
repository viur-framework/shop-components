<template>
  <shop-alert
    v-if="state.alert.show"
    :variant="state.alert.variant"
    :msg="state.alert.msg"
    @onHide="state.alert = {}"
  ></shop-alert>
  <sl-input
    placeholder="Rabattcode eingeben"
    v-model="state.code"
    @keypress.enter="addDiscount()"
  >
  </sl-input>
  {{ state.code }}
  <button @click="state.alert.show = !state.alert.show">{{ $t('shop.add_discount') }}</button>
  {{ state.alert.show }}
</template>

<script setup>
import { reactive } from "vue";
import { useViurShopStore } from "../shop";
const shopStore = useViurShopStore();

import ShopAlert from "./ShopAlert.vue";

const state = reactive({
  code: "",
  alert: {},
});

function addDiscount() {
  shopStore
    .addDiscount(state.code)
    .then(async (resp) => {
      let data = await resp.json();
      console.log("Rabatt debug", data);
    })
    .catch((error) => {
      console.log("error bei rabatt", error);
      state.alert.msg = "not found";
      state.alert.show = true;
      state.alert.variant = "danger";
    });
}
</script>
