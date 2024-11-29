<template>
    <div class="viur-shop-cart-address-headline">
        {{ $t("skeleton.address.address_type.shipping") }}
    </div>

    <address-form :formtype="state.billingIsShipping?'both':'shipping'">
    </address-form>

    <div>
      <sl-switch checked @sl-change="state.billingIsShipping=$event.target.checked">Verwende Lieferadresse als Rechnungsadresse</sl-switch>
    </div>

    <div v-show="!state.billingIsShipping">
      <div class="viur-shop-cart-address-headline">
        {{ $t("skeleton.address.address_type.billing") }}
      </div>
      <address-form formtype="billing"></address-form>
    </div>


    <sl-bar>
      <div slot="right">

        <sl-button @click="nextStep">Weiter</sl-button>
      </div>


    </sl-bar>

</template>



<script setup>
import {reactive} from 'vue'
import { useStepper } from '../composables/stepper'

import AddressForm from '../components/AddressForm.vue'
import {useAddress} from "../composables/address";


const tab = 'userdata' //marks component for a step
const stepper = useStepper(tab,()=>{}, ()=>{})

const {state:addressState,saveAddresses} = useAddress()


const state = reactive({
    billingIsShipping:true
})

function nextStep(){
  saveAddresses(state.billingIsShipping)
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