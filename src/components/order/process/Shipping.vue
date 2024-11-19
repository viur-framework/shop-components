<template>
  <div class="viur-shop-cart-sidebar-info-line">

    <span>Versandkosten </span>
    <sl-format-number
      type="currency"
      currency="EUR"
      :value="shippingCost"
      lang="de">
    </sl-format-number>

  </div>
  <div class="viur-shop-cart-sidebar-info-line">
  <slot name="custom"></slot>
  </div>

</template>
<script setup>
import {useCartStore} from "../../../stores/cart";
import {onBeforeMount, reactive,computed} from "vue";

const cartStore = useCartStore();
const shippingCost = computed(() => {
  return cartStore.state.basket?.shipping?.dest.shipping_cost ? cartStore.state.basket?.shipping.dest.shipping_cost : 0
})
onBeforeMount(async () => {
  await cartStore.init();
  console.log("has shipping ? ",cartStore.state.basket.shipping);
});

</script>

<style scoped>
.viur-shop-cart-sidebar-info-line {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: var(--sl-spacing-2x-small) 0;



  span {
    margin-right: auto;
  }
}
</style>
