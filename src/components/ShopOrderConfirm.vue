<template>
  <div class="list">
    <h2 class="viur-shop-cart-headline headline">Bestellung prüfen</h2>
    <div class="viur-shop-cart-address-wrap">
      <div class="viur-shop-cart-address">
        <div class="viur-shop-cart-address-headline">
          Versandadresse
          <!-- <sl-button
              outline
              size="small"
              @click="editShippingAddress(tabName)"
            >
              <sl-icon name="pencil" slot="prefix"></sl-icon>
            </sl-button> -->
        </div>
        {{ addressStore.state.active.shipping.firstname }}
        {{ addressStore.state.active.shipping.lastname }}<br />
        {{ addressStore.state.active.shipping.street_name }}
        {{ addressStore.state.active.shipping.street_number }}<br />
        {{ addressStore.state.active.shipping.zip_code }}
        {{ addressStore.state.active.shipping.city }}<br />
        {{ getCountryName(addressStore.state.active.shipping.country) }}<br />
      </div>
      <div class="viur-shop-cart-address">
        <div class="viur-shop-cart-address-headline">
          Rechnungsadresse
          <sl-button outline size="small">
            <sl-icon name="pencil" slot="prefix"></sl-icon>
          </sl-button>
        </div>
        {{ addressStore.state.active.billing.firstname }}
        {{ addressStore.state.active.billing.lastname }}<br />
        {{ addressStore.state.active.billing.street_name }}
        {{ addressStore.state.active.billing.street_number }}<br />
        {{ addressStore.state.active.billing.zip_code }}
        {{ addressStore.state.active.billing.city }}<br />
        {{ getCountryName(addressStore.state.active.billing.country) }}<br />
      </div>
    </div>

    <div class="viur-shop-cart-payment">
      <div class="viur-shop-cart-payment-method">
        <span>Zahlungsmethode:</span>
        <img
          :src="state.selectedPaymentProvider[1].image_path"
          style="width: 100px"
        />
      </div>
      <sl-button outline size="small">
        <sl-icon name="pencil" slot="prefix"></sl-icon>
      </sl-button>
    </div>

    <div class="viur-shop-cart-payment">
      <div class="viur-shop-cart-payment-method">
        <span>Versandart:</span>
        <pre> {{ shippingStore.state.selectedShippingMethod.dest.name }} </pre>
        <pre
          >{{
            shippingStore.state.selectedShippingMethod.dest.shipping_cost
          }} </pre
        >
      </div>
      <sl-button outline size="small">
        <sl-icon name="pencil" slot="prefix"></sl-icon>
      </sl-button>
    </div>

    <h2 class="viur-shop-cart-headline headline">Warenkorb</h2>

    <sl-spinner v-if="state.loading"></sl-spinner>
    <CartList :list="state.data" :limit="5" v-else></CartList>
    <sl-button size="small" @click=""> Zahlungspflichtig bestellen </sl-button>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, reactive } from "vue";
import CartList from "./ui/generic/CartList.vue";
import { usePaymentStore } from "../stores/payment.js";
import { useAddressStore } from "../stores/address.js";
import { useOrderStore } from "../stores/order.js";
import { useCartStore } from "../stores/cart.js";
import { useShippingStore } from "../stores/shipping.js";

const emit = defineEmits(["editAddress"]);

const props = defineProps({});

const cartStore = useCartStore();
const paymentStore = usePaymentStore();
const addressStore = useAddressStore();
const orderStore = useOrderStore();
const shippingStore = useShippingStore();

// const searchWarning = ref()
const state = reactive({
  loading: true,
  selectedPaymentProvider: computed(() => {
    /* fixme  this compute generates an error
      Uncaught (in promise) TypeError: Cannot set properties of null (setting '__vnode')
      but the value is correct.
     */
    return paymentStore.state.paymentSelection;
  }),
  images: {},
  showOrderButton: false,
  data: [],
});

function editShippingAddress(e) {
  emit("editAddress", e);
}

function getCountryName(val) {
  if (!addressStore.state.structure || !val) {
    return val;
  }
  for (const country of addressStore.state.structure.country.values) {
    if (val === country[0]) {
      return country[1];
    }
  }
  return val;
}

async function getOrderCart(
  parentKey = orderStore.state.currentOrder.cart.dest.key,
) {
  state.loading = true;
  const children = await cartStore.getChildren(parentKey);

  children.forEach(async (child) => {
    if (child.skel_type === "node") {
      if (!Object.keys(cartStore.state.childrenByNode.includes(parentKey))) {
        cartStore.state.childrenByNode[parentKey] = [];
      }
      cartStore.state.childrenByNode[parentKey].push(child);
      state.data.push(child);
      await getChildren(child.key);
    } else {
      state.data.push(child);
    }
  });
  state.loading = false;
}

onBeforeMount(async () => {
  await getOrderCart();
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
