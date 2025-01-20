<template>
  <loading-handler :isLoading="shippingState.isLoading" :hasError="shippingState.hasError" :errorMessage="shippingState.errorMessage">

    <card-selector :options="shippingState.shippingData"
                    v-model:selection="state.selectedShippingMethod"
                    @change="updateShippingMethod"
    >
      <template v-slot="{option, index}">
          <img slot="image">

          <sl-format-number lang="de" type="currency" currency="EUR" :value=" option['dest']['shipping_cost']" v-if="option['dest']['shipping_cost']">
          </sl-format-number>
          <span v-else>{{ $t('shop.free_shipping') }}</span>
          {{ option['dest']['name'] }} - {{$t('shop.deliverytime')}}: {{ option['dest']['delivery_time_range'] }} {{  $t('shop.day',option['dest']['delivery_time_max'] - option['dest']['delivery_time_min']) }}
      </template>
    </card-selector>
  </loading-handler>

  <slot name="template_shippingmethod">
  </slot>

  <slot
        nextName="weiter"
        :activefunction="()=>shopStore.state.cartRoot?.['shipping']"
        :nextfunction="()=>nextStep"
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
  await fetchOrder(shopStore.state.orderKey)
}

onBeforeMount(()=>{
  fetchShippingData()
  state.selectedShippingMethod = shopStore.state.cartRoot?.['shipping']
})
</script>


<style scoped>

</style>