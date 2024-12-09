<template>
  <h2 class="viur-shop-cart-sidebar-headline headline">Zusammenfassung</h2>
  <br />
  <div class="viur-shop-cart-sidebar-info-line">
    <span>Zwischensumme</span>

    <sl-format-number
      lang="de"
      type="currency"
      currency="EUR"
      :value="shopStore.state.order?.total"
    >
    </sl-format-number>
    <br />
  </div>

  <div class="viur-shop-cart-sidebar-info-line">
    <span>Versandkosten</span>

    <sl-format-number
      lang="de"
      type="currency"
      currency="EUR"
      :value="shopStore.state.order?.cart?.dest?.shipping?.dest?.shipping_cost"
    >
    </sl-format-number>
    <br />
  </div>
  <div class="viur-shop-cart-shipping-item">
      <span>Lieferzeit </span>
      <template v-if="shopStore.state.order?.cart?.dest?.shipping?.dest?.delivery_time_range === 1">
        {{shopStore.state.order?.cart?.dest?.shipping?.dest?.delivery_time_range}} Tag
      </template>
      <template v-else>
        {{shopStore.state.order?.cart?.dest?.shipping?.dest?.delivery_time_range}} Tage
      </template>
  </div>

  <div class="viur-shop-cart-sidebar-info-line">
    <span>Rabatt</span>

    <sl-format-number
      lang="de"
      type="currency"
      currency="EUR"
      :value="0"
    >
    </sl-format-number>
  </div>
  <div class="viur-shop-cart-sidebar-info-line">

  </div>
  <div class="viur-shop-cart-sidebar-info-line total">
    <span>Gesamt:</span>
    <sl-format-number
      lang="de"
      type="currency"
      currency="EUR"
      :value="state.total"
    >
    </sl-format-number>
  </div>

  <slot name="action-buttons">
    <div class="viur-shop-cart-sidebar-btn-wrap" v-if="!shopStore.state.order?.['is_paid']">
      <sl-button variant="primary" size="medium">Bestellen</sl-button>
    </div>
  </slot>
</template>
<script setup>
import {reactive, computed} from 'vue'
import {useViurShopStore} from "./shop";
const shopStore = useViurShopStore();
console.log(shopStore.state.order)

const state = reactive({
  total:computed(()=>{
    return shopStore.state.order?.total + (shopStore.state.order?.cart?.dest?.shipping?.dest?.shipping_cost?shopStore.state.order?.cart?.dest?.shipping?.dest?.shipping_cost:0)
  })
})


</script>

<style scoped>
.viur-shop-cart-sidebar-info-line {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: var(--sl-spacing-2x-small) 0;

  &.total {
    font-weight: 600;
    border-top: 1px solid var(--sl-color-neutral-300);
    border-bottom: 1px solid var(--sl-color-neutral-300);
    padding: var(--sl-spacing-x-small) 0;
    margin: var(--sl-spacing-small) 0;
  }

  span {
    margin-right: auto;
  }
}

.viur-shop-cart-sidebar-btn-wrap {
  display: flex;
  flex-direction: column;
  margin-top: var(--sl-spacing-large);

  sl-button {
    margin-bottom: var(--sl-spacing-x-small);
  }
}

.viur-shop-cart-sidebar-headline {
  margin: 0 0 var(--sl-spacing-large) 0;
}
</style>