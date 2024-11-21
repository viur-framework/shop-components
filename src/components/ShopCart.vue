<template>
  <sl-spinner v-if="state.loading"></sl-spinner>
  <CartTree v-model="state.data" v-else-if="!state.loading && tree"></CartTree>
  <CartView
    :modelValue="state.data"
    :standalone="standalone"
    :customComponent="customComponent"
    v-else
  >
  </CartView>
</template>

<script setup>
import { reactive, onBeforeMount, watch } from "vue";
import { useCartStore } from "../stores/cart.js";
import CartTree from "./cart/CartTree.vue";
import CartView from "./cart/CartView.vue";

const props = defineProps({
  tree: { type: Boolean, default: false },
  cartKey: { type: String },
  standalone: { type: Boolean, default: true },
  customComponent: { default: undefined },
});
const emits = defineEmits(["valid", "invalid"]);

const cartStore = useCartStore();

const state = reactive({
  currentItem: {},
  currentNode: {},
  data: [],
  loading: true,
});

async function getChildren(parentKey = props.cartKey) {
  state.loading = true;
  const children = await cartStore.getChildren(parentKey);

  children.forEach(async (child) => {
    if (child.skel_type === "node") {
      if (!Object.keys(cartStore.state.childrenByNode.includes(parentKey))) {
        cartStore.state.childrenByNode[parentKey] = [];
      }
      cartStore.state.childrenByNode[parentKey].push(child);
      state.data.push(child);
      await getChildren(child.key);
    } else {
      state.data.push(child);
    }
  });
  state.loading = false;
}

async function getCart() {
  state.data = [];
  await getChildren();
  if (state.data.length) {
    state.data.push(cartStore.state.basket);
    emits("valid", true);
  } else {
    emits("valid", false);
  }
}

// watch(
//   () => props.cartKey,
//   async (oldVal, newVal) => {
//     if (newVal) {
//       await getCart();
//     }
//   },
// );

onBeforeMount(async () => {
  if (!props.standalone) {
    await getCart();
  }
  if (props.cartKey && props.standalone) {
    await getCart();
  }
});
</script>

<style scoped></style>
