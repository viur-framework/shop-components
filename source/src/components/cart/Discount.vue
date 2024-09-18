<template>
  <div>
    <span>Haben Sie noch ein Gutschein?</span><br>
    <span v-if="cartStore.state.basketRootNode.discount">Es befindet sich noch kein Gutschein im Warenkorb.</span>
    <sl-input label="Rabatt Code" ref="codeInput"></sl-input>
    <sl-button @click="addDiscountCode">Einlösen</sl-button>
    <sl-alert ref="errorMessageContainer">
      <sl-icon slot="icon" name="info-circle"></sl-icon>
      {{ state.errorMessage }}
    </sl-alert>
  </div>
  <div>
    <div v-if="cartStore.state.basketRootNode.discount">
      <!--Todo bessere texte ??-->
      <span v-if="cartStore.state.basketRootNode.discount.dest.discount_type==='absolute'">
        Sie haben einen Rabattcode im Wert von {{cartStore.state.basketRootNode.discount.dest.absolute}} € eingegeben
      </span>
       <span v-if="cartStore.state.basketRootNode.discount.dest.discount_type==='percentage'">
        Sie haben einen Rabattcode im Wert von {{cartStore.state.basketRootNode.discount.dest.percentage}} % eingegeben
      </span>
    </div>
  </div>
</template>
<script setup>
import {useCartStore} from "../../stores/cart";
import {computed, reactive, ref} from "vue";

const cartStore = useCartStore();
const codeInput = ref(null);
const errorMessageContainer = ref(null);
const state = reactive({
  errorMessage: ""
});

function addDiscountCode() {
  errorMessageContainer.value.hide();
  const discountCode = codeInput.value.value;
  if (!discountCode) {
    errorMessageContainer.value.show();
    state.errorMessage = "Es wurde kein Rabattcode eingegeben";
    return
  }
  cartStore.addDiscount(discountCode);
}
</script>


<style scoped>

</style>
