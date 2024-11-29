<template>
  <h2 class="viur-shop-cart-sidebar-headline headline">Zusammenfassung</h2>
  <br />
  <div class="viur-shop-cart-sidebar-info-line">
    <span>Zwischensumme</span>

    <sl-format-number
      lang="de"
      type="currency"
      currency="EUR"
      :value="state.node?.total"
    >
    </sl-format-number>
    <br />
  </div>
  <div class="viur-shop-cart-sidebar-info-line">
    <span>Rabatt</span>

    <sl-format-number
      lang="de"
      type="currency"
      currency="EUR"
      :value="state.node?.discount ? state.node.discount : 0"
    >
    </sl-format-number>
  </div>
  <div class="viur-shop-cart-sidebar-info-line">
    <shipping-info ref="shipping">
      <template #custom v-if="customShippingComponent">
        <component :is="customShippingComponent"></component>
      </template>
    </shipping-info>
  </div>
  <div class="viur-shop-cart-sidebar-info-line total">
    <span>Gesamt:</span>
    <sl-format-number
      lang="de"
      type="currency"
      currency="EUR"
      :value="totalPrice"
    >
    </sl-format-number>
    <!-- TODO: Some project needs "VAT included" here -->
  </div>
  <!-- TODO: Placement of discount? -->
  <div class="viur-shop-discount-wrap" v-if="showDiscount">
    <Discount></Discount>
  </div>

  <slot name="action-buttons">
    <div class="viur-shop-cart-sidebar-btn-wrap">
      <sl-button variant="primary" size="medium"> Jetzt Bestellen</sl-button>
      <sl-button size="medium" variant="info">
        <sl-icon name="paypal" slot="prefix"></sl-icon>
        Paypal
      </sl-button>
    </div>
  </slot>
</template>

<script setup>
import Discount from "./cart/Discount.vue";
import ShippingInfo from "./ui/generic/ShippingInfo.vue";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useCartStore } from "../stores/cart";
import { useShippingStore } from "../stores/shipping";
import { useOrderStore } from "../stores/order";

const props = defineProps({
  showDiscount: { type: Boolean, default: true },
  customShippingComponent: { type: Object, default: undefined },
});

const cartStore = useCartStore();
const shippingStore = useShippingStore();
const orderStore = useOrderStore();

const shipping = ref(null);

const state = reactive({
  node: computed(() => cartStore.state.cart),
});

const totalPrice = computed(() => {
  if (shippingStore.state.selectedShippingMethod) {
    return (
      state.node.total +
      shippingStore.state.selectedShippingMethod?.dest.shipping_cost -
      state.node.discount
    );
  } else {
    if (Object.keys(cartStore.state.childrenByNode).includes(state.node.key)) {
      return (
        state.node?.total +
        shippingStore.state.selectedShippingMethod?.dest.shipping_cost -
        state.node.discount
      );
    } else {
      return state.node.total + 0 - state.node.discount; //kein shipping
    }
  }
});
</script>

<style>
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

.viur-shop-cart-sidebar-btn-wrap {
  display: flex;
  flex-direction: column;
  margin-top: var(--sl-spacing-large);

  sl-button {
    margin-bottom: var(--sl-spacing-x-small);
  }
}

.viur-shop-cart-sidebar-headline {
  margin: 0 0 var(--sl-spacing-large) 0;
}
</style>
