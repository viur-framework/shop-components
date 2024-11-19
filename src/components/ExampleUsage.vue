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
import SelectPaymentProvider from "./order/process/SelectPaymentProvider.vue";

import { useCartStore } from "../stores/cart";
import { useOrderStore } from "../stores/order";

const cartStore = useCartStore();
const orderStore = useOrderStore();

const rootNode = computed(() =>
  cartStore.state.basket.key ? cartStore.state.basket.key : "",
);

const state = reactive({
  // customShipping: shallowRef(CustomShipping),
  tabs: {
    cart: {
      component: shallowRef(ShopCart),
      props: {
        standalone: false,
        cartKey: rootNode,
        action: () => {
          orderStore.add(rootNode.value);
        },
        // customComponent: shallowRef(CustomShipping),
      },
      displayName: "Warenkorb",
      icon: { name: "bag" },
      position: 1,
      disabled: false,
    },
    userInfo: {
      component: shallowRef(ShopUserData),
      props: {
        multiMode: false,
        action: () => {
          orderStore.update({
            billing_address_key: cartStore.state.activeBillingAddress.key,
          });
        },
      },
      displayName: "Daten Eingeben",
      icon: { name: "card-list" },
      position: 2, //reihfolge ändern
      disabled: false,
    },
    selectPaymentProvider: {
      component: shallowRef(SelectPaymentProvider),
      props: {},
      displayName: "Zahlungsart auswählen",
      icon: { name: "card-list" },
      position: 3, //reihfolge ändern
      disabled: false,
    },
    confirm: {
      component: shallowRef(ShopOrderConfirm),
      props: {},
      displayName: "Bestellung prüfen",
      icon: { name: "clipboard-check" },
      position: 4,
      disabled: true,

      showNext: false,
    },

    orderComplete: {
      component: shallowRef(ShopOrderComplete),
      props: {},
      displayName: "Bestellung Abgeschlossen",
      icon: { name: "bag-check" },
      position: 6,
      disabled: true,

      showNext: false,
    },
  },
});

function handleTabs(e) {
  if (e?.detail.name === "confirm") {
    state.tabs.orderComplete.disabled = false;
  }
}

// watch(
//   () => cartStore.state.basketRootNode,
//   (newValue, oldValue) => {
//     console.log("guckste", newValue.key);
//     if (newValue && cartStore.state.childrenByNode[newValue.key].length) {
//       state.tabs.userInfo.disabled = false;
//     }
//   },
// );

onBeforeMount(async () => {
  await cartStore.setConfig();
  await cartStore.init(false, false);
});
</script>
