<template>
  <sl-spinner v-if="state.loading"></sl-spinner>
  <CartTree v-model="state.data" v-else></CartTree>
</template>

<script setup>
import {
  reactive,
  computed,
  onBeforeMount,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useCartStore } from "../stores/cart.js";
import CartTree from "./cart/CartTree.vue";

const props = defineProps({
  mode: { type: String, default: "basket" },
  cartKey: { type: String },
  sidebar: { type: Boolean, default: true },
  inOrderView: { type: Boolean, default: false },
  inOrderConfirm: { type: Boolean, default: false },
});

const cartStore = useCartStore();

const confirm = ref(null);
const shipping = ref(null);

const state = reactive({
  itemsIsInit: computed(() => {
    return true;
  }),
  totalPrice: computed(() => {
    if (shipping.value) {
      return (
        cartStore.state.basketRootNode.total_discount_price +
        shipping.value.getShippingCost()
      );
    }
    return 0;
  }),
  currentItem: {},
  currentNode: {},
  data: new Set(),
  loading: true,
});

const currentCartKey = computed(() => {
  return props.mode === "basket"
    ? cartStore.state.basketRootNode.key
    : props.cartKey;
});

async function onConfirm() {
  confirm.value.hide();

  await cartStore.updateItem(
    state.currentItem.article.dest.key,
    state.currentNode.key,
    0,
  );
  await updateCart();
}

async function updateItem(e) {
  if (e.quantity === 0) {
    confirm.value.show();
    state.currentItem = e.item;
    state.currentNode = e.node;
  } else {
    await cartStore.updateItem(e.articleKey, e.node.key, e.quantity);

    await cartStore.init();
  }

  await shipping.value.updateShipping();
}

function removeItem(e) {
  confirm.value.show();
  state.currentItem = e.item;
  state.currentNode = e.node;
}

async function onDialogHide() {
  // TODO: console error when removing items
  state.leaves[state.currentNode.key].forEach((item) => {
    if (item.key === state.currentItem.key) {
      item.quantity = 1;
    }
  });

  state.currentItem = {};
  state.currentNode = {};
}

async function updateCart() {
  state.nodes = [];
  state.leaves = {};

  await cartStore.init();
  await getChildren();
}

async function getChildren(parentKey = currentCartKey.value) {
  const children = await cartStore.getChildren(parentKey);

  children.forEach(async (child) => {
    if (child.skel_type === "node") {
      state.data.add(child);
      await getChildren(child.key);
    } else {
      state.data.add(child);
    }
  });
}

// function buildTree() {
//   let tempArray = state.nodes;

//   state.nodes.forEach((node) => {
//     tempArray.push(...state.leaves[node.key]);
//   });

//   const arrayToTree = (arr, parent = null) =>
//     arr
//       .filter((item) => item.parententry === parent)
//       .map((child) => ({ ...child, children: arrayToTree(arr, child.key) }));

//   let result = arrayToTree(tempArray);
//   return result[0];
// }

watch(
  () => state.data,
  (oldVal, newVal) => {
    console.log("oldVal", oldVal);
    if (oldVal.size === newVal.size) {
      state.loading = false;
    }
  },
  { deep: true },
);

onBeforeMount(async () => {
  await cartStore.init();
  await getChildren();

  if (props.mode === "basket") {
    state.data.add(cartStore.state.basketRootNode);
  }
});
</script>

<style scoped>
.viur-shop-cart-wrap {
  display: grid;
  grid-template-columns: subgrid;
}

sl-alert {
  margin-top: var(--sl-spacing-medium);
  margin-bottom: var(--sl-spacing-medium);
}

.viur-shop-cart-controlbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  sl-input {
    flex: 1;

    &::part(base) {
      margin-bottom: 0;
    }
  }
}

.viur-shop-cart-button-list {
  display: flex;
  flex-direction: row;
  gap: 10px;

  &.left {
    flex: 1;
    margin-right: 10px;
  }
}

.search {
  flex: 1 1 100%;
  margin-left: 10px;
}

.article-combobox {
  float: left;
  width: 75ch;
}

.viur-shop-cart-card-img {
  aspect-ratio: 1;
}

.viur-shop-cart-selection {
  flex: 1;
}

.viur-shop-cart-node {
  display: flex;
  flex-direction: column;
}

.cart-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.soma-input {
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
}

.soma-label {
  display: flex;
  flex-direction: row;
  align-items: center;

  sl-icon {
    margin-left: 5px;
    background-color: @highlightColor;
    color: #fff;
    aspect-ratio: 1;
    border-radius: 50%;
    padding: 0.3em;
    font-size: 0.6em;
    cursor: pointer;
  }
}

