,
<template>
  <h2 class="viur-shop-cart-sidebar-headline headline">Zusammenfassung</h2>
  <br />
  <div class="viur-shop-cart-sidebar-info-line">
    <span>Zwischensumme</span>
    <sl-format-number
      lang="de"
      type="currency"
      currency="EUR"
      :value="node.total"
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
      :value="node?.discount ? node.discount : 0"
    >
    </sl-format-number>
  </div>
  <div class="viur-shop-cart-sidebar-info-line">
   <Shipping ref="shipping"></Shipping>
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
  <div class="viur-shop-cart-sidebar-btn-wrap">
    <!-- TODO: Placement of discount? -->
    <div class="viur-shop-discount-wrap" v-if="showDiscount">
      <Discount></Discount>
    </div>

    <sl-button variant="primary" size="medium"> Jetzt Bestellen</sl-button>
    <sl-button size="medium" variant="info">
      <sl-icon name="paypal" slot="prefix"></sl-icon>
      Paypal
    </sl-button>
  </div>
  <!-- TODO: Delivery time estimate: slot -->
   <slot name="custom"></slot>
</template>

<script setup>
import Discount from "../cart/Discount.vue";
import Shipping from "../order/process/Shipping.vue";
import {computed, ref} from "vue";
import { useCartStore } from "../../stores/cart";

const cartStore = useCartStore();

const shipping= ref(null);
const props = defineProps({
  node: { type: Object, required: true },
  showDiscount: { type: Boolean, default: true },
});
console.log("node",props.node);
console.log("store",cartStore.state);
const totalPrice=computed(()=>{
  if(props.node?.shipping)
  {
    console.log("total pirce her ",shipping)
      return props.node.total + props.node?.shipping.dest.shipping_cost - props.node.discount;
  }
else {// use shippingprice formbasket
  console.log(cartStore.state.basket)
if( cartStore.state.basket.length===1)
{
    return props.node.total + cartStore.state.basket.shipping.dest.shipping_cost - props.node.discount;
}
else
{
  return props.node.total + 0 - props.node.discount; //kein shipping
}

  }
})
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
