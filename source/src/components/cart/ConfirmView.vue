<template>
  <Loader v-if="!state.basketItems"></Loader>
  <template v-else>
    <div class="bind bind-wrap">
      <div class="list">

      <h2 class="headline">
        Bestellung prüfen
      </h2>
      <br />

      <div class="address-wrap">
        <div class="address">
          <div class="address-headline">
            Versandadresse
            <sl-button outline
                       size="small"
            >
              <sl-icon name="pencil"
                       slot="prefix"></sl-icon>
            </sl-button>
          </div>
          Roland Brose<br>
          Speicherstraße 33<br>
          44147 Dortmund, DE<br>
          <br>
          rb@mausbrand.de<br>
          0231 21 34 68 90
        </div>
        <div class="address">
          <div class="address-headline">
            Rechnungsadresse
            <sl-button outline
                       size="small"
            >
              <sl-icon name="pencil"
                       slot="prefix"></sl-icon>
            </sl-button>
          </div>
          Roland Brose<br>
          Speicherstraße 33<br>
          44147 Dortmund, DE<br>
          <br>
          rb@mausbrand.de<br>
          0231 21 34 68 90
        </div>
      </div>

       <div class="payment">
         <div class="payment-method">
           <span>Zahlungsmethode:</span>
           Paypal
         </div>
         <sl-button outline
                       size="small"
            >
              <sl-icon name="pencil"
                       slot="prefix"></sl-icon>
            </sl-button>
       </div>

       <h2 class="headline">
        Warenkorb
      </h2>
        <br>

      <sl-card horizontal
               class="cart-card"
               v-for="item in state.basketItems">
        <img
          class="card-img"
          slot="image"
          :src="getImage(state.itemsFullInfo[item.article.dest.key])"
        />

        <div class="header" slot="header">
          <h4 class="headline">{{ item.article.dest.shop_name }} | 425018</h4>
        </div>
        <div class="card-body-row">
          <div class="card-body-info">
            <div class="card-info-wrap">
              <div class="card-info">
                <span>Anzahl: </span>
                1
              </div>
              <div class="card-info">
                <span>Preis: </span>
                {{ item.article.dest.shop_price_recommended }} €
              </div>
            </div>
          </div>
        </div>
      </sl-card>
      </div>
      <div class="sidebar">
        <h2 class="headline">Jetzt Bestellen</h2>
        <br>
        <div class="info-line">
          <span>Zwischensumme</span>
          {{ state.basket.total }} €
        </div>
        <div class="info-line">
          <span>Rabatt</span>
          0 €
        </div>
        <div class="info-line">
          <span>Versandkosten</span>
          0 €
        </div>
        <div class="info-line total">
          <span>Gesamt:</span>
          {{ state.basket.total }} €
        </div>

        <sl-checkbox>
          Ich akzeptiere die geltenden AGBs und Datenschutzbestimmungen
        </sl-checkbox>

        <div class="sidebar-btn-wrap">
          <sl-button variant="info"
                     size="small">
            Zahlungspflichtig bestellen
          </sl-button>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { inject, onMounted, reactive, computed, ref, onBeforeMount } from "vue";
import Loader from "@viur/vue-utils/generic/Loader.vue";
import { useCartStore } from "../../stores/cart.js";
import { Request } from "@viur/vue-utils";

const cartStore = useCartStore();

// const searchWarning = ref()
const state = reactive({ basket: {}, basketItems: {}, itemsFullInfo: {} });

function getArticleView(key) {
  return Request.get(`/json/variante/view/${key}`);
}

function getImage(item) {
  let imageUrl =
    "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";

  if (item.dk_artikel.dest.image) {
    return Request.downloadUrlFor(item.dk_artikel.dest.image);
  }

  return imageUrl;
}

function getBasketItems(basketKey) {
  return Request.get("/shop/api/cart_list", {
    dataObj: { cart_key: basketKey },
  });
}

