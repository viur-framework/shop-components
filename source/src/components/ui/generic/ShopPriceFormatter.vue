<template>
  <!-- TODO: at a very later point -->
  <div class="price-wrap">
    <sl-format-number
      class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice"
      lang="de"
      type="currency"
      currency="EUR"
      :value="price.retail"
    >
    </sl-format-number>
    <sl-format-number
      class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice"
      lang="de"
      type="currency"
      currency="EUR"
      :value="price.recommended"
    >
    </sl-format-number>
  </div>
</template>

<script setup>
const props = defineProps({
  price: {
    type: Object,
    required: true,
  },
});

function priceGetter() {

}
</script>

<style scoped>
.price-wrap {
  display: flex;
  flex-direction: column;
}
</style>
