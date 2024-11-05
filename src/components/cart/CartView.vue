<template>
  <sl-spinner v-if="!currentCartKey"></sl-spinner>
  <h2 v-else-if="state.cartIsEmpty">Keine Artikel im Warenkorb vorhanden</h2>
  <!--todo translations-->
  <template v-else>
    <sl-dialog no-header ref="confirm" @sl-hide="onDialogHide">
      <p>Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?</p>
      <sl-bar>
        <sl-button
          slot="left"
          variant="danger"
          @click="confirm.hide()"
          size="medium"
        >
          Abbrechen
        </sl-button>
        <sl-button
          slot="right"
          variant="success"
          @click="onConfirm"
          size="medium"
        >
          Aus Warenkorb entfernen
        </sl-button>
      </sl-bar>
    </sl-dialog>

    <div class="viur-shop-cart-node" v-for="node in state.nodes">
      <template
        v-if="Object.keys(state.leaves).includes(node.key)"
        :key="node.key"
      >
        <!-- <CartNode :node="node"></CartNode> -->
        <CartLeaf
          v-for="leaf in state.leaves[node.key]"
          :key="leaf.key"
          :leaf="leaf"
          :node="node"
          :placeholder="placeholder"
          @removeItem="removeItem"
          @updateItem="updateItem"
        >
        </CartLeaf>
      </template>
    </div>
    <div id="order_sidebar" v-if="standalone">
      <h2 class="viur-shop-cart-sidebar-headline headline">Zusammenfassung</h2>
      <br />

      <div class="viur-shop-cart-sidebar-info-line">
        <span>Zwischensumme</span>
        <sl-format-number
          type="currency"
          currency="EUR"
          :value="cartStore.state.basketRootNode.total"
        ></sl-format-number>
      </div>
      <div class="viur-shop-cart-sidebar-info-line">
        <span>Rabatt</span>
        <sl-format-number
          type="currency"
          currency="EUR"
          :value="
            cartStore.state.basketRootNode.total -
            cartStore.state.basketRootNode.total_discount_price
          "
          lang="de"
        ></sl-format-number>
      </div>
      <div class="viur-shop-cart-sidebar-info-line">
        <Shipping ref="shipping"></Shipping>
      </div>
      <div class="viur-shop-cart-sidebar-info-line total">
        <span>Gesamt:</span>
        <sl-format-number
          type="currency"
          currency="EUR"
          :value="state.totalPrice"
          lang="de"
        ></sl-format-number>
      </div>
      <div class="viur-shop-cart-sidebar-btn-wrap" v-if="!props.inOrderView">
        <sl-button variant="primary" size="medium"> Jetzt Bestellen </sl-button>
        <Discount></Discount>

        <div class="viur-shop-cart-mobile-footer">
          <sl-button variant="primary" size="medium">
            Jetzt Bestellen</sl-button
          >
        </div>
      </div>
    </div>
    <Discount v-if="!props.inOrderConfirm"></Discount>

    <div class="viur-shop-cart-mobile-footer">
      <sl-button variant="primary" size="medium"> Jetzt Bestellen</sl-button>
    </div>

    <!-- <pre> {{ state.leaves }}</pre> -->
  </template>
  <shop-summary v-if="sidebar">
    <template #custom v-if="customComponent">
      <component :is="customComponent"></component>
    </template>
  </shop-summary>
  <!-- <CartNode></CartNode>
  <CartLeaf></CartLeaf> -->
  <!-- <template v-else>
    <div class="bind viur-shop-cart-wrap">
      <sl-dialog ref="confirm" @sl-hide="onDialogHide">
        <p>Möchten Sie den Artikel wirklich aus dem Warenkorb entfernen?</p>
        <div class="footer-wrap" slot="footer">
          <sl-button variant="danger" @click="confirm.hide()" size="medium">
            Abbrechen
          </sl-button>
          <sl-button variant="success" @click="onConfirm" size="medium">
            Aus Warenkorb entfernen
          </sl-button>
        </div>
      </sl-dialog>

      <div class="viur-shop-cart-list">
        <div class="viur-shop-cart-controlbar" v-if="mode !== 'basket'">
          <div class="viur-shop-cart-button-list left">
            <sl-input
              ref="cartNameField"
              name="cart-name"
              placeholder="Warenkorbname"
              v-model="cartStore.state.carts[cartStore.state.basket].info.name"
              required="true"
              inputmode="text"
              class="viur-shop-cart-headline"
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
                  name="clone"cartKey
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
          v-if="mode !== 'basket'"
          name="cart-internalCartNo"
          placeholder="Freifeld (Kommission)"
          v-model="
            cartStore.state.carts[cartStore.state.basket].info.customer_comment
          "
          inputmode="text"
          class="viur-shop-cart-descr"
        >
          <sl-icon library="hsk" name="pen" slot="suffix"></sl-icon>
        </sl-input>
        <br />
        <sl-alert
          ref="cartActionInfo"
          variant="primary"
          duration="3000"
          closable
        >
          <sl-icon slot="icon" name="check"></sl-icon>
          <strong>Warenkorb gespeichert!</strong><br />
        </sl-alert>
        <sl-alert ref="cartErrorInfo" variant="danger" duration="3000" closable>
          <sl-icon slot="icon" name="error"></sl-icon>
          <strong>Warenkorb nicht gespeichert!</strong><br />
        </sl-alert>


      </div>


    </div>
  </template> -->
</template>

