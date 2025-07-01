<template>
  <div style="display:flex;gap:10px;">
    <sl-format-number
        class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice"
        lang="de"
        type="currency"
        currency="EUR"
        :value="item.price.current * amount"
        :class="{pricetag_current:!retail}"
      >
      </sl-format-number>
    <div style="position: relative;" v-if="retail">
      <sl-format-number
          class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice pricetag_old"
          lang="de"
          type="currency"
          currency="EUR"
          :value="item.price.retail * amount"
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
:is(.pricetag_old):before {
    content: " ";
    border-bottom: 2px solid var(--sl-color-primary-500);
    width: 100%;
    display: block;
    position: absolute;
    top:calc(0.7rem);
}

.pricetag_old{
    font-size: 0.8rem;

}
.pricetag_current{
    margin-left:auto;
}


</style>
<script setup lang="ts">
</script>