,
<template>
  <div class="viur-shop-sidebar">
    <h2 class="viur-shop-cart-sidebar-headline headline">Zusammenfassung</h2>
    <br />
    <div class="viur-shop-cart-sidebar-info-line">
      <span>Zwischensumme</span>
      999.99 €
    </div>
    <div class="viur-shop-cart-sidebar-info-line">
      <span>Rabatt</span>
      {{
        cartStore.state.basketRootNode.total -
        cartStore.state.basketRootNode.total_discount_price
      }}
      €
    </div>
    <div class="viur-shop-cart-sidebar-info-line">
      <span>Versandkosten</span>
      0 €
    </div>
    <div class="viur-shop-cart-sidebar-info-line total">
      <span>Gesamt:</span>
      <!--{{ cartStore.state.basketRootNode }}-->
      €
    </div>
    <div class="viur-shop-cart-sidebar-btn-wrap">

      <!-- TODO: Placement of discount? -->
      <div class="viur-shop-discount-wrap">
        <Discount></Discount>
      </div>

      <sl-button variant="primary" size="medium"> Jetzt Bestellen</sl-button>
      <sl-button size="medium" variant="info">
        <sl-icon name="paypal" slot="prefix"></sl-icon>
        Paypal
      </sl-button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useCartStore } from "../../stores/cart.js";
import Discount from "../cart/Discount.vue";

const cartStore = useCartStore();

onBeforeMount(() => {
  cartStore.init();
});
</script>

<style>
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

.viur-shop-sidebar {
  display: flex;
  flex-direction: column;
  background-color: var(--shop-sidebar-background);
  padding: var(--sl-spacing-medium);
  overflow: hidden;
  border-radius: var(--sl-border-radius-medium);

  @media (min-width: 1024px) {
    position: sticky;
    top: 0;
    margin-left: var(--sl-spacing-2x-large);
  }
}
</style>
