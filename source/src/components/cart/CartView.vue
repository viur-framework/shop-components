<template>
  <sl-spinner v-if="!cartKey.length"></sl-spinner>
  <template v-else>
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

    <div v-for="node in state.nodes">
      <template
        v-if="Object.keys(state.leaves).includes(node.key)"
        :key="node.key"
      >
        <CartNode :node="node"> </CartNode>
        <CartLeaf
          v-for="leaf in state.leaves[node.key]"
          :key="leaf.key"
          :leaf="leaf"
          :node="node"
          @removeItem="removeItem"
          @updateItem="updateItem"
        >
        </CartLeaf>
      </template>
    </div>

    <teleport to="#order_sidebar" v-if="sidebar">
    <!-- <div v-if="sidebar"> -->
      <h2 class="viur-shop-cart-sidebar-headline headline">Zusammenfassung</h2>
      <br />

      <sl-input label="Rabattcode eingeben"
                class="viur-shop-cart-sidebar-coupon-input"
      ></sl-input>
      <br />

      <div class="viur-shop-cart-sidebar-info-line">
        <span>Zwischensumme</span> -->
        <!-- TODO: Preis in shop modul muss trotzdem ohne rabatt sein - extra feld für rabattierten preis und rabatt müssen ebenfalls hier sichtbar werden -->
        {{
          mode === "basket"
            ? cartStore.state.basketRootNode.total
            : cartStore.state.whishlistRootNodes[cartKey].total
        }}
        €
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
        {{
          mode === "basket"
            ? cartStore.state.basketRootNode.total
            : cartStore.state.whishlistRootNodes[cartKey].total
        }}
        €
      </div>
      <div class="viur-shop-cart-sidebar-btn-wrap">
        <sl-button variant="primary" size="medium"> Jetzt Bestellen </sl-button>
        <sl-button size="medium" variant="info">
          <sl-icon name="paypal" slot="prefix"></sl-icon>
          Paypal
        </sl-button>
      </div>
      </teleport>

      <div class="viur-shop-cart-mobile-footer">
        <sl-button variant="primary" size="medium"> Jetzt Bestellen </sl-button>
      </div>
    <!-- </div> -->
    <!-- <pre> {{ state.leaves }}</pre> -->
  </template>

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
import Loader from "@viur/vue-utils/generic/Loader.vue";
import { useCartStore } from "../../stores/cart.js";
import CartNode from "./CartNode.vue";
import CartLeaf from "./CartLeaf.vue";

const props = defineProps({
  mode: { type: String, default: "basket" },
  cartKey: { type: String, required: true },
  sidebar: { type: Boolean, default: true },
});

const cartStore = useCartStore();

const confirm = ref(null);

const state = reactive({
  cartIsInit: computed(() => {
    return cartStore.state.basketRootNode ? true : false;
  }),
  itemsIsInit: computed(() => {
    return true;
  }),
  images: {},
  currentItem: {},
  currentNode: {},
  nodes: [],
  leaves: {},
});

const currentCartKey = computed(() => {
  return props.mode === "basket" ? cartStore.state.basket : props.cartKey;
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
  await cartStore.updateItem(
    state.currentItem.article.dest.key,
    state.currentNode.key,
    0,
  );
  await updateCart();
  confirm.value.hide();
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

async function getChildren(parentKey = props.cartKey) {
  console.log("debug getChildren parentKey from comp: ", parentKey);
  const children = await cartStore.getChildren(parentKey);
  console.log("getChildren children: ", children);

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

  console.log("state.nodes", state.nodes);

  console.log("state.leaves", state.leaves);
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

.viur-shop-cart-mobile-footer{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  z-index: 1;
  background-color: var(--sl-color-neutral-0);
  padding: var(--sl-spacing-medium);
  border-top: 1px solid var(--sl-color-neutral-300);

  sl-button{
    width: 100%;
  }

  @media (--ignt-mq-max-break-small) {
      display: flex;
    }
}

</style>
