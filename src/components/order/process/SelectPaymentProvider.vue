<template>

  <div v-for="(providerData,providerName,i) in cartStore.state.paymentProviders">
    <sl-card selectable :id="'povider__'+providerName" @sl-change="providerChanged" :selected="i===0">
      <img
        slot="image"
        src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
        alt="A kitten sits patiently between a terracotta pot and decorative grasses."
      />
      <div slot="footer">
        {{ providerData?.title }}
        <br>
        {{ providerData?.descr }}
      </div>
    </sl-card>
  </div>

</template>

<script setup>
//todo styling
// set image

import {onBeforeMount, reactive} from "vue";
import {useCartStore} from "../../../stores/cart";

const cartStore = useCartStore();

function providerChanged(e) {
  if (e.target.selected) {
    console.log( "a",cartStore.state.selectedPaymentProvider)
    console.log( "b",cartStore.state.paymentProviders)


    cartStore.state.selectedPaymentProviderName = e.target.id.replace("povider__", "")
    cartStore.state.selectedPaymentProvider = cartStore.state.paymentProviders[e.target.id.replace("povider__", "")]
    console.log(cartStore.state.selectedPaymentProvider)
    document.querySelectorAll("sl-card").forEach((card) => {

      if (card !== e.target) {
        card.selected = false;
      }
    })

  } else {//can't deselect now
    e.target.selected = true;

  }
  console.log("provider changed", e)
}

onBeforeMount(async () => {
  await cartStore.getPaymentProviders();
})
</script>

<style scoped>
/*todo select styling for sl-card*/
sl-card[selected]::part(base) {
  border: 5px solid #39b200;
}
</style>
