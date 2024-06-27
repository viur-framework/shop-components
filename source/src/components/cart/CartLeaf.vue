<template>
  <sl-card horizontal class="viur-shop-cart-leaf">
    <img
      class="viur-shop-cart-leaf-img"
      slot="image"
      :src="getImage(state.leaf.shop_image ? state.leaf.shop_image : undefined)"
    />
    <h4 class="viur-shop-cart-leaf-headline headline">
      {{ state.leaf.shop_name }}
    </h4>
    <h5 class="viur-shop-cart-leaf-artno">
      {{ state.leaf.shop_art_no_or_gtin }}
    </h5>
    <div class="viur-shop-cart-leaf-descr">
      Version: 900x900x2000 <br />
      Farbe: Chromoptik <br />
      Glasart: Klar hell mit Edelglasbeschichtung<br />
      Anschlag: Beidseitig variabel<br />
      Griff: Stangengriff Exklusiv (56)
    </div>
    <div class="viur-shop-cart-leaf-actions">
      <sl-button
        size="medium"
        outline
        class="viur-shop-cart-leaf-add-to-favourites-btn"
        variant="primary"
        title="Add to favourites"
      >
        <sl-icon name="heart" slot="prefix"></sl-icon>
      </sl-button>
      <sl-button
        size="medium"
        outline
        class="viur-shop-cart-leaf-delete-btn"
        variant="primary"
        title="Remove from cart"
        @click="removeItem(state.leaf, state.leaf.article.dest.key, node)"
      >
        <sl-icon name="trash" slot="prefix"></sl-icon>
      </sl-button>
    </div>
    <sl-input
      class="viur-shop-cart-leaf-body-amount-input"
      type="number"
      label="Anzahl"
      placeholder="Number"
      min="0"
      v-model="state.leaf.quantity"
      @input="
            updateItem(
              state.leaf,
              state.leaf.article.dest.key,
              node,
              state.leaf.quantity,
            )
          "
    >
    </sl-input>
    <div class="viur-shop-cart-leaf-unitprice">
      <div class="viur-shop-cart-leaf-label">Stückpreis</div>
      {{ state.leaf.price.retail }} €
    </div>

    <div class="viur-shop-cart-leaf-availability">
      <div class="viur-shop-cart-leaf-label">Verfügbarkeit</div>

    </div>

    <div class="viur-shop-cart-leaf-price">
      <div class="viur-shop-cart-leaf-label">Gesamtpreis</div>
      {{ state.leaf.price.retail * state.leaf.quantity }} €
    </div>
  </sl-card>
</template>

<script setup>
import { computed, onBeforeMount, reactive } from "vue";
import { Request } from "@viur/vue-utils";

const props = defineProps({
  leaf: { type: Object, required: true },
  node: { type: Object, required: true },
});

const emit = defineEmits(["updateItem", "removeItem"]);

const state = reactive({
  leaf: {},
});

function getImage(image) {
  if (image !== undefined) return Request.downloadUrlFor(image);

  return "https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80";
}

function updateItem(item, articleKey, node, quantity) {
  emit("updateItem", {
    item: item,
    articleKey: articleKey,
    node: node,
    quantity: quantity,
  });
}

function removeItem(item, articleKey, node) {
  emit("removeItem", { item: item, articleKey: articleKey, node: node });
}

onBeforeMount(() => {
  state.leaf = props.leaf;
});
</script>

<style scoped>
.viur-shop-cart-leaf-img {
  aspect-ratio: 1;
}

.viur-shop-cart-leaf {
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

.viur-shop-cart-leaf-body-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: var(--sl-spacing-large);
  flex: 1;

  @media (--ignt-mq-max-break-x-small) {
      grid-template-columns: 1fr auto;
    }
}

.viur-shop-cart-leaf-body-info {
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (--ignt-mq-max-break-x-small) {
      grid-column: span 2;
      order: 99;
    }
}

.viur-shop-cart-leaf-body-amount{
  @media (--ignt-mq-max-break-x-small) {
      display: flex;
    }
}

.viur-shop-cart-leaf-descr {
  margin-bottom: auto;

  @media (--ignt-mq-max-break-x-small) {
      display: none;
    }
}



.viur-shop-cart-leaf-body-amount-input {
  width: 5em;
}

.viur-shop-cart-leaf-price-wrap {
  display: flex;
  flex-direction: column;

  .viur-shop-cart-leaf-small-print {
    font-size: 0.75em;
    margin-left: auto;
  }
}

.viur-shop-cart-leaf-price {
  font-size: 1.3em;
}

.viur-shop-cart-leaf-price-label {
  color: var(--ignt-color-primary);
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 1em;
  margin-left: auto;

  @media (--ignt-mq-max-break-x-small) {
      display: none;
    }
}
</style>
