<template>
  <div v-if="state.isShipping">
    Versandkosten: <sl-format-number type="currency" currency="EUR" :value="state.cheapestShipping.dest.shipping_cost" lang="de"></sl-format-number>
  </div>
</template>
<script setup>
import {useCartStore} from "../../../stores/cart";
import {computed, onBeforeMount, reactive} from "vue";

const cartStore = useCartStore();

const state = reactive({
  shippingData: [],
  cheapestShipping: {},
  isShipping: false,
})

async function getShipping() {
  state.shippingData = await cartStore.getShippingData();
  state.shippingData.sort((a, b) => {
    if (a["dest"]["shipping_cost"] < a["dest"]["shipping_cost"]) {
      return -1;
    }
    if (a["dest"]["shipping_cost"] > a["dest"]["shipping_cost"]) {
      return 1;
    }
    return 0;
  })
  //last element is cheapest shipping after sorting
  state.cheapestShipping = state.shippingData[state.shippingData.length - 1];
  state.isShipping = true;
  console.log("cheapestShipping",state.cheapestShipping)
}

defineExpose({getShipping})

onBeforeMount(async () => {
  await cartStore.init();
  await getShipping()
});

</script>

<style scoped>

</style>