function getBasket() {
  return Request.get("/shop/api/cart_list");
}

onBeforeMount(() => {
  getBasket().then(async (resp) => {
    let data = await resp.json();
    data.forEach((cart) => {
      if (cart.cart_type === "basket") {
        state.basket = cart;

        getBasketItems(cart.key).then(async (resp) => {
          let data = await resp.json();
          state.basketItems = data;

          data.forEach((item) => {
            getArticleView(item.article.dest.key).then(async (resp) => {
              let data = await resp.json();
              state.itemsFullInfo[data.values.key] = data.values;
            });
          });
        });
      }
    });
  });
});
</script>

<style scoped>

.bind-wrap{
  flex-direction: row;
  gap: var(--sl-spacing-x-large);
  align-items: flex-start;
}

.sidebar{
  display: flex;
  flex-direction: column;
  background-color: var(--sl-color-neutral-100);
  min-width: 350px;
  padding: var(--sl-spacing-medium);
  position: sticky;
  top: 0;
}

.sidebar-btn-wrap{
  display: flex;
  flex-direction: column;
  margin-top: var(--sl-spacing-large);

  sl-button{
    margin-bottom: var(--sl-spacing-x-small);
  }
}

sl-alert {
  margin-top: var(--sl-spacing-medium);
  margin-bottom: var(--sl-spacing-medium);
}

.card-img {
  aspect-ratio: 1;
}

sl-tooltip {
  &::part(body) {
    line-height: 1.2;
    font-weight: 400;
    padding: 10px;
  }
}

.cart-tab {
  sl-tab {
    width: 25%;

    &::part(base) {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      color: var(--sl-color-neutral-400);
    }

    &[aria-selected="true"]::part(base) {
      color: var(--ignt-color-primary) !important;
    }
  }
}

.cart-status-text {
  font-size: 0.8em;
  color: inherit;
  text-align: center;
  margin-top: 0.6em;
  white-space: initial;
}

.cart-step {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media (--ignt-mq-max-break-small) {
    justify-content: center;
  }

  sl-icon {
    font-size: 2.5em;
    margin-bottom: 10px;

    @media (--ignt-mq-max-break-small) {
      display: none;
    }
  }
}

.cart-tab-check {
  position: absolute;
  right: -0.5em;

  @media (--ignt-mq-max-break-small) {
    font-size: 0.7em;
    right: -0.35em;
    top: calc(50% - 0.35em);
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

.info-line.total{
  font-weight: 600;
  border-top: 1px solid var(--sl-color-neutral-300);
  border-bottom: 1px solid var(--sl-color-neutral-300);
  padding: var(--sl-spacing-x-small) 0;
  margin: var(--sl-spacing-small) 0;
}

.info-line{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: var(--sl-spacing-2x-small) 0;

  span{
    margin-right: auto;
  }
}

.cart-card{
  margin-bottom: var(--sl-spacing-x-large);

  &::part(header){
    border-bottom: none;
    padding-top: 0;
    padding-right: 0;
   }

  &::part(image){
    flex-basis: 25%;
    max-width: 90px;
   }

   &::part(body){
    display: flex;
    flex: 1;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
   }

  &::part(group){
      padding: var(--sl-spacing-small) 0;
   }
}

.card-body-row{
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: var(--sl-spacing-large);
  flex: 1;
}

.card-body-info{
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-descr{
  margin-bottom: auto;
}

.card-info-wrap{
  display: flex;
  flex-wrap: nowrap;
  gap: var(--sl-spacing-medium)
}

.card-info{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  span{
    margin-right: var(--sl-spacing-x-small);
    font-weight: 600;
  }
}

.address-wrap{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sl-spacing-x-large);
  margin-bottom: var(--sl-spacing-x-large);
}

.address-headline{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

.payment{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sl-spacing-x-large);

  span{
    font-weight: 600;
  }
}

</style>
