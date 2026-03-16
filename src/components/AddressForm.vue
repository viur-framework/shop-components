<template>
    <LoadingHandler :is-loading="addressState[`${state.formtype}IsLoading`]"></LoadingHandler>
    <ViForm
        :ref="(el)=>{addressState[`${state.formtype}Form`]=el; return el}"
        :module="`${shopStore.state.moduleName}/address`"
        :action="state.action"
        :skelkey="state.skelkey"
        :values="{'address_type':state.address_type, 'customer_type':'private'}"
        :useCategories="false"
        :layout="shopStore.state.UserDataLayout"
        @change="formChange"
        :default-language="state.language"
        error-style="decent"
      >
    </ViForm>
    <ShopAlert
      v-if="state.showCountryChangeHint"
      class="country-change-hint"
      variant="warning"
      icon-name="exclamation-triangle"
      :closeable="true"
      duration="Infinity"
      :msg="$t('viur.shop.country_change_vat_hint')"
      @on-hide="state.showCountryChangeHint = false"
    />
</template>

<script setup>
import {computed, onMounted, reactive, watch} from 'vue'
import LoadingHandler from './LoadingHandler.vue';
import ShopAlert from './ShopAlert.vue';
import ViForm from "@viur/vue-utils/forms/ViForm.vue";
import {useViurShopStore} from "../shop";
import {useAddress} from "../composables/address";
import { usePayment } from '../composables/payment';


const shopStore = useViurShopStore();
const {state:addressState} = useAddress();
const {state:paymentState, fetchPaymentData} = usePayment()

const props = defineProps({
  formtype:{
    type:String,
    default:"billing" // formtype: shipping, billing, both
  }
})

const state = reactive({
  formtype:computed(()=>{
    if (['billing','both'].includes(props.formtype)){
      return "billing"
    }
    return 'shipping'
  }),

  action: computed(()=>{
    if (state.formtype ==='shipping' && shopStore.state.cartRoot?.['shipping_address']){
      return 'edit'
    } else if (state.formtype === 'billing' && shopStore.state.order?.['billing_address']){
      return 'edit'
    } else {
      return 'add'
    }
  }),

  skelkey:computed(()=>{
    if (state.formtype === 'shipping' && shopStore.state.cartRoot?.['shipping_address']){
      return shopStore.state.cartRoot['shipping_address']?.['dest']?.['key']
    } else if (state.formtype === 'billing' && shopStore.state.order?.['billing_address']){
      return shopStore.state.order?.['billing_address']?.['dest']?.['key']
    }
    return null

  }),
  address_type:computed(()=>{
    if (props.formtype === 'both'){
      return ["shipping",'billing']
    }
    return [state.formtype]
  }),
  language: "de",
  initialCountry: null,
  showCountryChangeHint: false
})

function formChange(data){
  if (data.name === "country"){
    state.showCountryChangeHint = data.value !== state.initialCountry
    state.language = data.value
    if (state.formtype === 'billing'){
      fetchPaymentData()
    }
  }
}

onMounted(()=>{
  // Set form language based on locale (use locale if not de-DE, otherwise use store language)
  if (shopStore.state.locale!=="de-DE"){
    state.language = shopStore.state.locale.split("-")[1].toLowerCase() // use country
  }else{
    state.language = shopStore.state.language
  }
  state.initialCountry = state.language
})


watch(()=>addressState.billingIsShipping, (newVal,oldVal)=>{
  if(oldVal && !newVal){
    if(shopStore.state.cartRoot?.['shipping_address']){
      shopStore.state.cartRoot['shipping_address'] = null
    }
    addressState[`shippingForm`].state.skel = {'address_type':state.address_type, 'customer_type':'private'}
  }

  addressState[`${state.formtype}Form`].state.skel['address_type'] = state.address_type
})

</script>

<style scoped>
.country-change-hint {
  margin: 1em 0;
}
</style>
