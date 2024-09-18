<template>
  <div class="viur-shop-cart-sidebar-info-line" v-if="state.isShipping">

    <span>Versandkosten:</span>
    <sl-format-number type="currency" currency="EUR" :value="state.cheapestShipping.dest.shipping_cost"
                      lang="de"></sl-format-number>

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

async function updateShipping() {
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

}
function getShippingCost()
{
  if(state.isShipping)
  {
    return  state.cheapestShipping.dest.shipping_cost
  }
  return 0;
}

defineExpose({updateShipping,getShippingCost})

onBeforeMount(async () => {
  await cartStore.init();
  await updateShipping()
});

</script>

<style scoped>
.viur-shop-cart-sidebar-info-line {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: var(--sl-spacing-2x-small) 0;



  span {
    margin-right: auto;
  }
}
</style>
