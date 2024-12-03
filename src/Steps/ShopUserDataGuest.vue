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

    <slot
        nextName="weiter"
        :activefunction="()=>true"
        :nextfunction="nextStep"
    >
    </slot>

</template>



<script setup>
import {reactive, onBeforeMount} from 'vue'
import AddressForm from '../components/AddressForm.vue'
import {useAddress} from "../composables/address";

const {state:addressState,saveAddresses} = useAddress()

const state = reactive({
    billingIsShipping:true
})

function nextStep(){
  return saveAddresses(state.billingIsShipping)
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