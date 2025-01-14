<template>
  <LoadingHandler :isLoading="!state.items.length">
    <h2 class="viur-shop-cart-sidebar-headline headline">Zusammenfassung</h2>
    <div class="viur-shop-cart-sidebar-summary">
      <div class="viur-shop-cart-sidebar-summary-item" v-for="item in state.items">
        <template v-if="(!shopStore.state.showNodes && item.skel_type === 'leaf') || shopStore.state.showNodes">
          <div class="viur-shop-cart-sidebar-summary-item-amount" v-if="item.skel_type === 'leaf'">{{ item.quantity }}x
          </div>
          <div class="viur-shop-cart-sidebar-summary-item-name" v-html="item.skel_type === 'node' ? item.name : item.shop_name"></div>
          <div class="viur-shop-cart-sidebar-summary-item-price">
            <sl-format-number lang="de" type="currency" currency="EUR"
              :value="item.total ? item.total : item.price?.current">
            </sl-format-number>
          </div>
        </template>
      </div>
    </div>
    <div class="viur-shop-cart-sidebar-info-line">
      <span>Zwischensumme</span>
      <sl-format-number lang="de" type="currency" currency="EUR" :value="state.cartTotal">
      </sl-format-number>
    </div>
    <div class="viur-shop-cart-sidebar-info-line">
      <span>Versandkosten</span>
      <sl-format-number lang="de" type="currency" currency="EUR" :value="state.shippingTotal">
      </sl-format-number>
    </div>
    <div class="viur-shop-cart-shipping-item" v-if="shopStore.state.order?.cart?.dest?.shipping">
      <span>Lieferzeit </span>
      <span>
        {{
          shopStore.state.order?.cart?.dest?.shipping?.dest?.delivery_time_range ?
            shopStore.state.order?.cart?.dest?.shipping?.dest?.delivery_time_range :
            0
        }} {{ shopStore.state.order?.cart?.dest?.shipping?.dest?.delivery_time_range === 1 ? "Tag" : "Tage" }}
      </span>
    </div>
    <div class="viur-shop-cart-sidebar-info-line" v-if="shopStore.state.cartRoot.discount">
      <span>Rabatt</span>
      <sl-format-number lang="de" type="currency" currency="EUR" :value="state.discount">
      </sl-format-number>
    </div>
    <discount-input v-if="shopStore.state.currentTab!=='complete'"></discount-input>
    <div class="viur-shop-cart-sidebar-info-line">
    </div>
    <div class="viur-shop-cart-sidebar-info-line total">
      <span>Gesamt:</span>
      <sl-format-number lang="de" type="currency" currency="EUR" :value="state.total">
      </sl-format-number>
    </div>
    <slot name="action-buttons">
      <div class="viur-shop-cart-sidebar-btn-wrap" v-if="!shopStore.state.order?.['is_paid']">
        <sl-button variant="primary" size="medium">Bestellen</sl-button>
      </div>
    </slot>
  </LoadingHandler>
</template>

<script setup>
import { reactive, computed, onBeforeMount } from 'vue'
import { useViurShopStore } from "./shop";
import { useCart } from "./composables/cart";
import LoadingHandler from "./components/LoadingHandler.vue"
import DiscountInput from './components/DiscountInput.vue';

const shopStore = useViurShopStore();
const { fetchCart, addItem, state: cartState } = useCart();

const state = reactive({
  items: computed(() => { return shopStore.state.cartList }),
  cartTotal: computed(() => { 
    
    return shopStore.state.cartRoot ? shopStore.state.cartRoot.total : 0 
  }),
  shippingTotal: computed(() => {
    let total = 0

    // let hasOrder = Object.keys(shopStore.state.order).length ? true : false
    // let hasShipping = Object.keys(shopStore.state.order.cart.dest.shipping).length ? true : false

    if( shopStore.state?.order?.cart?.dest?.shipping?.dest?.shipping_cost > 0 ) {
      total += shopStore.state.order.cart.dest.shipping.dest.shipping_cost
    }

    return total
  }),
  discount:computed(()=> (state.cartTotal - shopStore.state.cartRoot.total_discount_price)*-1),
  total: computed(() => {
    let total = state.cartTotal
    if (shopStore.state.cartRoot.total_discount_price !== shopStore.state.cartRoot.total){
      total = shopStore.state.cartRoot.total_discount_price
    }

    return total + state.shippingTotal
  })
})

onBeforeMount(() => {
  if (!shopStore.state.cartList.length) {
    fetchCart()
  }
})
</script>

<style scoped>
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

.viur-shop-cart-sidebar-summary {
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-bottom: var(--sl-spacing-small);
  padding-right: 4px;
  margin-right: -4px;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--sl-color-neutral-300);
    transition: background ease .3s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--sl-color-neutral-400);
  }
}

.viur-shop-cart-sidebar-summary-item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: var(--sl-spacing-medium);
  margin-bottom: var(--sl-spacing-small);
}

.viur-shop-cart-sidebar-summary-item-name {
  margin-right: auto;
}
</style>
