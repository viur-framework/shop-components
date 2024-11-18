<template>
  <sl-button @click="requestShippingData">Reset Tests</sl-button>
  <loading-handler  :isLoading="state.isLoading" :isUpdating="state.isUpdating" :hasError="state.hasError" :errorMessage="state.errorMessage">
    <card-selector :options="shippingStore.state.shippingData" v-model:selection="state.shippingSelection">
      <template v-slot="{option, index}">
          <img slot="image">
          {{ option['dest']['name'] }}
          <div slot="footer">
            Lieferzeit: {{ option['dest']['delivery_time_range'] }}
          </div>
      </template>
    </card-selector>
  </loading-handler>
</template>
<script setup>
import {useCartStore} from "../stores/cart";
import {useShippingStore} from "../stores/shipping"
import {onBeforeMount, reactive,computed, watch} from "vue";
import LoadingHandler from "./generic/loadinghandler.vue"
import CardSelector from "./ui/generic/CardSelector.vue"

const cartStore = useCartStore();
const shippingStore = useShippingStore()

const props = defineProps({
  init:{
    type:Boolean,
    default:true
  }
})

const state = reactive({
  isLoading:false,
  isUpdating:false,
  hasError:false,
  errorMessage:"",
  shippingSelection:null
})

async function requestShippingData(){
  state.shippingSelection = null
  state.isLoading = true
  state.isUpdating = false
  state.hasError = false
  try{
      await shippingStore.getShippingData()
      state.isLoading = false
      if(shippingStore.state.shippingData.length===0){
        state.hasError = true
        state.errorMessage = "Keine gültige Versandart gefunden."
      }
  } catch (error) {
      state.isLoading = false
      state.hasError = true
      state.errorMessage = "Keine gültige Versandart gefunden."
  }
}

watch(()=>cartStore.state.isReady, async(newVal, oldVal)=>{
  if (props.init){
    await requestShippingData() // auto fetch if shop is ready
  }
})

watch(()=>state.shippingSelection,(newVal,oldVal)=>{
  shippingStore.state.selectedShippingMethod = state.shippingSelection
})

onBeforeMount(async () => {
  await cartStore.init();
});

</script>

<style scoped>
.viur-shop-cart-sidebar-info-line {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: var(--sl-spacing-2x-small) 0;



  span {
    margin-right: auto;
  }
}
</style>
