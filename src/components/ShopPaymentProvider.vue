<template>
  {{ paymentStore.state.paymentSelection }}
  <sl-radio-group :value="state.selection">
    <sl-details-group>
      <sl-details class="simple" @sl-show="state.selection='prepayment'" >
        <div slot="summary" class="payment-selection">
          <div class="start">
            <sl-icon name="currency-euro"></sl-icon>
            Vorkasse
          </div>
          <sl-radio value="prepayment"></sl-radio>
        </div>
        Einfach Bezahlen über Vorkasse
        <div slot="expand-icon"></div>
        <div slot="collapse-icon"></div>
      </sl-details>
      <sl-details @sl-show="state.selection='prepayment2'">
        <div slot="summary">
          <sl-icon name="credit-card-2-back-fill"></sl-icon>
            Karte
            <sl-radio value="prepayment2"></sl-radio>
        </div>
        
        Bezahlen mit Kreditkarte über Unzer
      </sl-details>
      <sl-details @sl-show="state.selection='prepayment3'">
        <div slot="summary">
          <sl-icon name="paypal"></sl-icon>
            Paypal<sl-radio value="prepayment3"></sl-radio>
        </div>
        Bezahlen mit Paypal über Unzer
      </sl-details>
  </sl-details-group>
</sl-radio-group>

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
  selection:null
})


//await orderStore.startCheckout()
// > on weiter

async function updatePaymentProvider(selection){
  let update = paymentStore.updateOrder()
  if (update){
    emits("valid", true)
  }
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
.payment-selection{
  display: flex;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    width: 100%;

    .start{
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      gap:10px;
    }
}

.simple::part(content){
  display:none;
}
</style>
