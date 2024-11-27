<template>
    {{ orderStore.state.currentOrder['billing_address'] }}
    {{ cartStore.state.basket }}
    {{ cartStore.state.currentOrder }}
    <div class="viur-shop-cart-address-headline">
      {{ $t("skeleton.address.address_type.shipping") }}
    </div>
    <loading-handler :isLoading="state.shippingFormLoading || state.billingFormLoading"
                  :isUpdating="state.shippingSending || state.billingSending"
                  :hasError="state.hasError"
                  :errorMessage="state.errorMessage">
    </loading-handler>
    <ViForm
        ref="shippingForm"
        :module="`${cartStore.state.shopModuleName}/address`"
        action="add"
        :useCategories="false"
        :skel="{'address_type':'shipping'}"
        :layout="DefaultLayout"
        @change="updateValues"
      >
    </ViForm>
    <div>
      <sl-switch checked @sl-change="state.billingIsShipping=$event.target.checked">Verwende Lieferadresse als Rechnungsadresse</sl-switch>
    </div>

    <div v-show="!state.billingIsShipping">
      <div class="viur-shop-cart-address-headline">
        {{ $t("skeleton.address.address_type.billing") }}
      </div>

      <ViForm
        ref="billingForm"
        :module="`${cartStore.state.shopModuleName}/address`"
        action="add"
        :values="{'address_type':'billing'}"
        :useCategories="false"
        :layout="DefaultLayout"
        @change="updateValues"
      >
    </ViForm>
    </div>
    
</template>

<script setup>
// Functions
import { ref, reactive, computed, onBeforeMount, watch } from "vue";
import ViForm from "@viur/vue-utils/forms/ViForm.vue";
import DefaultLayout from "./SimpleDefaultLayout.vue";
// Stores
import { useCartStore } from "../../stores/cart";
import { useAddressStore } from "../../stores/address";
import { useOrderStore } from "../../stores/order";

import loadingHandler from "../generic/loadinghandler.vue"


const emit = defineEmits(["valid"]);

const props = defineProps({
});

const cartStore = useCartStore();
const addressStore = useAddressStore();
const orderStore = useOrderStore()

const shippingForm = ref(null)
const billingForm = ref(null)


const state = reactive({
  billingIsShipping:true,

  shippingFormLoading:computed(()=>{
    if (!shippingForm.value){
      return true
    }
    return shippingForm.value.state.loading
  }),

  billingFormLoading:computed(()=>{
    if (!billingForm.value){
      return true
    }
    return billingForm.value.state.loading
  }),


  shippingSending:false,
  billingSending:false,
  shippingSuccess:false,
  billingSuccess:false,
  hasError:false,
  errorMessage:""
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
