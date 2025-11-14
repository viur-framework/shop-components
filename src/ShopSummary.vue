<template>
  <LoadingHandler :isLoading="state.loading">
    <h2 class="viur-shop-cart-sidebar-headline headline" v-html="$t('viur.shop.summary_headline')"></h2>
    <div class="viur-shop-cart-sidebar-summary">
      <div class="viur-shop-cart-sidebar-summary-item" v-for="item in state.items">
        <template v-if="(!shopStore.state.showNodes && item.skel_type === 'leaf') || shopStore.state.showNodes">
          <div class="viur-shop-cart-sidebar-summary-item-amount" v-if="item.skel_type === 'leaf'">
            {{ item.quantity }}&nbsp;&times;
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
    <template v-if="showFeatures">
      <div class="viur-shop-cart-sidebar-info">
      <span v-html="$t('viur.shop.summary_subtotal')"></span>
      <sl-format-number lang="de" type="currency" currency="EUR" :value="state.cartTotal">
      </sl-format-number>
    </div>
    <div class="viur-shop-cart-sidebar-info">
      <span v-html="$t('viur.shop.summary_shipping_total')"></span>
      <sl-format-number lang="de" type="currency" currency="EUR" :value="state.shippingTotal">
      </sl-format-number>
    </div>
    <div class="viur-shop-cart-sidebar-info" v-if="shopStore.state.cartRoot.discount">
      <span v-html="$t('viur.shop.summary_discount')"></span>
      <sl-format-number lang="de" type="currency" currency="EUR" :value="state.discount">
      </sl-format-number>
    </div>
    <discount-input v-if="shopStore.state.currentTab!=='complete'"></discount-input>
    </template>

    <div class="viur-shop-cart-sidebar-info">
    </div>

    <div class="viur-shop-cart-sidebar-info viur-shop-cart-sidebar-info--total">
      <span v-html="$t('viur.shop.summary_total')"></span>
      <sl-format-number lang="de" type="currency" currency="EUR" :value="state.total">
      </sl-format-number>
    </div>
    <div class="viur-shop-cart-sidebar-info " v-for="vatObj in state.vat">
      <span v-html="$t('viur.shop.summary_vat', {'percentage':calc_percent(vatObj.percentage) })"></span>
      <sl-format-number lang="de" type="currency" currency="EUR" :value="vatObj.value">
      </sl-format-number>
    </div>
    <div class="viur-shop-cart-sidebar-info viur-shop-cart-shipping-item" v-if="shopStore.state.order?.cart?.dest?.shipping">
      <span v-html="$t('viur.shop.summary_delivery_time')"></span>
      <span>
        {{
          shopStore.state.order?.cart?.dest?.shipping?.dest?.delivery_time_range ?
            shopStore.state.order?.cart?.dest?.shipping?.dest?.delivery_time_range :
            0
        }} {{ $t('viur.shop.day',state.shippingTime) }}
      </span>
    </div>

    <slot name="action-buttons" >
      <div class="viur-shop-cart-sidebar-btn-wrap" v-if="false && !shopStore.state.order?.['is_paid']">
        <sl-button variant="success" size="large">{{ $t("shop.summary_checkout") }}</sl-button>
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

const props = defineProps({
  showFeatures: {type: Boolean, default: true},
})

const state = reactive({
  items: computed(() => { return shopStore.state.cartList }),
  cartTotal: computed(() => {
    // TODO: Why isn't total_raw used? :: return shopStore.state.cartRoot.total_raw
    let sum = state.items.reduce((acc,item)=>{
      if (item.skel_type==="leaf"){
        acc+=item.price.current *item.quantity
      }

      return acc;
    },0)
    return sum
  }),
  shippingTotal: computed(() => {
    let total = 0
    if (shopStore.state.cartRoot.shipping?.dest?.shipping_cost>=0 ){
      total += shopStore.state.cartRoot.shipping?.dest?.shipping_cost
    }else if( shopStore.state?.order?.cart?.dest?.shipping?.dest?.shipping_cost) {
      total += shopStore.state.order.cart.dest.shipping.dest.shipping_cost
    }

    return total
  }),
  shippingTime:computed(()=>{
    try{
       let times = shopStore.state.order?.cart?.dest?.shipping?.dest?.delivery_time_range.split(" - ").map(x=>parseInt(x))
       return times[1] - times[0]
    }catch(e){
      return "-"
    }
  }),
  discount:computed(()=> (state.cartTotal - shopStore.state.cartRoot.total_discount_price)*-1),
  total: computed(() => {
    return shopStore.state.cartRoot.total_discount_price
  }),
  vat:computed(()=>{
    return shopStore.state.cartRoot.vat
  }),
  sum:computed(()=>{
    let sum = state.items.reduce((acc,item)=>{
      if (item.skel_type==="leaf"){
        acc+=item.price.current *item.quantity
      }

      return acc;
    },0)
    return sum
  }),
  loading:false
})

onBeforeMount(() => {
  state.loading=true
  if (!shopStore.state.cartList.length) {
    fetchCart().then(()=>state.loading=false).catch(()=>state.loading=false)
  }else{
    state.loading=false
  }
})

function calc_percent(val){
  return new Intl.NumberFormat("de-DE", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(val);
}


</script>

<style scoped>

.viur-shop-cart-sidebar-info {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  span:first-of-type {
    margin-right: auto;
  }
}

.viur-shop-cart-sidebar-info--total {
  font-weight: 600;
  border-top: 1px solid var(--sl-color-neutral-300);
  padding-top: var(--sl-spacing-x-small);
}

.viur-shop-cart-sidebar-btn-wrap {
  display: flex;
  flex-direction: column;
  margin-top: var(--sl-spacing-large);

  sl-button {
    margin-bottom: var(--sl-spacing-x-small);
  }
}

.viur-shop-cart-sidebar-summary {
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-right: 4px;
  margin-right: -4px;

  & > *:not(:empty) + *:not(:empty) {
    margin-top: var(--sl-spacing-small);
  }

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
}

.viur-shop-cart-sidebar-summary-item-name {
  margin-right: auto;
}
</style>
