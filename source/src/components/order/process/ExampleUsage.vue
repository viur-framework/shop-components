<template>
  <order-view :tabs="state.tabs" @tabChange="handleTabs" />
</template>

<script setup>
import { onBeforeMount, reactive, shallowRef } from "vue";
import { ListRequest } from "@viur/vue-utils";

import CartView from "../../cart/CartView.vue";
import ConfirmView from "../../cart/ConfirmView.vue";
import OrderView from "./OrderView.vue";
import CategoryView from "../category/CategoryView.vue";
import OrderComplete from "./OrderComplete.vue";
import UserInformation from "../information/UserInformation.vue";
import UserInfoMulti from "../information/UserInfoMulti.vue";
import { useCartStore } from "../../../stores/cart";

const cartStore = useCartStore();

const state = reactive({
  tabs: {
    cart: {
      component: shallowRef(CartView),
      props: { sidebar: true, mode: "basket" },
      displayName: "Warenkorb",
      icon: { name: "cart", library: "hsk" },
      position: 2,
      disabled: false,
      atShow: null,
      atHide: null,
    },
    confirm: {
      component: shallowRef(ConfirmView),
      props: {},
      displayName: "Bestellung prüfen",
      icon: { name: "order-check", library: "hsk" },
      position: 5,
      disabled: false,
      atShow: null,
      atHide: null,
    },
    // order: {
    //   component: shallowRef(CategoryView),
    //   props: {
    //     listHandler: ListRequest("categorystore", {
    //       module: "variante",
    //       params: { type: "dk", limit: 99 },
    //     }),
    //   },
    //   displayName: "Artikel Bestellen",
    //   icon: { name: "cart-add", library: "hsk" },
    //   position: 1,
    //   disabled: false,
    //   atShow: null,
    //   atHide: null,
    // },
    orderComplete: {
      component: shallowRef(OrderComplete),
      props: {},
      displayName: "Bestellung Abgeschlossen",
      icon: { name: "order-confirmed", library: "hsk" },
      position: 6,
      disabled: true,
      atShow: null,
      atHide: null,
    },
    userInfo: {
      component: shallowRef(UserInformation),
      props: {},
      displayName: "Daten Eingeben",
      icon: { name: "user", library: "hsk" },
      position: 3,
      disabled: false,
      atShow: null,
      atHide: null,
    },
    userInfoMulti: {
      component: shallowRef(UserInfoMulti),
      props: {},
      displayName: "Daten Eingeben (Multi)",
      icon: { name: "user", library: "hsk" },
      position: 4,
      disabled: false,
      atShow: null,
      atHide: null,
    },
  },
});

function handleTabs(e) {
  if (e?.detail.name === "confirm") {
    state.tabs.orderComplete.disabled = false;
  }
}

onBeforeMount(async () => {
  await cartStore.getAdressStructure();
});
</script>
