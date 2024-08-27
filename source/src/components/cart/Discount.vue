<template>
  <div class="viur-shop-discount">
    <sl-input
      label="Rabatt Code"
      ref="codeInput"
      class="viur-shop-discount-input"
    ></sl-input>
    <sl-button @click="addDiscountCode" class="viur-shop-discount-submit-btn"
      >Einlösen</sl-button
    >
  </div>
  <div class="viur-shop-discount-alert">
    <sl-alert ref="errorMessageContainer" closable duration="2000">
      <sl-icon slot="icon" name="info-circle"></sl-icon>
      {{ state.errorMessage }}
    </sl-alert>
  </div>
  <div>
    <div v-if="cartStore.state.basketRootNode.discount">
      <!--Todo bessere texte ??-->
      <span
        v-if="
          cartStore.state.basketRootNode.discount.dest.discount_type ===
          'absolute'
        "
      >
        Sie haben einen Rabattcode im Wert von
        {{ cartStore.state.basketRootNode.discount.dest.absolute }} € eingegeben
      </span>
      <span
        v-if="
          cartStore.state.basketRootNode.discount.dest.discount_type ===
          'percentage'
        "
      >
        Sie haben einen Rabattcode im Wert von
        {{ cartStore.state.basketRootNode.discount.dest.percentage }} %
        eingegeben
      </span>
    </div>
  </div>
</template>
<script setup>
import { useCartStore } from "../../stores/cart";
import { computed, reactive, ref } from "vue";

const cartStore = useCartStore();
const codeInput = ref(null);
const errorMessageContainer = ref(null);
const state = reactive({
  errorMessage: "",
});

async function addDiscountCode() {
  errorMessageContainer.value.hide();
  const discountCode = codeInput.value.value;
  if (!discountCode) {
    errorMessageContainer.value.show();
    state.errorMessage = "Es wurde kein Rabattcode eingegeben";
    return;
  }
  let resp = await cartStore.addDiscount(discountCode)
  console.log("resp", resp)
}
</script>

<style>
.viur-shop-discount {
  display: flex;
  align-items: flex-end;
  padding: 0.25rem;
  justify-content: space-between;
  gap: 0.5rem;
}

.viur-shop-discount-alert {
  margin: 0.5rem 0;
}
.viur-shop-discount-input {
  flex-grow: 1;
}
.viur-shop-discount-submit-btn {
  margin: 0;
}
</style>
