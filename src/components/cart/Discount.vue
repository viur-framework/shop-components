<template>
  <div>

    <span>{{ $t("viur.shop.discount.headline") }}</span><br>
    <span v-if="!cartStore.state.basketRootNode.discount">Es befindet sich noch kein Gutschein im Warenkorb.</span>
    <sl-button-group>
      <sl-input :placeholder="$t('viur.shop.discount.placeholder')" ref="codeInput">
      </sl-input>
      <sl-button @click="addDiscountCode">{{ $t("viur.shop.discount.button") }}</sl-button>
    </sl-button-group>
    <sl-alert ref="errorMessageContainer">
      <sl-icon slot="icon" name="info-circle"></sl-icon>
      {{ state.errorMessage }}
    </sl-alert>
  </div>
  <div>
    <div v-if="cartStore.state.basketRootNode.discount">
      <!--Todo bessere texte und translations??-->
      <div v-if="cartStore.state.basketRootNode.discount.dest.discount_type==='absolute'">
      <span>
        Sie haben einen Rabattcode im Wert von {{ cartStore.state.basketRootNode.discount.dest.absolute }} € eingegeben
      </span>
        <sl-icon-button name="x-lg" label="Löschen" @click="removeDiscountCode"></sl-icon-button>
      </div>
      <div v-if="cartStore.state.basketRootNode.discount.dest.discount_type==='percentage'">
      <span>
        Sie haben einen Rabattcode im Wert von {{ cartStore.state.basketRootNode.discount.dest.percentage }} % eingegeben
      </span>
        <sl-icon-button name="x-lg" label="Löschen" @click="removeDiscountCode"></sl-icon-button>
      </div>

    </div>
  </div>
  <sl-spinner v-show="state.isFetching"></sl-spinner>

</template>
<script setup>
import {useCartStore} from "../../stores/cart";
import {computed, reactive, ref} from "vue";

const cartStore = useCartStore();
const codeInput = ref(null);
const errorMessageContainer = ref(null);
const state = reactive({
  errorMessage: "",
  isFetching: false,
});

async function addDiscountCode() {
  errorMessageContainer.value.hide();
  const discountCode = codeInput.value.value;
  if (!discountCode) {
    errorMessageContainer.value.show();
    state.errorMessage = "Es wurde kein Rabattcode eingegeben";
    return
  }
  state.isFetching = true;
  console.log("festch", state.isFetching)
  cartStore.addDiscount(discountCode).then((res) => {
    cartStore.init();//TODO muss man alles neuladen ??
    state.isFetching = false;

  }).catch((e) => {
    console.error("Cant add key");
    state.isFetching = false;
  })

}

async function removeDiscountCode() {

  errorMessageContainer.value.hide();
  state.isFetching = true;
  console.log("code ", cartStore.state.basketRootNode.discount.dest.key)
  cartStore.removeDiscount(cartStore.state.basketRootNode.discount.dest.key).then((res) => {
    cartStore.init();//TODO muss man alles neuladen ??
    state.isFetching = false;

  }).catch((e) => {
    console.error("Cant remove key");
    state.isFetching = false;
  })

}
</script>


<style scoped>

</style>
