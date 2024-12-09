<template>
  <shop-order-stepper
    :tabs="state.tabs"
    @tabChange="handleTabs"
    :sidebar="true"
    :sidebar-bottom="false"
    :show-discount="false"
  >
    <!-- customize slots -->
    <!-- <template #main> The Order Stepper </template> -->
    <!-- <template #trigger> Buttons for Stepper control </template> -->
    <!-- <template #sidebar> the side/bottom bar </template> -->
  </shop-order-stepper>
</template>

<script setup>
import { onBeforeMount, reactive, shallowRef, computed } from "vue";
import ShopOrderStepper from "./ShopOrderStepper.vue";
import CartView from "./cart/CartView.vue";
import ShopCart from "./ShopCart.vue";
import ConfirmView from "./ShopOrderConfirm.vue";
import ShopOrderComplete from "./ShopOrderComplete.vue";
import ShopUserData from "./ShopUserData.vue";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();

const rootNode = computed(() =>
  cartStore.state.basketRootNode.key ? cartStore.state.basketRootNode.key : "",
);
const state = reactive({
  rootNode: {},
  tabs: {
    cart: {
      component: shallowRef(CartView),
      props: {
        sidebar: true,
        mode: "basket",
        cartKey: rootNode, // cartKey (on initial call has to be a root node) is a required prop, make sure that cartStore.init() is called before cart is mounted
        placeholder: "/static/partnerbereich/img/placeholder.svg",
        standalone: false,
      },
      displayName: "Warenkorb",
      icon: { name: "bag" },
      position: 2,
      disabled: false,
    },
    confirm: {
      component: shallowRef(ConfirmView),
      props: {
        tabName: "userInfo",
      },
      displayName: "Bestellung prüfen",
      icon: { name: "clipboard-check" },
      position: 5,
      disabled: false,
    },
    orderComplete: {
      component: shallowRef(ShopOrderComplete),
      props: {
        redirectUrl: "http://localhost:8081",
        additionalComponents: [
          {
            component: shallowRef(CartView),
            props: {
              sidebar: true,
              mode: "basket",
              cartKey: rootNode,
            },
          },
        ],
      },
      displayName: "Bestellung Abgeschlossen",
      icon: { name: "bag-check" },
      position: 6,
      disabled: true,
    },
    userInfo: {
      component: shallowRef(ShopUserData),
      props: { multiMode: false },
      displayName: "Daten Eingeben",
      icon: { name: "card-list" },
      position: 3,
      disabled: false,
    },
    cartTest: {
      component: shallowRef(ShopCart),
      props: {
        sidebar: true,
        mode: "basket",
        cartKey: rootNode, // cartKey (on initial call has to be a root node) is a required prop, make sure that cartStore.init() is called before cart is mounted
        placeholder: "/static/partnerbereich/img/placeholder.svg",
        standalone: false,
      },
      displayName: "neuer Korb",
      icon: { name: "bag" },
      position: 1,
      disabled: false,
    },
  },
});

function handleTabs(e) {
  if (e?.detail.name === "confirm") {
    state.tabs.orderComplete.disabled = false;
  }
}

onBeforeMount(async () => {
  await cartStore.setConfig();
  await cartStore.init("/static/partnerbereich/img/placeholder.svg");
  await cartStore.getAddressStructure();
});
</script>
