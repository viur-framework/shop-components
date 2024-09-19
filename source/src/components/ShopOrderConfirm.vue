<template>
  <Loader v-if="!state.cartIsInit"></Loader>

  <template v-else>
    <div class="list">
      <h2 class="viur-shop-cart-headline headline">Bestellung prüfen</h2>
      <div class="viur-shop-cart-address-wrap">
        <div class="viur-shop-cart-address">
          <div class="viur-shop-cart-address-headline">
            Versandadresse
            <sl-button outline size="small" @click="editShippingAddress(tabName)">
              <sl-icon
                name="pencil"
                slot="prefix"

              ></sl-icon>
            </sl-button>
          </div>
          {{ cartStore.state.shippingAddress.firstname }}
          {{ cartStore.state.shippingAddress.lastname }}<br />
          {{ cartStore.state.shippingAddress.street_name }}
          {{ cartStore.state.shippingAddress.street_number }}<br />
          {{ cartStore.state.shippingAddress.zip_code }}
          {{ cartStore.state.shippingAddress.city }}
          {{ cartStore.state.shippingAddress.country }}<br />

          <br />
          ##TODO MAIL<br />
          ##TODO Phone
        </div>
        <div class="viur-shop-cart-address">
          <div class="viur-shop-cart-address-headline">
            Rechnungsadresse
            <sl-button outline size="small">
              <sl-icon name="pencil" slot="prefix"></sl-icon>
            </sl-button>
          </div>
          {{ cartStore.state.billingAddress.firstname }}
          {{ cartStore.state.billingAddress.lastname }}<br />
          {{ cartStore.state.billingAddress.street_name }}
          {{ cartStore.state.billingAddress.street_number }}<br />
          {{ cartStore.state.billingAddress.zip_code }}
          {{ cartStore.state.billingAddress.city }}
          {{ cartStore.state.billingAddress.country }}<br />
          <br />
          ##TODO MAIL<br />
          ##TODO Phone
        </div>
      </div>

      <div class="viur-shop-cart-payment">
        <div class="viur-shop-cart-payment-method">
          <span>Zahlungsmethode:</span>
          {{ state.selectedPaymentProvider }}
        </div>
        <sl-button outline size="small">
          <sl-icon name="pencil" slot="prefix"></sl-icon>
        </sl-button>
      </div>

      <h2 class="viur-shop-cart-headline headline">Warenkorb</h2>
      <!-- <sl-card
      horizontal
      class="viur-shop-cart-mini-card"
      v-for="item in cartStore.state.carts[cartStore.state.basket].items"
    >
      <img
        class="viur-shop-cart-mini-card-img"
        slot="image"
        :src="getImage(item.article.dest.key)"
      />

      <div class="viur-shop-cart-mini-cart-header" slot="header">
        <h4 class="viur-shop-cart-mini-headline headline">{{ item.article.dest.shop_name }} | 425018</h4>
      </div>
      <div class="viur-shop-cart-mini-card-body-row">
        <div class="viur-shop-cart-mini-card-body-info">
          <div class="viur-shop-cart-mini-card-info-wrap">
            <div class="viur-shop-cart-mini-card-info">
              <span>Anzahl: </span>
              1
            </div>
            <div class="viur-shop-cart-mini-card-info">
              <span>Preis: </span>
              {{ item.article.dest.shop_price_recommended }} €
            </div>
          </div>
        </div>
      </div>
    </sl-card> -->
    </div>
  </template>
</template>

<script setup>
import { reactive, onBeforeMount, computed } from "vue";
import Loader from "@viur/vue-utils/generic/Loader.vue";
import { useCartStore } from "../stores/cart.js";
import { Request } from "@viur/vue-utils";

const emit = defineEmits(["editAddress"]);

const props = defineProps({
  tabName: { type: String, required: true },
});

const cartStore = useCartStore();

// const searchWarning = ref()
const state = reactive({
  cartIsInit: computed(() => {
    return true;
  }),
  itemsIsInit: computed(() => {
    return !!cartStore.state?.carts[cartStore.state.basket].items;
  }),
  selectedPaymentProvider: computed(() => {
    /* fixme  this compute generates an error
      Uncaught (in promise) TypeError: Cannot set properties of null (setting '__vnode')
      but the value is correct.
     */
    return cartStore.state?.selectedPaymentProvider.title;
  }),
  images: {},
  showOrderButton: false,
});

function editShippingAddress(e) {
  console.log("runde1", e)
  emit("editAddress", e);
}

function onTosAccept(e) {
  if (e.target.checked) state.showOrderButton = true;
  if (!e.target.checked) state.showOrderButton = false;
}

onBeforeMount(async () => {
  await cartStore.init();
});
</script>

<style scoped>
.viur-shop-cart-sidebar-btn-wrap {
  display: flex;
  flex-direction: column;
  margin-top: var(--sl-spacing-large);

  sl-button {
    margin-bottom: var(--sl-spacing-x-small);
  }
}

sl-alert {
  margin-top: var(--sl-spacing-medium);
  margin-bottom: var(--sl-spacing-medium);
}

sl-tooltip {
  &::part(body) {
    line-height: 1.2;
    font-weight: 400;
    padding: 10px;
  }
}

sl-menu-item {
  &::part(base) {
    padding: 0.2em 0.9em 0.2em 0.8em;
  }

  &::part(checked-icon) {
    display: none;
  }

  &::part(prefix) {
    margin-right: 10px;
  }

  &::part(suffix) {
    margin-right: -1.5em;
  }
}

.viur-shop-cart-sidebar-info-line {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: var(--sl-spacing-2x-small) 0;

  span {
    margin-right: auto;
  }

  &.total {
    font-weight: 600;
    border-top: 1px solid var(--sl-color-neutral-300);
    border-bottom: 1px solid var(--sl-color-neutral-300);
    padding: var(--sl-spacing-x-small) 0;
    margin: var(--sl-spacing-small) 0;
  }
}

.viur-shop-cart-mini-card {
  margin-bottom: var(--sl-spacing-x-large);

  &::part(header) {
    border-bottom: none;
    padding-top: 0;
    padding-right: 0;
  }

  &::part(image) {
    flex-basis: 25%;
    max-width: 90px;
  }

  &::part(body) {
    display: flex;
    flex: 1;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
  }

  &::part(group) {
    padding: var(--sl-spacing-small) 0;
  }
}

.viur-shop-cart-mini-card-body-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: var(--sl-spacing-large);
  flex: 1;
}

.viur-shop-cart-mini-card-body-info {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.viur-shop-cart-mini-card-info-wrap {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--sl-spacing-medium);
}

.viur-shop-cart-mini-card-info {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  span {
    margin-right: var(--sl-spacing-x-small);
    font-weight: 600;
  }
}

.viur-shop-cart-address-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sl-spacing-x-large);
  margin-bottom: var(--sl-spacing-x-large);
}

.viur-shop-cart-address-headline {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

.viur-shop-cart-payment {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sl-spacing-x-large);

  span {
    font-weight: 600;
  }
}

.viur-shop-cart-headline {
  margin: 0 0 var(--sl-spacing-x-large) 0;
  font-size: var(--shop-form-headline-size);
}
</style>
