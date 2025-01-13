<template>
    <div class="viur-shop-cart-address-headline">
        {{ $t("skeleton.address.address_type.shipping") }}
    </div>

    <address-form :formtype="addressState.billingIsShipping?'both':'shipping'">
    </address-form>
    <div>
      <sl-switch :checked="addressState.billingIsShipping" @sl-change="switchAddresses">{{  $t('shop.use_shipping_as_billing_address') }}</sl-switch>
    </div>

    <div v-show="!addressState.billingIsShipping">
      <div class="viur-shop-cart-address-headline">
        {{ $t("skeleton.address.address_type.billing") }}
      </div>
      <address-form formtype="billing" ></address-form>
    </div>

    <slot name="template_userdata">
    </slot>
    
    <slot
        nextName="weiter"
        :activefunction="()=>true"
        :nextfunction="nextStep"
    >
    </slot>
</template>



<script setup>
import {reactive, onBeforeMount, watch} from 'vue'
import AddressForm from '../components/AddressForm.vue'
import {useAddress} from "../composables/address";
import {useViurShopStore} from "../shop";
const shopStore = useViurShopStore();
const {state:addressState,saveAddresses} = useAddress()

const state = reactive({
})

function switchAddresses(event){
  addressState.billingIsShipping=event.target.checked
}

onBeforeMount(()=>{
  if (shopStore.state.cartRoot?.['shipping_address']?.['dest']?.['address_type']?.includes('billing') || !shopStore.state.cartRoot?.['shipping_address']?.['dest']){
    addressState.billingIsShipping = true
  }else{
    addressState.billingIsShipping = false
  }
})


async function nextStep(){
  // form is only valid if the action field ends with Success
  try{
    let result = await saveAddresses(addressState.billingIsShipping)
    if (result['action'] && result['action'].endsWith('Success')){
      return true
    }
    return false
  } catch(error){
    return false
  }
}

</script>

<style scoped>
.viur-shop-cart-address-headline {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: var(--sl-spacing-medium);
}
</style>