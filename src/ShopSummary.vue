<template>
  <h2 class="viur-shop-cart-sidebar-headline headline">Zusammenfassung</h2>

  <div class="viur-shop-cart-sidebar-summary">
    <template v-for="i in 10">
      <div class="viur-shop-cart-sidebar-summary-item">
        <div class="viur-shop-cart-sidebar-summary-item-amount">1x</div>
        <div class="viur-shop-cart-sidebar-summary-item-name">Item Name auch noch etwas länger zum testen</div>
        <div class="viur-shop-cart-sidebar-summary-item-price">1.333,00€</div>
      </div>

      <div class="viur-shop-cart-sidebar-summary-item">
        <div class="viur-shop-cart-sidebar-summary-item-amount">1x</div>
        <div class="viur-shop-cart-sidebar-summary-item-name">Item Name</div>
        <div class="viur-shop-cart-sidebar-summary-item-price">1.333,00€</div>
      </div>
  </template>
  </div>

  <div class="viur-shop-cart-sidebar-info-line">
    <span>Zwischensumme</span>

    <sl-format-number
      lang="de"
      type="currency"
      currency="EUR"
      :value="shopStore.state.order?.total"
    >
    </sl-format-number>
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

.viur-shop-cart-sidebar-summary{
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-bottom: var(--sl-spacing-small);
  padding-right: 4px;
  margin-right: -4px;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--sl-color-neutral-300);
    transition: background ease .3s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--sl-color-neutral-400);
  }
}

.viur-shop-cart-sidebar-summary-item{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: var(--sl-spacing-medium);
  margin-bottom: var(--sl-spacing-small);
}

.viur-shop-cart-sidebar-summary-item-name{
  margin-right: auto;
}
</style>