<script setup>
import { reactive, computed, onBeforeMount, ref } from "vue";
import { useCartStore } from "../../stores/cart.js";
import CartNode from "./CartNode.vue";
import CartLeaf from "./CartLeaf.vue";
import Shipping from "../order/process/Shipping.vue";
import ShopSummary from "../ui/ShopSummary.vue";

const props = defineProps({
  mode: { type: String, default: "basket" },
  cartKey: { type: String },
  sidebar: { type: Boolean, default: true },
  inOrderView: { type: Boolean, default: false },
  inOrderConfirm: { type: Boolean, default: false },
  customComponent: { default: undefined },
});

const cartStore = useCartStore();

const confirm = ref(null);
const shipping = ref(null);

const state = reactive({
  itemsIsInit: computed(() => {
    return true;
  }),
  cartIsEmpty: computed(() => {
    return currentCartKey && state.leaves.length===0;
  }),
  totalPrice: computed(() => {
    if (shipping.value) {
      return (
        cartStore.state.basketRootNode.total_discount_price +
        shipping.value.getShippingCost()
      );
    }
    return 0;
  }),
  images: {},
  currentItem: {},
  currentNode: {},
  nodes: [],
  leaves: {},
});

const currentCartKey = computed(() => {
  console.log("compute current cartkey");
  return props.mode === "basket"
    ? cartStore.state.basketRootNode.key
    : props.cartKey;
});

// function getImage(item) {
//   Request.get(`/json/dk_variante/view/${item}`).then(async (resp) => {
//     let data = await resp.json();

//     data = data.values;

//     let imageUrl = data.dk_artikel.dest.image
//       ? Request.downloadUrlFor(data.dk_artikel.dest.image)
//       : "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";

//     state.images[item] = imageUrl;
//   });

//   return state.images[item];
// }

async function onConfirm() {
  confirm.value.hide();

  await cartStore.updateItem(
    state.currentItem.article.dest.key,
    state.currentNode.key,
    0,
  );
  await updateCart();
}

async function updateItem(e) {
  console.log("updateItem :", e);

  if (e.quantity === 0) {
    confirm.value.show();
    state.currentItem = e.item;
    state.currentNode = e.node;
  } else {
    await cartStore.updateItem(e.articleKey, e.node.key, e.quantity);

    await cartStore.init();
  }

  await shipping.value.updateShipping();
}

function removeItem(e) {
  console.log("removeItem :", e);

  confirm.value.show();
  state.currentItem = e.item;
  state.currentNode = e.node;
}

async function onDialogHide() {
  // TODO: console error when removing items
  state.leaves[state.currentNode.key].forEach((item) => {
    if (item.key === state.currentItem.key) {
      item.quantity = 1;
    }
  });

  state.currentItem = {};
  state.currentNode = {};
}

async function updateCart() {
  state.nodes = [];
  state.leaves = {};

  await cartStore.init();
  await getChildren();
}

async function getChildren(parentKey = currentCartKey.value) {
  const children = await cartStore.getChildren(parentKey);

  children.forEach(async (child) => {
    if (child.skel_type === "node") {
      state.nodes.push(child);
      await getChildren(child.key);
    } else {
      if (!Object.keys(state.leaves).includes(parentKey)) {
        state.leaves[parentKey] = [];
      }
      state.leaves[parentKey].push(child);
    }
  });
}

onBeforeMount(async () => {
  await cartStore.init();
  await getChildren();

  if (props.mode === "basket") {
    state.nodes.push(cartStore.state.basketRootNode);
  }

  console.log("state.nodes test", state.nodes);

  console.log("state.leaves", state.leaves);
});
</script>

<style scoped>
.viur-shop-cart-wrap {
  display: grid;
  grid-template-columns: subgrid;
}

sl-alert {
  margin-top: var(--sl-spacing-medium);
  margin-bottom: var(--sl-spacing-medium);
}

.viur-shop-cart-controlbar {
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

.viur-shop-cart-button-list {
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

.viur-shop-cart-card-img {
  aspect-ratio: 1;
}

.viur-shop-cart-selection {
  flex: 1;
}

.viur-shop-cart-node {
  display: flex;
  flex-direction: column;
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

.viur-shop-cart-headline {
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

.viur-shop-cart-descr {
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

.viur-shop-cart-card {
  margin-bottom: var(--sl-spacing-x-large);

  &::part(header) {
    border-bottom: none;
    padding-top: 0;
    padding-right: 0;
  }

  &::part(image) {
    flex-basis: 25%;
    max-width: 250px;
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

.viur-shop-cart-card-body-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: var(--sl-spacing-large);
  flex: 1;
}

.viur-shop-cart-card-body-info {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.viur-shop-cart-card-descr {
  margin-bottom: auto;
}

.viur-shop-cart-card-body-footer {
  display: flex;
  flex-direction: row;
  gap: var(--sl-spacing-2x-small);
  margin-top: var(--sl-spacing-large);
}

.amount-input {
  width: 5em;
}

.viur-shop-cart-card-price-wrap {
  display: flex;
  flex-direction: column;

  .viur-shop-cart-card-small-print {
    font-size: 0.75em;
    margin-left: auto;
  }
}

.viur-shop-cart-card-price {
  font-size: 1.3em;
}

.viur-shop-cart-card-price-label {
  color: var(--ignt-color-primary);
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 1em;
  margin-left: auto;
}

.viur-shop-cart-mobile-footer {
  display: none;
}
</style>
