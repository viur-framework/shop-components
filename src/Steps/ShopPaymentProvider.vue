<template>
  <slot name="top_actions"  v-if="shopStore.state.topActions"
      :nextName="$t('viur.shop.next')"
      :activefunction="()=>shopStore.state.order?.['payment_provider']"
      :nextfunction="()=>true"
  >
  </slot>

  <sl-radio-group :value="state.selection">
    <sl-details-group>

      <payment-option v-for="option in paymentState.paymentData" :key="option.id"
                      :paymenttype="option.paymenttype"
                      :name="option.name"
                      :icon="option.icon"
                      :widget="option.widget"
                      :description="option.description"
                      @change="optionChanged"

      >
      </payment-option>

    </sl-details-group>
  </sl-radio-group>

  <slot name="template_paymentprovider">
  </slot>

  <slot
      :nextName="$t('viur.shop.next')"
      :activefunction="()=>shopStore.state.order?.['payment_provider']"
      :nextfunction="()=>true"
  >
  </slot>

</template>
<script setup>
import {computed, reactive, onBeforeMount} from 'vue'
import PaymentOption from "../components/PaymentOption.vue";
import {usePayment} from "../composables/payment";
import {useOrder} from "../composables/order";
import {useViurShopStore} from "../shop";

const {state:paymentState, fetchPaymentData} = usePayment()
const {addOrUpdateOrder} = useOrder()
const shopStore = useViurShopStore()

const props = defineProps({
  params:{
    type:Object,
    default:{}
  }
})

const state = reactive({
    selection:null,
})

function optionChanged(type){
  shopStore.state.order['payment_provider'] = null
  state.selection=type
  addOrUpdateOrder({payment_provider:type})
}

onBeforeMount(()=>{
  fetchPaymentData().then(()=>{
    state.selection = shopStore.state.order?.['payment_provider']
  })
})
</script>

<style scoped>
  sl-radio-group {
    margin-bottom: var(--ignt-spacing-medium);
    margin-top: var(--ignt-spacing-medium);
  }
</style>
