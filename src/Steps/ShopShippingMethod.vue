<template>
  <slot name="top_actions"  v-if="shopStore.state.topActions"
        :nextName="$t('viur.shop.next')"
        :activefunction="()=>shopStore.state.cartRoot?.['shipping']"
        :nextfunction="()=>nextStep"
    >
    </slot>

  <loading-handler :isLoading="shippingState.isLoading" :hasError="shippingState.hasError" :errorMessage="shippingState.errorMessage">

    <card-selector :options="shippingState.shippingData"
                    v-model:selection="state.selectedShippingMethod"
                    @change="updateShippingMethod"
    >
      <template v-slot="{option, index}">
          <!--<img slot="image">-->
          <sl-bar class="shipping-bar">
            <div slot="left">
              <sl-format-number lang="de" type="currency" currency="EUR" :value=" option['dest']['shipping_cost']" v-if="option['dest']['shipping_cost']">
              </sl-format-number>
              <span v-else>{{ $t('viur.shop.free_shipping') }}</span>
            </div>
            <span slot="right">{{$t('viur.shop.deliverytime')}}: {{ option['dest']['delivery_time_range'] }} {{  $t('viur.shop.day',option['dest']['delivery_time_max'] - option['dest']['delivery_time_min']) }}</span>
          </sl-bar>
        <!--{{ option['dest']['name'] }}-->
      </template>
    </card-selector>
  </loading-handler>

  <slot name="template_shippingmethod">
  </slot>

  <slot
        :nextName="$t('viur.shop.next')"
        :activefunction="()=>shopStore.state.cartRoot?.['shipping']"
        :nextfunction="nextStep"
    >
    </slot>
</template>
<script setup>
import {reactive,onBeforeMount} from "vue";
import CardSelector from "../components/CardSelector.vue";
import LoadingHandler from "../components/LoadingHandler.vue";
import {useShipping} from "../composables/shipping";
import {useCart} from "../composables/cart";
import { useOrder } from "../composables/order";
import {useViurShopStore} from "../shop";

const shopStore = useViurShopStore();
const {updateCart} = useCart();
const {fetchOrder} = useOrder();
const {state: shippingState,fetchShippingData} = useShipping();

const props = defineProps({
  params:{
    type:Object,
    default:{}
  }
})

const state = reactive({
  selectedShippingMethod: null
})

function updateShippingMethod(selection){
  shopStore.state.cartRoot['shipping'] = null
  if (selection){
    updateCart({shipping_key:selection['dest']['key']})
  }
}

async function nextStep(){
  return await fetchOrder(shopStore.state.orderKey)
}

onBeforeMount(()=>{
  fetchShippingData()
  state.selectedShippingMethod = shopStore.state.cartRoot?.['shipping']
})
</script>


<style scoped>
  .shipping-bar {width: 100%; margin-right: var(--ignt-spacing-large)}

</style>
