<template>
  <div style="display:flex;gap:10px;">
    <sl-format-number
        class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice"
        lang="de"
        type="currency"
        currency="EUR"
        :value="item.price.current * amount"
        :class="{'viur-shop-cart-leaf-value--current':!retail}"
      >
      </sl-format-number>
    <div style="position: relative;" v-if="retail && (item.price.recommended > item.price.current)">
      <sl-format-number
          class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice viur-shop-cart-leaf-value--recommended"
          lang="de"
          type="currency"
          currency="EUR"
          :value="item.price.recommended * amount"
        >
        </sl-format-number>
      </div>
  </div>


</template>
<script setup>

const props = defineProps({
  item:{
    type:Object
  },
  amount:{
    type:Number,
    default:1
  },
  retail:{
    type:Boolean,
    default:true
  }
})

</script>

<style scoped>

.viur-shop-cart-leaf-value--recommended {
    font-size: 0.8rem;
    &:before {
      content: " ";
      border-bottom: 2px solid var(--sl-color-primary-500);
      width: 100%;
      display: block;
      position: absolute;
      top:calc(0.7rem);
  }
}

.viur-shop-cart-leaf-value--current {
    margin-left:auto;
}
</style>
