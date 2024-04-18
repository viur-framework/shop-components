<template>
  <order-view :tabs="state.tabs" @tabChange="handleTabs" />
</template>

<script setup>
import { reactive } from "vue";

import CartView from "../../cart/CartView.vue";
import ConfirmView from "../../cart/ConfirmView.vue";
import OrderView from "./OrderView.vue";
import CategoryView from "../category/CategoryView.vue";
import OrderComplete from "./OrderComplete.vue";

const state = reactive({
  tabs: {
    cart: {
      component: CartView,
      props: { sidebar: false, mode: "basket" },
      displayName: "Warenkorb",
      icon: { name: "cart", library: "hsk" },
      position: 2,
      disabled: false,
      atShow: null,
      atHide: null,
    },
    confirm: {
      component: ConfirmView,
      props: {},
      displayName: "Bestellung prüfen",
      icon: { name: "order-check", library: "hsk" },
      position: 3,
      disabled: false,
      atShow: null,
      atHide: null,
    },
    order: {
      component: CategoryView,
      props: {},
      displayName: "Artikel Bestellen",
      icon: { name: "cart-add", library: "hsk" },
      position: 1,
      disabled: false,
      atShow: null,
      atHide: null,
    },
    orderComplete: {
      component: OrderComplete,
      props: {},
      displayName: "Bestellung Abgeschlossen",
      icon: { name: "order-confirmed", library: "hsk" },
      position: 4,
      disabled: false,
      atShow: null,
      atHide: null,
    },
  },
});

function handleTabs(e) {
  console.log("handleTabs", e);
  if (e?.detail.name === "confirm") {
    state.tabs.orderComplete.disabled = false;
  }
}
</script>
