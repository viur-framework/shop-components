<template>
  <loading-handler :isLoading="shippingState.isLoading">

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
  {{shopStore.state.cartRoot?.['shipping']}}
  <slot
        nextName="weiter"
        :activefunction="()=>shopStore.state.cartRoot?.['shipping']"
        :nextfunction="()=>true"
    >
    </slot>
</template>
<script setup>
import {reactive} from "vue";
import CardSelector from "../components/CardSelector.vue";
import LoadingHandler from "../../old/components/generic/loadinghandler.vue";
import {useShipping} from "../composables/shipping";
import {useStepper} from "../composables/stepper";
import {useCart} from "../composables/cart";
import {useViurShopStore} from "../shop";

const shopStore = useViurShopStore();

const {updateCart} = useCart();
const {state: shippingState,fetchShippingData} = useShipping();
const tab = 'shippingmethod' //marks component for a step

function init(){
  fetchShippingData()
  state.selectedShippingMethod = shopStore.state.cartRoot?.['shipping']
}

const stepper = useStepper(tab, init, ()=>{})

const state = reactive({
  selectedShippingMethod: null
})


function updateShippingMethod(selection){
  if (selection){
    updateCart({shipping_key:selection['dest']['key']})
  }
}





</script>


<style scoped>

</style>