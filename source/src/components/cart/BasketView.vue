<template>
  <Loader v-if="!state.basketItems"></Loader>
  <template v-else>
    <div class="bind">
      <sl-tab-group class="cart-tab" noScrollControls>
        <sl-tab slot="nav" panel="general">
          <div class="cart-step">
            <sl-icon name="cart" library="hsk"></sl-icon>
            <div class="cart-status-text">1. Warenkorb</div>
          </div>
          <sl-icon name="chevron-right" class="cart-tab-check"></sl-icon>
        </sl-tab>
        <sl-tab slot="nav" panel="custom">
          <div class="cart-step">
            <sl-icon name="order" library="hsk"></sl-icon>
            <div class="cart-status-text">2. Ihr individuelles Angebot</div>
          </div>
          <sl-icon name="chevron-right" class="cart-tab-check"></sl-icon>
        </sl-tab>
        <sl-tab slot="nav" panel="advanced">
          <div class="cart-step">
            <sl-icon name="order-check" library="hsk"></sl-icon>
            <div class="cart-status-text">3. Bestellung prüfen</div>
          </div>
          <sl-icon name="chevron-right" class="cart-tab-check"></sl-icon>
        </sl-tab>
        <sl-tab slot="nav" panel="disabled">
          <div class="cart-step">
            <sl-icon name="order-confirmed" library="hsk"></sl-icon>
            <div class="cart-status-text">
              4. Bestellung erfolgreich abgeschlossen.
            </div>
          </div>
        </sl-tab>
        <sl-tab-panel name="general"></sl-tab-panel>
        <sl-tab-panel name="custom"></sl-tab-panel>
        <sl-tab-panel name="advanced"></sl-tab-panel>
        <sl-tab-panel name="disabled"></sl-tab-panel>
      </sl-tab-group>
      <div class="controlbar">
        <div class="button-list left">
          <sl-input
            ref="cartNameField"
            name="cart-name"
            placeholder="Warenkorbname"
            v-model="state.basket.name"
            required="true"
            inputmode="text"
            class="cart-headline"
          >
            <sl-icon library="hsk" name="pen" slot="suffix"></sl-icon>
          </sl-input>
        </div>
        <sl-dropdown distance="10">
          <sl-icon
            class="dots"
            name="dots"
            library="hsk"
            slot="trigger"
          ></sl-icon>
          <sl-menu>
            <sl-menu-item @click="saveCart" title="Warenkorb speichern">
              <sl-icon
                slot="prefix"
                library="hsk"
                name="save"
                class="primary-icon"
              ></sl-icon>
              Warenkorb speichern
            </sl-menu-item>
            <sl-menu-item @click="saveCart" title="Zu Projekt hinzufügen">
              <sl-icon
                slot="prefix"
                library="hsk"
                name="project"
                class="primary-icon"
              ></sl-icon>
              Zu Projekt hinzufügen
            </sl-menu-item>
            <sl-menu-item @click="saveCart" title="Warenkorb kopieren">
              <sl-icon
                slot="prefix"
                library="hsk"
                name="clone"
                class="primary-icon"
              ></sl-icon>
              Warenkorb kopieren
            </sl-menu-item>
            <sl-menu-item @click="saveCart" title="Warenkorb löschen">
              <sl-icon
                slot="prefix"
                library="hsk"
                name="delete"
                class="delete-icon"
              ></sl-icon>
              Warenkorb löschen
            </sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      </div>
      <sl-input
        name="cart-internalCartNo"
        placeholder="Freifeld (Kommission)"
        v-model="state.basket.customer_comment"
        inputmode="text"
        class="cart-descr"
      >
        <sl-icon library="hsk" name="pen" slot="suffix"></sl-icon>
      </sl-input>
      <br />
      <sl-alert ref="cartActionInfo" variant="primary" duration="3000" closable>
        <sl-icon slot="icon" name="check"></sl-icon>
        <strong>Warenkorb gespeichert!</strong><br />
      </sl-alert>
      <sl-alert ref="cartErrorInfo" variant="danger" duration="3000" closable>
        <sl-icon slot="icon" name="error"></sl-icon>
        <strong>Warenkorb nicht gespeichert!</strong><br />
      </sl-alert>
      <!-- <div class="search-box">
      <sl-input
        @sl-change="onSearch"
        type="search"
        label=""
        placeholder="Artikelnummer suchen"
        size="small"
        clearable
        class="article-combobox"
      >
        <sl-icon name="search" slot="suffix"></sl-icon>
      </sl-input>
      <sl-input class="comission-box"
              size="small"
              placeholder="Kommission"></sl-input>
        <sl-input class="search-amt" type="number"
              size="small"
              inputmode="decimal" placeholder="Anzahl" clearable step="1"
                  name=""
                  :value="skel.amt"></sl-input>
        <sl-button size="small" variant="secondary">
          Hinzufügen
        </sl-button>
    </div> -->
      <!--<div>
        <h2>Auftragsnr. {{ skel.value.internalCartNo }}</h2>
      </div>
      <div>
              <p>Sachbearbeiter {{ getBoneValue("user") }}</p>
      </div>
      <div>
        {{ skel.name }}
      </div>-->
      <!-- <sl-dialog ref="dialogDkAccordeon" class="dialog-width" style="--width: 50vw;" label="Wählen Sie bitte aus...">
        <dk-article-simple-list :skellist="cartStore.dkArtikelSearchResult"
                                v-if="cartStore.dkSearchDialogMode === 0"></dk-article-simple-list>
        <dk-shop v-if="cartStore.dkSearchDialogMode === 1" :articleKey="cartStore.dkArticleSearchSelectedKey"></dk-shop>
      </sl-dialog>
      <sl-dialog label="Artikel hinzufügen" ref="dialogHkSelection" style="--width: 75vw;">
        <hk-selection v-if="cartStore.dkSearchDialogMode === 2"></hk-selection>
      </sl-dialog>

      <cart-article-item :key="key" :structure="cartStore.cartProductStructureByKey" :skel="item"
                         v-for="(item, key) in cartStore.currentCart?.cartProducts"></cart-article-item>


      <sl-alert variant="warning" duration="5000" closable>
        <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
        <strong>Die Suche ergab keine Treffer!</strong><br/>
      </sl-alert> -->
      <!--		<code v-for="item in state.products">{{ item }}</code>-->
      <sl-card horizontal v-for="item in state.basketItems">
        <img
          class="card-img"
          slot="image"
          :src="getImage(state.itemsFullInfo[item.article.dest.key])"
        />

        <div class="header" slot="header">
          <h4 class="headline">{{ item.article.dest.shop_name }} | 425018</h4>
        </div>
        <div class="price-wrap" slot="footer">
          <div class="price">
            {{ item.article.dest.shop_price_recommended }} €
          </div>
          <div class="small-print">Brutto / Stk.</div>
          <div class="amount">Anzahl: 1</div>
        </div>
        <div class="card-body-row">
          Version: 900x900x2000 <br />
          Farbe: Chromoptik <br />
          Glasart: Klar hell mit Edelglasbeschichtung<br />
          Anschlag: Beidseitig variabel<br />
          Griff: Stangengriff Exklusiv (56)
        </div>
      </sl-card>

      <div class="order-footer">
        <div>Gesamt: {{ state.basket.total }}</div>
        <sl-button variant="info" size="small"> Jetzt Bestellen </sl-button>
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
sl-alert {
  margin-top: var(--sl-spacing-medium);
  margin-bottom: var(--sl-spacing-medium);
}

.controlbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  sl-input {
    flex: 1;

    &::part(base) {
      margin-bottom: 0;
    }
  }
}

.button-list {
  display: flex;
  flex-direction: row;
  gap: 10px;

  &.left {
    flex: 1;
    margin-right: 10px;
  }
}

.search {
  flex: 1 1 100%;
  margin-left: 10px;
}

.article-combobox {
  float: left;
  width: 75ch;
}

.card-img {
  aspect-ratio: 1;
}

.cart-selection {
  flex: 1;
}

.cart-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.soma-input {
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
}

.soma-label {
  display: flex;
  flex-direction: row;
  align-items: center;

  sl-icon {
    margin-left: 5px;
    background-color: @highlightColor;
    color: #fff;
    aspect-ratio: 1;
    border-radius: 50%;
    padding: 0.3em;
    font-size: 0.6em;
    cursor: pointer;
  }
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

.search-box {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  margin-bottom: 30px;

  sl-button {
    &::part(base) {
      height: 100%;
    }
  }

  @media (--ignt-mq-max-break-medium) {
    flex-wrap: wrap;
  }
}

.article-combobox {
  flex: 1 1 100%;
  margin-bottom: 10px;

  &::part(base) {
    margin-bottom: 0;
  }

  @media (--ignt-mq-max-break-medium) {
    margin-bottom: 0;
  }
}

.comission-box {
  margin-right: 10px;

  &::part(base) {
    margin-bottom: 0;
  }

  @media (--ignt-mq-max-break-medium) {
    flex: 1;
  }
}

.search-amt {
  margin-right: 10px;

  &::part(base) {
    margin-bottom: 0;
    width: 80px;
  }
}

.cart-headline {
  &::part(base) {
    background-color: transparent;
    transition: all ease 0.3s;
    border-bottom: 1px solid transparent;
    height: auto;
  }

  :deep(.input--focused) {
    border-bottom: 1px solid var(--sl-color-primary-500) !important;
  }

  &::part(input) {
    color: var(--sl-color-primary-500);
    font-weight: 300;
    text-transform: uppercase;
    font-size: 1.85em;
    padding: 0.1em 0;
    height: auto;
  }

  &::part(suffix) {
    pointer-events: none;
    width: 1.5em;
    margin-left: -1em;
    font-size: 1.5em;
  }

  &:hover {
    &::part(base) {
      border-bottom: 1px solid var(--sl-color-primary-500);
    }
  }
}

.cart-descr {
  margin-top: 10px;

  &::part(base) {
    background-color: transparent;
    transition: all ease 0.3s;
    border-bottom: 1px solid transparent;
    margin-bottom: 0;
  }

  &::part(input) {
    padding: 0.1em 0;
    height: auto;
    color: var(--ignt-color-text);
  }

  &::part(suffix) {
    pointer-events: none;
    width: 1.5em;
    margin-left: -1em;
    font-size: 1.5em;
  }

  &:hover {
    &::part(base) {
      border-bottom: 1px solid var(--ignt-color-text);
    }
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

.primary-icon {
  color: var(--ignt-color-primary);
}

.delete-icon {
  color: @warnColor;
}

.dots {
  color: var(--ignt-color-primary);
  width: 1.5em;
  height: 100%;
  font-size: 1em;
  padding: 0.4em;
}

.order-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
</style>
