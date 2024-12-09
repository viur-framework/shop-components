<template>
  <sl-radio-group :value="state.selection">
    <sl-details-group>

      <payment-option v-for="option in options" :key="option.id"
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

</template>

<script setup>
import {usePaymentStore} from "../../../stores/payment"
import PaymentOption from "./PaymentOption.vue"
import {computed, reactive, ref} from 'vue'
import {Request} from "@viur/vue-utils";

const paymentStore = usePaymentStore()
const props = defineProps({
  selection: {
    type: String,
    default: null
  },
  options: {
    type: Array,
    default: () => []
  }
})

const state = reactive({
  selection:null,
  hasError:false
})

function optionChanged(type){
  state.selection=type
  paymentStore.state.paymentSelection = state.selection
}


</script>

<style scoped>

</style>
