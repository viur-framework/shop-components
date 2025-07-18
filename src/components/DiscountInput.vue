<template>
  {{ state.alert.msg }}
  <shop-alert
    v-if="state.alert.show"
    :variant="state.alert.variant"
    @onHide="state.alert = {}"
    duration="infinity"
  >
    <template #alertMsg>
      {{ state.alert.msg }}
    </template>
  </shop-alert>

  <template v-if="shopStore.state.cartRoot.discount">
    <div class="viur-shop-discount-view">
      <span>Code: {{ shopStore.state.cartRoot.discount.dest.name }}</span>
      <sl-button
        size="small"
        outline
        variant="danger"
        @click="removeDiscountAction"
        :loading="state.loading"
      >
        <sl-icon
          name="x-lg"
          slot="prefix"
        ></sl-icon>
      </sl-button>
    </div>
  </template>
  <sl-button-group v-else>
    <sl-input
      class="viur-shop-discount-input"
      :placeholder="$t('viur.shop.add_discount_placeholder')"
      v-model="state.code"
      @keypress.enter="addDiscountAction()"
    >
    </sl-input>
    <sl-button
      @click="addDiscountAction()"
      :loading="state.loading"
      >{{ $t("viur.shop.add_discount") }}</sl-button
    >
  </sl-button-group>
</template>

<script setup>
import { reactive } from "vue"
import { useViurShopStore } from "../shop"
import { useCart } from "../composables/cart"
const shopStore = useViurShopStore()
const { addDiscount, removeDiscount } = useCart()

import ShopAlert from "./ShopAlert.vue"

const state = reactive({
  code: "",
  alert: {},
  loading: false
})

function addDiscountAction() {
  state.loading = true
  addDiscount(state.code)
    .then(async (resp) => {
      state.loading = false
    })
    .catch((error) => {
      state.loading = false
      console.log("error bei rabatt", error)
      state.alert.msg = "not found"
      state.alert.show = true
      state.alert.variant = "danger"
    })
}

function removeDiscountAction() {
  state.loading = true
  removeDiscount()
    .then(async (resp) => {
      state.loading = false
      state.alert.msg = "Discount removed"
      state.alert.show = true
      state.alert.variant = "success"
    })
    .catch((error) => {
      state.loading = false
      console.log("error bei rabatt", error)
      state.alert.msg = "not found"
      state.alert.show = true
      state.alert.variant = "danger"
    })
}
</script>
<style scoped>
.viur-shop-discount-view {
  font-size: 0.8em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.viur-shop-discount-input {
  flex-basis: 100%;
}
</style>
