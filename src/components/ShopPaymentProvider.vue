<template>
<loading-handler :isLoading="paymentStore.state.isLoading" 
                  :isUpdating="paymentStore.state.isUpdating" 
                  :hasError="paymentStore.state.hasError" 
                  :errorMessage="paymentStore.state.errorMessage">

    <card-selector :options="paymentStore.state.paymentProviders" v-model:selection="paymentStore.state.paymentSelection" @change="updatePaymentProvider">
      <template v-slot="{option, index}">
          <img slot="image" :src="option[1].image_path">
          {{ option[1]['title'] }}
          <div slot="footer">
            {{ option[1]['descr'] }}
          </div>
      </template>
    </card-selector>
  </loading-handler>

  <div v-if="paymentStore.state.paymentSelection?.[0].startsWith('unzer-')">
    <unzer-payment></unzer-payment>
  </div>


</template>
<script setup>
import {useCartStore} from "../stores/cart";
import {usePaymentStore} from "../stores/payment"
import {onBeforeMount, reactive,computed, watch} from "vue";
import LoadingHandler from "./generic/loadinghandler.vue"
import CardSelector from "./ui/generic/CardSelector.vue"
import unzerPayment from './paymentProvider/unzerPayment.vue'

const cartStore = useCartStore();
const paymentStore = usePaymentStore()
const emits = defineEmits(['valid'])
const props = defineProps({
})

const state = reactive({
})


async function updatePaymentProvider(selection){
  let update = await paymentStore.updateOrder()
  if (update){
    emits("valid")
  }
}

onBeforeMount(async () => {
  await paymentStore.initPayment()
});

</script>

<style scoped>

</style>