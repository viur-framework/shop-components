<template>
  <div class="viur-shop-crossselling-header" slot="header"></div>
  <div class="viur-shop-crossselling-cart-item">
    <h2 class="headline">Folgender Artikel wurde in den Warenkorb gelegt</h2>
    <br />
    <sl-card class="viur-shop-cart-card" horizontal>
      <img
        slot="image"
        :src="getImage(item)"
        :alt="item.shop_name"
        loading="lazy"
        class="viur-shop-cart-card-img"
      />
      <div class="viur-shop-cart-card-body-info">
        <h3 class="viur-shop-cart-card-headline headline">
          {{ item.shop_name }}
        </h3>
        <div class="viur-shop-cart-card-descr">
          {{ item.key }}<br />
          B 21 x H 6,5 x T 19 cm
        </div>
        <div class="viur-shop-cart-card-price">
          {{ item.shop_price_retail }} €
        </div>
      </div>
    </sl-card>
  </div>
  <br />

  <sl-carousel navigation slides-per-page="4">
    <sl-carousel-item v-for="item in shopStore.state.crossSellingItems">
      <CrossSellingView
        :cartkey="cartStore.state.basket"
        :item="item"
        @cancel="closeDialog"
      >
      </CrossSellingView>
    </sl-carousel-item>
  </sl-carousel>
</template>

<script setup>
import { reactive, computed, onBeforeMount, ref } from "vue";
import { useCartStore } from "../../../stores/cart.js";
import { useShopStore } from "../../../stores/shop.js";
import { Request } from "@viur/vue-utils";
import CrossSellingView from "./CrossSellingView.vue";

const props = defineProps({
  mode: { type: String, default: "basket" },
  cartKey: { type: String, default: "" },
  sidebar: { type: Boolean, default: true },
  item: { type: Object, default: {} },
  crossSellingItems: { type: Array, default: [] },
});

const cartStore = useCartStore();
const shopStore = useShopStore();

// Define emits
const emit = defineEmits(["cancel"]);

const state = reactive({
  images: {},
  currentItem: {},
  crossselling: false,
});

const crossSellingItems = computed(() => {
  return props.crossSellingItems;
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
</script>

<style scoped>
sl-alert {
  margin-top: var(--sl-spacing-medium);
  margin-bottom: var(--sl-spacing-medium);
}

.viur-shop-cart-card-img {
  aspect-ratio: 1;
}

sl-tooltip {
  &::part(body) {
    line-height: 1.2;
    font-weight: 400;
    padding: 10px;
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

.viur-shop-cart-card-body-info {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.viur-shop-cart-card-descr {
  margin-bottom: auto;
}

.viur-shop-cart-card-price {
  font-size: 1.3em;
}

sl-carousel {
  --aspect-ratio: auto;
  --slide-gap: var(--sl-spacing-x-large);
}
</style>
