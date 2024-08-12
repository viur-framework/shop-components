<template>
  <Loader v-if="!state.cartIsInit"></Loader>

  <template v-else>
      <div class="list">
        <h2 class="viur-shop-cart-headline headline">Bestellung prüfen</h2>
        <div class="viur-shop-cart-address-wrap">
          <div class="viur-shop-cart-address">
            <div class="viur-shop-cart-address-headline">
              Versandadresse
              <sl-button outline size="small">
                <sl-icon name="pencil" slot="prefix"></sl-icon>
              </sl-button>
            </div>
            Roland Brose<br />
            Speicherstraße 33<br />
            44147 Dortmund, DE<br />
            <br />
            rb@mausbrand.de<br />
            0231 21 34 68 90
          </div>
          <div class="viur-shop-cart-address">
            <div class="viur-shop-cart-address-headline">
              Rechnungsadresse
              <sl-button outline size="small">
                <sl-icon name="pencil" slot="prefix"></sl-icon>
              </sl-button>
            </div>
            Roland Brose<br />
            Speicherstraße 33<br />
            44147 Dortmund, DE<br />
            <br />
            rb@mausbrand.de<br />
            0231 21 34 68 90
          </div>
        </div>

        <div class="viur-shop-cart-payment">
          <div class="viur-shop-cart-payment-method">
            <span>Zahlungsmethode:</span>
            Paypal
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

      <teleport to="#order_sidebar">
        <h2 class="viur-shop-cart-sidebar-headline headline">Jetzt Bestellen</h2>
        <br />
        <!-- <div class="viur-shop-cart-sidebar-info-line">
          <span>Zwischensumme</span>
          {{ cartStore.state?.basket ? cartStore.state.carts[cartStore.state.basket].info.total : "00,00" }} €
        </div>
        <div class="viur-shop-cart-sidebar-info-line">
          <span>Rabatt</span>
          0 €
        </div>
        <div class="viur-shop-cart-sidebar-info-line">
          <span>Versandkosten</span>
          0 €
        </div>
        <div class="viur-shop-cart-sidebar-info-line total">
          <span>Gesamt:</span>
          {{ cartStore.state?.basket ? cartStore.state.carts[cartStore.state.basket].info.total : "00" }} €
        </div> -->

        <sl-checkbox @sl-change="onTosAccept">
          Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen
        </sl-checkbox>

        <div class="viur-shop-cart-sidebar-btn-wrap">
          <sl-button
            :variant="state.showOrderButton ? 'info' : 'disabled'"
            size="small"
            :disabled="!state.showOrderButton"
          >
            Zahlungspflichtig bestellen
          </sl-button>
        </div>
      </teleport>
    </div>
  </template>
</template>

<script setup>
import { reactive, onBeforeMount, computed } from "vue";
import Loader from "@viur/vue-utils/generic/Loader.vue";
import { useCartStore } from "../../stores/cart.js";
import { Request } from "@viur/vue-utils";

const cartStore = useCartStore();

// const searchWarning = ref()
const state = reactive({
  cartIsInit: computed(() => {
    return true
  }),
  itemsIsInit: computed(() => {
    return cartStore.state?.carts[cartStore.state.basket].items ? true : false;
  }),
  images: {},
  showOrderButton: false,
});

function getImage(item) {
  Request.get(`/json/dk_variante/view/${item}`).then(async (resp) => {
    let data = await resp.json();

    data = data.values;

    let imageUrl = data.dk_artikel.dest.image
      ? Request.downloadUrlFor(data.dk_artikel.dest.image)
      : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";

    state.images[item] = imageUrl;
  });

  return state.images[item];
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

.viur-shop-cart-headline{
  margin: 0 0 var(--sl-spacing-x-large) 0;
  font-size: var(--shop-form-headline-size);
}
</style>
