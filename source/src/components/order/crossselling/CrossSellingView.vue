<template>
  <sl-card>
    <img
      slot="image"
      :src="getImage(item)"
      :alt="item.shop_name"
      loading="lazy"
      class="viur-shop-item-card-image"
    />
    <h3 class="viur-shop-item-card-headline">{{ item.shop_name }}</h3>
    <h4 class="viur-shop-item-card-subline">B 21 x H 6,5 x T 19 cm</h4>
    <div class="viur-shop-item-card-price">{{ item.shop_price_retail }} €</div>

    <sl-button
      size="small"
      class="viur-shop-item-card-add-to-cart-btn"
      variant="primary"
      title="Add to cart"
      @click.stop="addToCart(item, cartStore.state.basket)"
      :disabled="state.disabledAddToCart"
    >
      <sl-icon name="bag-plus" slot="prefix"></sl-icon>

      In den Warenkorb
    </sl-button>
    <sl-button
      size="small"
      outline
      class="viur-shop-item-card-add-to-favourites-btn"
      variant="primary"
      title="Add to favourites"
    >
      <sl-icon name="heart" slot="prefix"></sl-icon>
    </sl-button>

    <sl-dialog :open="state.addedToCart" @sl-hide="state.addedToCart = false">
      <div>
        Der Artikel {{ item.shop_name }} wurde zum Warencorb hinzugefügt
      </div>
    </sl-dialog>
  </sl-card>
</template>

<script setup>
import { reactive, computed, onBeforeMount, ref } from "vue";
import { useCartStore } from "../../../stores/cart.js";
//import { useShopStore } from "../../../stores/shop.js";
import { Request } from "@viur/vue-utils";

const props = defineProps({
  cartKey: { type: String, default: "" },
  item: { type: Object, default: {} },
});

const cartStore = useCartStore();
// const shopStore = useShopStore();

// Define emits
const emit = defineEmits(["cancel"]);

const state = reactive({
  images: {},
  currentItem: {},
  crossselling: false,
  disabledAddToCart: false,
});

const item = computed(() => {
  return props.item;
});

function getImage(item) {
  let imageUrl =
    "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
  if (item.hk_artikel.dest.image) {
    return Request.downloadUrlFor(item.hk_artikel.dest.image);
  }

  return imageUrl;
}

const cancel = () => {
  // Emit an event to notify parent component to close the dialog
  emit("cancel");
  state.disabledAddToCart = false;
};

function addToCart(item, basket) {
  console.log("item", item);
  cartStore.addToCart(item.key, basket);
  state.addedToCart = true;
  state.disabledAddToCart = true;
}
</script>

<style scoped>
.viur-shop-cart-wrap {
  flex-direction: row;
  gap: var(--sl-spacing-x-large);
  align-items: flex-start;
}

.viur-shop-cart-sidebar-btn-wrap {
  display: flex;
  flex-direction: column;
  margin-top: var(--sl-spacing-large);

  sl-button {
    margin-bottom: var(--sl-spacing-x-small);
  }
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

.viur-shop-cart-sidebar-info-line {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: var(--sl-spacing-2x-small) 0;

  &.total {
    font-weight: 600;
    border-top: 1px solid var(--sl-color-neutral-300);
    border-bottom: 1px solid var(--sl-color-neutral-300);
    padding: var(--sl-spacing-x-small) 0;
    margin: var(--sl-spacing-small) 0;
  }

  span {
    margin-right: auto;
  }
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
</style>
