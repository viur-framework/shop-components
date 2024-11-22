<template>
  <sl-spinner v-if="!rootNode"></sl-spinner>
  <shop-order-stepper
    :tabs="state.tabs"
    @tabChange="handleTabs"
    :sidebar="true"
    :sidebar-bottom="false"
    :show-discount="true"
    :custom-shipping-component="state.customShipping"
    v-else
  >
    <!-- customize slots -->
    <!-- <template #main> The Order Stepper </template> -->
    <!-- <template #trigger> Buttons for Stepper control </template> -->
    <!-- <template #sidebar> the side/bottom bar </template> -->
  </shop-order-stepper>
</template>

<script setup>
import { onBeforeMount, reactive, shallowRef, computed } from "vue";

import ShopCart from "./ShopCart.vue";
import ShopOrderConfirm from "./ShopOrderConfirm.vue";
import ShopOrderStepper from "./ShopOrderStepper.vue";
import ShopOrderComplete from "./ShopOrderComplete.vue";
import ShopUserData from "./ShopUserData.vue";
import ShopPaymentProvider from "./ShopPaymentProvider.vue";
import ShopShippingMethod from "./ShopShippingMethod.vue";

import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();

const rootNode = computed(() =>
  cartStore.state.basket.key ? cartStore.state.basket.key : "",
);

const state = reactive({
  tabs: {
    cart: {
      component: shallowRef(ShopCart),
      displayName: "Warenkorb",
      props: {
        standalone: false,
        cartKey: rootNode,
      },
      icon: { name: "bag" },
      position: 1,
    },
    userData: {
      component: shallowRef(ShopUserData),
      props: {
        multiMode: false,
      },
      displayName: "Daten Eingeben",
      icon: { name: "card-list" },
      position: 2, //reihfolge ändern
    },
    selectShippingMethod: {
      component: shallowRef(ShopShippingMethod),
      displayName: "Versandart wählen",
      icon: { name: "truck" },
      position: 3,
    },
    selectPaymentProvider: {
      component: shallowRef(ShopPaymentProvider),
      props: {},
      displayName: "Zahlungsart auswählen",
      icon: { name: "card-list" },
      position: 4, //reihfolge ändern
    },
    orderConfirm: {
      component: shallowRef(ShopOrderConfirm),
      props: {},
      displayName: "Bestellung prüfen",
      icon: { name: "clipboard-check" },
      position: 5,
    },

    orderComplete: {
      component: shallowRef(ShopOrderComplete),
      props: {},
      displayName: "Bestellung Abgeschlossen",
      icon: { name: "bag-check" },
      position: 6,
      showNext: false,
    },
  },
});

onBeforeMount(async () => {
  await cartStore.setConfig("shop", "path/to/placeholder");
  await cartStore.init(false, false);
});
</script>
