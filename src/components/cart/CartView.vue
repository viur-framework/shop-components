<template>
  <sl-spinner v-if="!state.cartLoaded"></sl-spinner>
  <h2 v-else-if="state.cartIsEmpty">Keine Artikel im Warenkorb vorhanden</h2>
  <!--todo translations-->
  <template v-else>
    <sl-dialog no-header ref="confirm" @sl-hide="onDialogHide">
      <p>Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?</p>
      <sl-bar>
        <sl-button
          slot="left"
          variant="danger"
          @click="confirm.hide()"
          size="medium"
        >
          Abbrechen
        </sl-button>
        <sl-button
          slot="right"
          variant="success"
          @click="onConfirm"
          size="medium"
        >
          Aus Warenkorb entfernen
        </sl-button>
      </sl-bar>
    </sl-dialog>

    <div class="viur-shop-cart-node" v-for="node in state.nodes">
      <template
        v-if="Object.keys(state.leaves).includes(node.key)"
        :key="node.key"
      >
        <!-- <CartNode :node="node"></CartNode> -->
        <CartLeaf
          v-for="leaf in state.leaves[node.key]"
          :key="leaf.key"
          :leaf="leaf"
          :node="node"
          :placeholder="placeholder"
          @removeItem="removeItem"
          @updateItem="updateItem"
        >
        </CartLeaf>
      </template>
    </div>
  </template>

  <shop-summary v-if="!props.sidebar">
    <template #custom v-if="customComponent">
      <component :is="customComponent"></component>
    </template>
  </shop-summary>
</template>

<script setup>
import { reactive, computed, onBeforeMount, ref, watch } from "vue";
import { useCartStore } from "../../stores/cart.js";
import CartLeaf from "./CartLeaf.vue";
import ShopSummary from "../ShopSummary.vue";

const props = defineProps({
  mode: { type: String, default: "basket" },
  cartKey: { type: String },
  sidebar: { type: Boolean, default: true },
  customComponent: { default: undefined },
});

const cartStore = useCartStore();

const confirm = ref(null);
const shipping = ref(null);

const state = reactive({
  cartIsEmpty: computed(() => {
    return currentCartKey && Object.keys(state.leaves).length === 0;
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
  nodes: [],
  leaves: {},
  cartLoaded: false,
});

const currentCartKey = computed(() => {
  console.log("compute current cartkey");
  return props.cartKey;
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
  console.log("updateItem :", e);

  if (e.quantity === 0) {
    confirm.value.show();
    state.currentItem = e.item;
    state.currentNode = e.node;
  } else {
    await cartStore.updateItem(e.articleKey, e.node.key, e.quantity);

    await cartStore.init();
  }
}

function removeItem(e) {
  console.log("removeItem :", e);

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

  await cartStore.init(true);
  await getChildren();
}

async function getChildren(parentKey = currentCartKey.value) {
  state.cartLoaded = false;

  const children = await cartStore.getChildren(parentKey);
  for (const child of children) {
    if (child.skel_type === "node") {
      state.nodes.push(child);
      await getChildren(child.key);
    } else {
      if (child.is_root_node) {
        continue;
      }
      if (!Object.keys(state.leaves).includes(parentKey)) {
        state.leaves[parentKey] = [];
      }
      state.leaves[parentKey].push(child);
    }
  }
  state.cartLoaded = true;
}

watch(
  () => cartStore.state.isReady,
  async (newVal, oldVal) => {
    if (newVal) {
      await getChildren();
      state.nodes.push(cartStore.state.basketRootNode);
    }
  },
);

// onBeforeMount(async () => {
//   await cartStore.init(false, false);
// });
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
