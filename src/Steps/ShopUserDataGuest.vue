<template>
  <slot
    name="top_actions"
    v-if="shopStore.state.topActions"
    :nextName="$t('viur.shop.next')"
    :activefunction="() => true"
    :nextfunction="nextStep"
  >
  </slot>

  <div class="viur-shop-user-data-headline">
    {{ $t("skeleton.address.address_type.billing") }}
  </div>
  <address-form :formtype="addressState.billingIsShipping ? 'both' : 'billing'"> </address-form>

  <sl-switch
    class="viur-shop-user-data-switch"
    :checked="addressState.billingIsShipping"
    @sl-change="switchAddresses"
  >
    {{ $t("viur.shop.use_shipping_as_billing_address") }}
  </sl-switch>

  <div v-show="!addressState.billingIsShipping">
    <div class="viur-shop-user-data-headline">
      {{ $t("skeleton.address.address_type.shipping") }}
    </div>
    <address-form formtype="shipping"> </address-form>
  </div>

  <component
    :is="params['additionalComponent']"
    v-if="params['additionalComponent']"
    ref="additionalComponent"
  >
  </component>

  <slot name="template_userdata"> </slot>

  <slot
    :nextName="$t('viur.shop.next')"
    :activefunction="() => true"
    :nextfunction="nextStep"
    :hint="$t('messages.order_check_later')"
  >
  </slot>
</template>

<script setup>
import { reactive, onBeforeMount, watch, useTemplateRef } from "vue"
import AddressForm from "../components/AddressForm.vue"
import { useAddress } from "../composables/address"
import { useViurShopStore } from "../shop"
const shopStore = useViurShopStore()
const { state: addressState, saveAddresses } = useAddress()
const additionalComponent = useTemplateRef("additionalComponent")
const props = defineProps({
  params: {
    type: Object,
    default: {}
  }
})

const state = reactive({})

function switchAddresses(event) {
  addressState.billingIsShipping = event.target.checked
}

onBeforeMount(() => {
  if (!shopStore.state.order?.["billing_address"]?.["dest"]) {
    addressState.billingIsShipping = true //init
  } else if (shopStore.state.order?.["billing_address"]?.["dest"]?.["address_type"]?.includes("shipping")) {
    addressState.billingIsShipping = true
  } else {
    addressState.billingIsShipping = false
  }
})

async function nextStep() {
  // form is only valid if the action field ends with Success
  try {
    if (props.params?.additionalComponent) {
      let valid = await additionalComponent.value.valid()
      if (!valid) {
        return false
      }
    }

    let result = await saveAddresses(addressState.billingIsShipping)
    if (result?.["action"] && result["action"].endsWith("Success")) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}
</script>

<style scoped>
.viur-shop-user-data-headline {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: var(--sl-spacing-medium);
}
</style>
