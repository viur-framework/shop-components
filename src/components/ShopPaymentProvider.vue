<template>

  <loading-handler :isLoading="paymentStore.state.isLoading"
                  :isUpdating="paymentStore.state.isUpdating"
                  :hasError="paymentStore.state.hasError"
                  :errorMessage="paymentStore.state.errorMessage">

      <PaymentSelector :options="state.options" @valid="checkPaymentIsValid">

      </PaymentSelector>

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

import PaymentSelector from "./ui/payment/PaymentSelector.vue";


const cartStore = useCartStore();
const paymentStore = usePaymentStore()
const emits = defineEmits(['valid'])
const props = defineProps({
})


  let iconMap = {
    'prepayment':'currency-euro',
    'unzer-card':'credit-card-2-back-fill',
    'unzer-paypal':'paypal',
    'unzer-ideal':'bank2',
    'unzer-sofort':'cash-coin'
  }

  let simpleProviders = [
    'prepayment',
    'unzer-paypal',
    'unzer-sofort'
  ]

const state = reactive({
  selection:null,
  selectionValid:false,
  options:computed(()=>{
    let options = []
    let option = {
      paymenttype:null,
      widget:"default",
      name:null,
      description:null,
      icon:null

    }

    for (const provider of paymentStore.state.paymentProviders){
      let currentOption = {...option}
      currentOption.paymenttype = provider[0]
      currentOption.name = provider[1]['title']
      currentOption.description = provider[1]['descr']
      currentOption.icon = iconMap[provider[0]]
      if (simpleProviders.includes(provider[0])){
        currentOption.widget = "simple"
      }

      options.push(currentOption)
    }


    return options
  })
})


//await orderStore.startCheckout()
// > on weiter

async function updatePaymentProvider(selection){
  let update = paymentStore.updateOrder()
  if (update){
    emits("valid", true)
  }
}

function checkPaymentIsValid(selection) {
  console.log(selection)
  state.selectionValid = selection
}


onBeforeMount(async () => {
  await paymentStore.initPayment()
  console.log("AAA")
  const script = document.createElement('script');
        script.src = 'https://static.unzer.com/v1/unzer.js';
        script.addEventListener('error', e => console.log(e.error));
        document.head.appendChild(script);
  console.log("BBBB")
});

</script>

<style scoped>

</style>