sl-tooltip {
  &::part(body) {
    line-height: 1.2;
    font-weight: 400;
    padding: 10px;
  }
}

.cart-tab {
  sl-tab {
    width: 25%;

    &::part(base) {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      color: var(--sl-color-neutral-400);
    }

    &[aria-selected="true"]::part(base) {
      color: var(--ignt-color-primary) !important;
    }
  }
}

.cart-status-text {
  font-size: 0.8em;
  color: inherit;
  text-align: center;
  margin-top: 0.6em;
  white-space: initial;
}

.search-box {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  margin-bottom: 30px;

  sl-button {
    &::part(base) {
      height: 100%;
    }
  }

  @media (--ignt-mq-max-break-medium) {
    flex-wrap: wrap;
  }
}

.article-combobox {
  flex: 1 1 100%;
  margin-bottom: 10px;

  &::part(base) {
    margin-bottom: 0;
  }

  @media (--ignt-mq-max-break-medium) {
    margin-bottom: 0;
  }
}

.comission-box {
  margin-right: 10px;

  &::part(base) {
    margin-bottom: 0;
  }

  @media (--ignt-mq-max-break-medium) {
    flex: 1;
  }
}

.search-amt {
  margin-right: 10px;

  &::part(base) {
    margin-bottom: 0;
    width: 80px;
  }
}

.viur-shop-cart-headline {
  &::part(base) {
    background-color: transparent;
    transition: all ease 0.3s;
    border-bottom: 1px solid transparent;
    height: auto;
  }

  :deep(.input--focused) {
    border-bottom: 1px solid var(--sl-color-primary-500) !important;
  }

  &::part(input) {
    color: var(--sl-color-primary-500);
    font-weight: 300;
    text-transform: uppercase;
    font-size: 1.85em;
    padding: 0.1em 0;
    height: auto;
  }

  &::part(suffix) {
    pointer-events: none;
    width: 1.5em;
    margin-left: -1em;
    font-size: 1.5em;
  }

  &:hover {
    &::part(base) {
      border-bottom: 1px solid var(--sl-color-primary-500);
    }
  }
}

.viur-shop-cart-descr {
  margin-top: 10px;

  &::part(base) {
    background-color: transparent;
    transition: all ease 0.3s;
    border-bottom: 1px solid transparent;
    margin-bottom: 0;
  }

  &::part(input) {
    padding: 0.1em 0;
    height: auto;
    color: var(--ignt-color-text);
  }

  &::part(suffix) {
    pointer-events: none;
    width: 1.5em;
    margin-left: -1em;
    font-size: 1.5em;
  }

  &:hover {
    &::part(base) {
      border-bottom: 1px solid var(--ignt-color-text);
    }
  }
}

sl-menu-item {
  &::part(base) {
    padding: 0.2em 0.9em 0.2em 0.8em;
  }

  &::part(checked-icon) {
    display: none;
  }

  &::part(prefix) {
    margin-right: 10px;
  }

  &::part(suffix) {
    margin-right: -1.5em;
  }
}

.primary-icon {
  color: var(--ignt-color-primary);
}

.delete-icon {
  color: @warnColor;
}

.dots {
  color: var(--ignt-color-primary);
  width: 1.5em;
  height: 100%;
  font-size: 1em;
  padding: 0.4em;
}

.viur-shop-cart-card {
  margin-bottom: var(--sl-spacing-x-large);

  &::part(header) {
    border-bottom: none;
    padding-top: 0;
    padding-right: 0;
  }

  &::part(image) {
    flex-basis: 25%;
    max-width: 250px;
  }

  &::part(body) {
    display: flex;
    flex: 1;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
  }

  &::part(group) {
    padding: var(--sl-spacing-small) 0;
  }
}

.viur-shop-cart-card-body-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: var(--sl-spacing-large);
  flex: 1;
}

.viur-shop-cart-card-body-info {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.viur-shop-cart-card-descr {
  margin-bottom: auto;
}

.viur-shop-cart-card-body-footer {
  display: flex;
  flex-direction: row;
  gap: var(--sl-spacing-2x-small);
  margin-top: var(--sl-spacing-large);
}

.amount-input {
  width: 5em;
}

.viur-shop-cart-card-price-wrap {
  display: flex;
  flex-direction: column;

  .viur-shop-cart-card-small-print {
    font-size: 0.75em;
    margin-left: auto;
  }
}

.viur-shop-cart-card-price {
  font-size: 1.3em;
}

.viur-shop-cart-card-price-label {
  color: var(--ignt-color-primary);
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 1em;
  margin-left: auto;
}

.viur-shop-cart-mobile-footer {
  display: none;
}
</style>
