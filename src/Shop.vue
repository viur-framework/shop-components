<template>
    <div class="bind viur-shop-wrap" v-bind="$attrs" v-if="shopStore.state.cartReady && shopStore.state.orderReady">
        <div class="viur-shop-stepper-wrap"
            :class="{ 'full-width': (!summary || summary==='bottom' || shopStore.state.currentTab==='complete') }"
        >
            <shop-order-stepper >
              <template #template_cart>
                <slot name="template_cart"></slot>
              </template>
              <template #template_userdata>
                <slot name="template_userdata"></slot>
              </template>
              <template #template_shippingmethod>
                <slot name="template_shippingmethod"></slot>
              </template>
              <template #template_paymentprovider>
                <slot name="template_paymentprovider"></slot>
              </template>
              <template #template_confirm>
                <slot name="template_confirm"></slot>
              </template>
              <template #template_complete>
                <slot name="template_complete"></slot>
              </template>
            </shop-order-stepper>
        </div>

        <div class="viur-shop-sidebar-wrap" :class="{ bottom: (summary==='bottom') }" v-if="shopStore.state.currentTab!=='complete'">
          <shop-summary ></shop-summary>
        </div>
    </div>
    <template v-if="shopStore.state.debug">
      <br>
      <sl-details summary="Debug">
          <sl-icon slot="prefix" name="bug"></sl-icon>
          order: {{ shopStore.state.orderKey }}<br>
          cart: {{ shopStore.state.cartRoot?.['key'] }}<br><br>

          shippingaddress: {{shopStore.state.cartRoot?.['shipping_address']}}<br>
          billingaddress: {{shopStore.state.order?.['billing_address']}}<br><br>

          shipping: {{shopStore.state.cartRoot?.['shipping']}}<br><br>
          Payment: {{shopStore.state.order?.['payment_provider']}}<br><br>

          Order Status<br>
          ------<br>
          canCheckout: {{ shopStore.state.canCheckout }}<br>
          canOrder: {{ shopStore.state.canOrder }}<br>
          CheckoutStarted: {{ shopStore.state.order?.['is_checkout_in_progress'] }}<br><br>

          ordered: {{ shopStore.state.order?.['is_ordered'] }}<br>
          readytoship: {{ shopStore.state.order?.['is_rts'] }}<br>
          paid: {{ shopStore.state.order?.['is_paid'] }}<br><br>

          OrderObject: {{shopStore.state.order}}
        
      </sl-details>
    </template>
    <div id="dialogs"></div>
</template>


<script setup>
import { onBeforeMount, watch } from 'vue';
import ShopOrderStepper from './ShopOrderStepper.vue'
import ShopSummary from "./ShopSummary.vue"
import {useViurShopStore} from './shop'
import { useUrlSearchParams } from '@vueuse/core'
import { useOrder } from './composables/order';
import { useCart } from './composables/cart';


const shopStore = useViurShopStore()
const {fetchOrder} = useOrder()
const {fetchCart} = useCart()

const emit = defineEmits('change')


const props = defineProps({
    summary:{
      default:false
    }, // bottom, sidebar
    initTab:{
      default:'cart'
    },
    modulename:{
      default:'shop'
    },
    debug:false,
    showCartNodes:false
})


onBeforeMount(()=>{
    shopStore.state.showNodes = props.showCartNodes
    shopStore.state.debug = props.debug
    if(props.tabs){
        shopStore.state.tabs = props.tabs
    }

    shopStore.state.moduleName= props.modulename
    fetchCart()
    shopStore.fetchMetaData()
    const params = useUrlSearchParams('hash')
    if (Object.keys(params).includes('order')){
        shopStore.state.orderKey = params['order']
        fetchOrder(shopStore.state.orderKey).then(()=>{
          shopStore.state.orderReady = true
          // navigate to order state
          if(shopStore.state.order?.['is_ordered']){
            shopStore.navigateToTab('complete')
          } else if (shopStore.state.order?.['is_checkout_in_progress']){
            shopStore.navigateToTab('confirm')
          }
        })
    }else{
      shopStore.state.orderReady = true
    }


    if (Object.keys(params).includes('step')){
        shopStore.navigateToTab(params['step'])
    }else{
        shopStore.navigateToTab('cart')
    }
})


watch(()=>shopStore.state.currentTab, (newVal,oldVal)=>{
  emit('change', newVal)
})


</script>

<style scoped>

* {
  box-sizing: border-box;
}

.viur-shop-wrap {
  --shop-sidebar-background: var(--sl-color-neutral-100);
  --shop-sidebar-columns: 4;
  --shop-main-columns: 8;
  --shop-tab-color: var(--sl-color-neutral-400);
  --shop-tab-color-active: var(--ignt-color-primary);

  --shop-form-headline-size: 1.5em;
  --shop-success-headline-size: var(--shop-form-headline-size);

  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: 1fr max-content;
  grid-gap: var(--ignt-spacing-2x-large);

  width: 100%;
  border: 0 white solid;
}

@layer foundation.shop {
  :root{
    --viur-shop-sidebar-height-offset:0;
  }
  .viur-shop-sidebar-wrap {
    --padding: var(--sl-spacing-large);

    display: flex;
    flex-direction: column;
    background-color: var(--shop-sidebar-background);
    padding: var(--sl-spacing-medium);
    overflow: hidden;
    border-radius: var(--sl-border-radius-medium);
    /* height has to be set or sidebar grows until infinity... */
    height: min-content;
    grid-column: auto / span 12;
    order: -1;
    & > * + * {
      margin-top: var(--sl-spacing-small);
    }
    @media (min-width: 1024px) {
      position: sticky;
      max-height: calc(100vh - var(--viur-shop-sidebar-height-offset) - 2 * var(--padding));
      top: var(--padding);
      bottom: var(--padding);
      grid-column: auto / span var(--shop-sidebar-columns);
      order: unset;
    }
  }

  .viur-shop-stepper-wrap {
    display: flex;
    flex-direction: column;
    grid-column: auto / span 12;
    @media (min-width: 1024px) {
      grid-column: auto / span var(--shop-main-columns);
    }

    @media (max-width: 600px) {
      &::part(active-tab-indicator) {
        display: none;
      }
    }
  }

  .viur-shop-form-footer {
    height: fit-content;

    /* TODO: sticky Trigger yes no? */
    /* position: sticky;
    bottom: 2rem; */
  }

  :deep(.viur-shop-form-footer) {
    display: flex;
    justify-content: space-between;
    margin-top: var(--sl-spacing-large);
  }

  .flex-end {
    justify-content: flex-end;
  }

  .bottom {
    grid-column: auto / span 12;
    grid-row-start: 2;
  }

  .full-width {
    grid-column: auto / span 12;
  }

  .last-row {
    grid-row-start: 3;
  }
}



</style>
