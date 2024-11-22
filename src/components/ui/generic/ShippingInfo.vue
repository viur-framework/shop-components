<template>
  <div class="viur-shop-cart-sidebar-shipping">
    <div class="viur-shop-cart-shipping-item">
      <slot name="custom"></slot>
    </div>
    <div class="viur-shop-cart-shipping-item">
      <span>Versandkosten </span>
      <sl-format-number
        type="currency"
        currency="EUR"
        :value="shippingCost"
        lang="de"
      >
      </sl-format-number>
    </div>
    <div class="viur-shop-cart-shipping-item">
      <span>Lieferzeit </span>
      {{ deliveryTime === 1 ? deliveryTime + " Tag" : deliveryTime + " Tage" }}
    </div>
  </div>
</template>
<script setup>
import { useShippingStore } from "../../../stores/shipping";
import { computed } from "vue";

const shippingStore = useShippingStore();

const shippingCost = computed(() => {
  return shippingStore.state.selectedShippingMethod?.dest.shipping_cost
    ? shippingStore.state.selectedShippingMethod.dest.shipping_cost
    : 0;
});

const deliveryTime = computed(() => {
  return shippingStore.state.selectedShippingMethod?.dest.delivery_time_max
    ? shippingStore.state.selectedShippingMethod.dest.delivery_time_max
    : 0;
});
</script>

<style scoped>
.viur-shop-cart-sidebar-shipping {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin: var(--sl-spacing-2x-small) 0;
}
.viur-shop-cart-shipping-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
