<template>
    <div class="list">
    <h2 class="viur-shop-cart-headline headline">Bestellung prüfen</h2>
    <div class="viur-shop-cart-address-wrap">
      <div class="viur-shop-cart-address">
        <div class="viur-shop-cart-address-headline">
          Versandadresse
        </div>
        {{ state.shippingAddress?.firstname }}
        {{ state.shippingAddress?.lastname }}<br />
        {{ state.shippingAddress?.street_name }}
        {{ state.shippingAddress?.street_number }}<br />
        {{ state.shippingAddress?.zip_code }}
        {{ state.shippingAddress?.city }}<br />
        {{ getDescrName('country',state.shippingAddress?.country) }}<br />
      </div>
      <div class="viur-shop-cart-address">
        <div class="viur-shop-cart-address-headline">
          Rechnungsadresse
        </div>
        {{ state.billingAddress.firstname }}
        {{ state.billingAddress.lastname }}<br />
        {{ state.billingAddress.street_name }}
        {{ state.billingAddress.street_number }}<br />
        {{ state.billingAddress.zip_code }}
        {{ state.billingAddress.city }}<br />
        {{ getDescrName('country',state.billingAddress.country) }}<br />
      </div>
    </div>

    <div class="viur-shop-cart-payment">
      <div class="viur-shop-cart-payment-method">
        <span>Zahlungsmethode: </span>
        <span> {{ shopStore.state['paymentMeta'][state.payment]['title']}}</span>
      </div>
    </div>

    <div class="viur-shop-cart-payment">
      <div class="viur-shop-cart-payment-method">
        <span>Versandart:</span>
        <p>
          {{ state.shipping?.name || 'Versand' }}
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

    <sl-details summary="Warenkorb">
    <cart-item v-for="item in state.cartList" :item="item" itemstyle="small">
    </cart-item>
  </sl-details>
  </div>


  <div class="wrapper">
    <sl-button size="small" @click="startCheckout" :disabled="!shopStore.state.canCheckout" variant="success">Zahlungspflichtig Bestellen</sl-button>
  </div>
  <template v-if="shopStore.state.order?.['payment_provider'].startsWith('unzer-')">
    <sl-dialog label="Zahlung" :open="state.paymentPopup" @sl-after-hide="state.paymentPopup=false">
        <payment-provider-unzer></payment-provider-unzer>
    </sl-dialog>
  </template>

    <slot
      nextName="weiter"
      :activefunction="()=>true"
      :nextfunction="()=>true"
  >
  </slot>

</template>
<script setup>
import {computed, reactive, watch} from 'vue'
import { useViurShopStore } from '../shop';
import boneUtils from '@viur/vue-utils/bones/utils'
import {Request} from '@viur/vue-utils'
import CartItem from '../components/CartItem.vue';
import { useStepper } from '../composables/stepper'
import PaymentProviderUnzer from '../components/PaymentProviderUnzer.vue';
const shopStore = useViurShopStore()
const tab = 'confirm' //marks component for a step


const state = reactive({
    shippingAddress: computed(()=>shopStore.state.order?.['cart']?.['dest']?.['shipping_address']?.['dest']),
    billingAddress: computed(()=>shopStore.state.order?.['billing_address']?.['dest']),
    shipping: computed(()=>shopStore.state.order?.['shipping']?.['dest']),
    payment: computed(()=>shopStore.state.order?.['payment_provider']),
    cartList:[],
    paymentPopup:false
})



function getDescrName(boneName, val) {
  if (!shopStore.state.addressStructure || !val) return val
  return boneUtils.getDescr(shopStore.state.addressStructure[boneName],val)
}

function getOrderCart(){
  let cartKey = shopStore.state.order['cart']['dest']['key']
  Request.get(`${shopStore.state.shopApiUrl}/cart_list`,{dataObj:{
      cart_key:cartKey
  }}).then(async( resp) =>{
      let data = await resp.json()
      state.cartList=data
  })
}

function startCheckout(){
  state.paymentPopup=true
  shopStore.checkout()
}

watch(()=>shopStore.state.order?.['is_paid'],(newVal,oldVal)=>{
  if(newVal){
    state.paymentPopup=false
  }
})

function init(){
  getOrderCart()
}

const stepper = useStepper(tab,init, ()=>{})

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

.viur-shop-cart-address-headline {
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
