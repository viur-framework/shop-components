<template>
  <div v-for="(providerTitle,providerName) in cartStore.state.paymentProviders">
    <sl-card>
      {{ providerName }}
      {{ providerTitle }}
    </sl-card>
  </div>
</template>

<script setup>
import {onBeforeMount} from "vue";
import {useCartStore} from "../../../stores/cart";

const cartStore = useCartStore();
onBeforeMount(async () => {
  await cartStore.payment_providers_list();
  console.log(cartStore.state.paymentProviders)
})
</script>

<style scoped>

</style>
