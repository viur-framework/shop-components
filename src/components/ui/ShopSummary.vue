,
<template>
  <h2 class="viur-shop-cart-sidebar-headline headline">Zusammenfassung</h2>
  <br/>
  <div class="viur-shop-cart-sidebar-info-line">
    <span>Zwischensumme</span>

    <sl-format-number
      lang="de"
      type="currency"
      currency="EUR"
      :value="state.node?.total"
    >
    </sl-format-number>
    <br/>
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
    <Shipping ref="shipping">
      <template #custom v-if="customShippingComponent">
            <component :is="customShippingComponent"></component>
          </template>
    </Shipping>
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
import {computed, onBeforeMount, reactive, ref} from "vue";
import {useCartStore} from "../../stores/cart";

const cartStore = useCartStore();

const shipping = ref(null);
const props = defineProps({
  showDiscount: {type: Boolean, default: true},
  customShippingComponent:{type:Object,default:undefined},
});
console.log("csc",props.customShippingComponent)
const state=reactive({
  node:{}
})

const totalPrice = computed(() => {
  if (state.node?.shipping) {
    return state.node.total + state.node?.shipping?.dest.shipping_cost - state.node.discount;
  } else {// use shippingprice formbasket
    console.log(cartStore.state.basket)

    if (cartStore.state.basket.length === 1) {
      return state.node?.total + cartStore.state.basket.shipping?.dest.shipping_cost - state.node.discount;
    } else {
      return state.node.total + 0 - state.node.discount; //kein shipping
    }

  }
})
onBeforeMount(async ()=>{
  await cartStore.init();
  state.node  = cartStore.state.basketRootNode;
  console.log("get node",state.node)
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
