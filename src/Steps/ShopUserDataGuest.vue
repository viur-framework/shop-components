<template>
    <div class="viur-shop-cart-address-headline">
        {{ $t("skeleton.address.address_type.shipping") }}
    </div>

    <div>
      <sl-switch checked @sl-change="state.billingIsShipping=$event.target.checked">Verwende Lieferadresse als Rechnungsadresse</sl-switch>
    </div>

    <div v-show="!state.billingIsShipping">
      <div class="viur-shop-cart-address-headline">
        {{ $t("skeleton.address.address_type.billing") }}
      </div>

    </div>
</template>



<script setup>
import {reactive} from 'vue'
import { useStepper } from '../composables/stepper'

const tab = 'userdata' //marks component for a step
const stepper = useStepper(tab,()=>{}, ()=>{})

const state = reactive({
    billingIsShipping:true
})


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