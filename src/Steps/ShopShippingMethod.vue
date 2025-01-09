<template>
  <loading-handler :isLoading="shippingState.isLoading" :hasError="shippingState.hasError" :errorMessage="shippingState.errorMessage">

    <card-selector :options="shippingState.shippingData"
                    v-model:selection="state.selectedShippingMethod"
                    @change="updateShippingMethod"
    >
      <template v-slot="{option, index}">
          <img slot="image">
          {{ option['dest']['name'] }} - Lieferzeit: {{ option['dest']['delivery_time_range'] }} Tage
      </template>
    </card-selector>
  </loading-handler>
  <slot
        nextName="weiter"
        :activefunction="()=>shopStore.state.cartRoot?.['shipping']"
        :nextfunction="()=>true"
    >
    </slot>
</template>
<script setup>
import {reactive,onBeforeMount} from "vue";
import CardSelector from "../components/CardSelector.vue";
import LoadingHandler from "../../old/components/generic/loadinghandler.vue";
import {useShipping} from "../composables/shipping";
import {useCart} from "../composables/cart";
import {useViurShopStore} from "../shop";

const shopStore = useViurShopStore();
const {updateCart} = useCart();
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

onBeforeMount(()=>{
  fetchShippingData()
  state.selectedShippingMethod = shopStore.state.cartRoot?.['shipping']
})
</script>


<style scoped>

</style>