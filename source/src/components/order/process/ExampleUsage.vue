<template>
  <shop-order-stepper :tabs="state.tabs" @tabChange="handleTabs" :sidebar="true" />
</template>

<script setup>
import { onBeforeMount, reactive, shallowRef, computed } from "vue";
import { ListRequest } from "@viur/vue-utils";
import ShopOrderStepper from "../../ShopOrderStepper.vue"
import CartView from "../../cart/CartView.vue";
import ConfirmView from "../../cart/ConfirmView.vue";
import CategoryView from "../category/CategoryView.vue";
import OrderComplete from "../../ShopOrderComplete.vue";
import UserInformation from "../information/UserInformation.vue";
import UserInfoMulti from "../information/UserInfoMulti.vue";
import { useCartStore } from "../../../stores/cart";
import OrderTabHeader from "./OrderTabHeader.vue";

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
        cartKey: rootNode,
        placeholder: "/static/partnerbereich/img/placeholder.svg",
      }, // cartKey (on initial call has to be a root node) is a required prop, make sure that cartStore.init() is called before cart is mounted
      displayName: "Warenkorb",
      // icon: { name: "bag" },
      position: 2,
      disabled: false,
      atShow: null,
      atHide: null,
    },
    confirm: {
      component: shallowRef(ConfirmView),
      props: {},
      displayName: "Bestellung prüfen",
      // icon: { name: "clipboard-check" },
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
      props: {
        redirectUrl: "http://localhost:8081",
        additionalComponents: [
          {
            component: shallowRef(OrderTabHeader),
            props: {},
          },
          {
            component: shallowRef(OrderTabHeader),
            props: { a: "TERRT" },
          },
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
      atShow: null,
      atHide: null,
    },
    userInfo: {
      component: shallowRef(UserInformation),
      props: {},
      displayName: "Daten Eingeben",
      icon: { name: "card-list" },
      position: 3,
      disabled: false,
      atShow: null,
      atHide: null,
    },
    userInfoMulti: {
      component: shallowRef(UserInfoMulti),
      props: {},
      displayName: "Daten Eingeben (Multi)",
      icon: { name: "card-list" },
      position: 4,
      disabled: false,
      atShow: null,
      atHide: null,
    },
  },
});

function handleTabs(e) {
  // console.dir("hier", e.target)
  if (e?.detail.name === "confirm") {
    state.tabs.orderComplete.disabled = false;
  }
}

onBeforeMount(async () => {
  await cartStore.init();
  await cartStore.getAddressStructure();

  console.log("debug init exampleusage :", cartStore.state.basketRootNode);
});
</script>
