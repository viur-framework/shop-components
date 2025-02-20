<template>
    <div class="list">
    <h2 class="viur-shop-cart-headline headline">{{ $t('shop.check_order')}}</h2>
    <div class="viur-shop-cart-address-wrap">
      <div class="viur-shop-cart-address">
        <div class="viur-shop-user-data-headline">
          {{ $t('viur.shop.skeleton.cartnode.shipping_address') }}
        </div>
        <template v-if="state.shippingAddress">
          {{ state.shippingAddress?.firstname }}
          {{ state.shippingAddress?.lastname }}<br />
          {{ state.shippingAddress?.street_name }}
          {{ state.shippingAddress?.street_number }}<br />
          {{ state.shippingAddress?.zip_code }}
          {{ state.shippingAddress?.city }}<br />
          {{ getDescrName('country',state.shippingAddress?.country) }}<br />
        </template>
      </div>
      <div class="viur-shop-cart-address">
        <div class="viur-shop-user-data-headline">
          {{ $t('viur.shop.skeleton.order.billing_address') }}
        </div>
        <template v-if="state.billingAddress">
          {{ state.billingAddress.firstname }}
          {{ state.billingAddress.lastname }}<br />
          {{ state.billingAddress.street_name }}
          {{ state.billingAddress.street_number }}<br />
          {{ state.billingAddress.zip_code }}
          {{ state.billingAddress.city }}<br />
          {{ getDescrName('country',state.billingAddress.country) }}<br />
        </template>
      </div>
    </div>

    <div class="viur-shop-cart-payment">
      <div class="viur-shop-cart-payment-method">
        <span>{{ $t('viur.shop.skeleton.order.payment') }} </span>
        <p>
          {{ shopStore.state['paymentMeta']?.[state.payment]?.['title']}}
        </p>
      </div>
    </div>

    <div class="viur-shop-cart-payment">
      <div class="viur-shop-cart-payment-method">
        <span>{{ $t('viur.shop.module.shipping') }}</span>
        <p>
          {{ state.shipping?.name }}
          -
          <sl-format-number
            type="currency"
            currency="EUR"
            :value="
              state.shipping?.shipping_cost
            "
            lang="de"
          >
          </sl-format-number>
        </p>
      </div>
    </div>

    <sl-details :summary="$t('viur.shop.skeleton.order.cart')">
      <template  v-for="item in state.cartList">
      <cart-item-small v-if="item.skel_type==='leaf'" :item="item" @sl-show="getOrderCart">
      </cart-item-small>
    </template>
  </sl-details>
  </div>

  <component :is="params['additionalComponent']" v-if="params['additionalComponent']" ref="additionalComponent">
  </component>

  <div class="wrapper">
    <sl-button size="small" @click="startCheckout" :disabled="!shopStore.state.canCheckout" variant="success">{{ $t('shop.order_pay') }}</sl-button>
  </div>

  <template v-if="shopStore.state.order?.['payment_provider'] !== null && shopStore.state.order?.['payment_provider'].startsWith('unzer-')">
    <sl-dialog v-if="state.paymentPopup" label="Zahlung" :open="state.paymentPopup" @sl-after-hide="state.paymentPopup=false">
        <payment-provider-unzer @cancel="paymentCanceled"></payment-provider-unzer>
    </sl-dialog>
  </template>

  <slot name="template_confirm">
  </slot>
</template>
<script setup>
import {computed, onBeforeMount, reactive, watch, useTemplateRef} from 'vue'
import { useViurShopStore } from '../shop';
import boneUtils from '@viur/vue-utils/bones/utils'
import {Request} from '@viur/vue-utils'
import CartItemSmall from '../components/CartItemSmall.vue';
import PaymentProviderUnzer from '../components/PaymentProviderUnzer.vue';
const shopStore = useViurShopStore()

const additionalComponent = useTemplateRef('additionalComponent')

const props = defineProps({
  params:{
    type:Object,
    default:{}
  }
})

// collected data from order Object > Session cart is not available anymore
const state = reactive({
    shippingAddress: computed(()=>shopStore.state.order?.['cart']?.['dest']?.['shipping_address']?.['dest']),
    shipping: computed(()=>shopStore.state.order?.['cart']?.['dest']?.['shipping']?.['dest']),
    billingAddress: computed(()=>shopStore.state.order?.['billing_address']?.['dest']),
    payment: computed(()=>shopStore.state.order?.['payment_provider']),
    cartList:[],
    paymentPopup:false
})


// simple wrapper for value rendering
function getDescrName(boneName, val) {
  if (!shopStore.state.addressStructure || !val) return val
  return boneUtils.getDescr(shopStore.state.addressStructure[boneName],val)
}

// fetch cart from order
function getOrderCart(){
  let cartKey = shopStore.state.order?.['cart']?.['dest']?.['key']
  Request.get(`${shopStore.state.shopApiUrl}/cart_list`,{dataObj:{
      cart_key:cartKey
  }}).then(async( resp) =>{
      let data = await resp.json()
      state.cartList=data
  })
}

function paymentCanceled(){
  state.paymentPopup=false
}

//open popup and freeze cart
async function startCheckout(){
  if (props.params?.additionalComponent){
      let valid = await additionalComponent.value.valid()
      if (!valid){
        return false
      }
  }
  state.paymentPopup=true
  shopStore.checkout()
}

//close popup if payment successfull
watch(()=>shopStore.state.order?.['is_paid'],(newVal,oldVal)=>{
  if(newVal){
    state.paymentPopup=false
  }
})

onBeforeMount(()=>{
  getOrderCart()
})

</script>

<style scoped>
.wrapper{
  padding:20px;
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

sl-tooltip {
  &::part(body) {
    line-height: 1.2;
    font-weight: 400;
    padding: 10px;
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

.viur-shop-cart-sidebar-info-line {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: var(--sl-spacing-2x-small) 0;

  span {
    margin-right: auto;
  }

  &.total {
    font-weight: 600;
    border-top: 1px solid var(--sl-color-neutral-300);
    border-bottom: 1px solid var(--sl-color-neutral-300);
    padding: var(--sl-spacing-x-small) 0;
    margin: var(--sl-spacing-small) 0;
  }
}

.viur-shop-cart-mini-card {
  margin-bottom: var(--sl-spacing-x-large);

  &::part(header) {
    border-bottom: none;
    padding-top: 0;
    padding-right: 0;
  }

  &::part(image) {
    flex-basis: 25%;
    max-width: 90px;
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

.viur-shop-cart-mini-card-body-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: var(--sl-spacing-large);
  flex: 1;
}

.viur-shop-cart-mini-card-body-info {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.viur-shop-cart-mini-card-info-wrap {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--sl-spacing-medium);
}

.viur-shop-cart-mini-card-info {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  span {
    margin-right: var(--sl-spacing-x-small);
    font-weight: 600;
  }
}

.viur-shop-cart-address-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sl-spacing-x-large);
  margin-bottom: var(--sl-spacing-x-large);
}

.viur-shop-user-data-headline {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

.viur-shop-cart-payment {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sl-spacing-x-large);

  span {
    font-weight: 600;
  }
}

.viur-shop-cart-headline {
  margin: 0 0 var(--sl-spacing-x-large) 0;
  font-size: var(--shop-form-headline-size);
}
</style>
