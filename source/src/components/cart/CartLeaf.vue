<template>
  <sl-card horizontal class="viur-shop-cart-leaf">
    <img
      class="viur-shop-cart-leaf-image"
      slot="image"
      :src="getImage(state.leaf.shop_image ? state.leaf.shop_image : undefined)"
    />
    <h4 class="viur-shop-cart-leaf-headline headline">
      {{ state.leaf.shop_name }}
    </h4>
    <h5 class="viur-shop-cart-leaf-artno">
      {{ state.leaf.shop_art_no_or_gtin }}
    </h5>
    <div
      class="viur-shop-cart-leaf-description"
      v-html="state.leaf.shop_description"
    ></div>
    <div class="viur-shop-cart-leaf-actions">
      <sl-button
        size="small"
        outline
        class="viur-shop-cart-leaf-add-to-favourites-btn"
        variant="primary"
        title="Add to favourites"
      >
        <sl-icon name="heart" slot="prefix"></sl-icon>
      </sl-button>
      <sl-button
        size="small"
        outline
        class="viur-shop-cart-leaf-delete-btn"
        variant="primary"
        title="Remove from cart"
        @click="removeItem(state.leaf, state.leaf.article.dest.key, node)"
      >
        <sl-icon name="trash" slot="prefix"></sl-icon>
      </sl-button>
    </div>
    <div class="viur-shop-cart-leaf-quantity">
      <sl-input
        class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--quantity"
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
    </div>
    <div class="viur-shop-cart-leaf-unitprice">
      <div class="viur-shop-cart-leaf-label">Stückpreis</div>
      <sl-format-number
        class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--unitprice"
        lang="de"
        type="currency"
        currency="EUR"
        :value="leaf.price.retail"
      >
      </sl-format-number>
    </div>
    <div class="viur-shop-cart-leaf-price">
      <div class="viur-shop-cart-leaf-label">Gesamtpreis</div>
      <sl-format-number
        class="viur-shop-cart-leaf-value viur-shop-cart-leaf-value--price"
        lang="de"
        type="currency"
        currency="EUR"
        :value="leaf.price.retail * leaf.quantity"
      >
      </sl-format-number>
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
.viur-shop-cart-leaf {
  --shop-leaf-label-color: var(--ignt-color-primary);
  --shop-leaf-label-font-weight: 600;
  --shop-leaf-label-font-size: 1em;
  --shop-leaf-price-font-size: 1.3em;

  grid-column: auto / span var(--shop-main-columns);
  display: grid;
  grid-template-columns: subgrid;
  margin-bottom: var(--ignt-spacing-x-large);
  &::part(base) {
    grid-column: auto / span var(--shop-main-columns);
    display: grid;
    grid-template-columns: subgrid;
  }

  &::part(header) {
    border-bottom: none;
    padding-top: 0;
    padding-right: 0;
  }

  &::part(image) {
    grid-column: auto / span 2;
  }

  &::part(body) {
    grid-column: auto / span 7;
    display: grid;
    grid-template-columns: subgrid;
    padding: 0;
  }

  &::part(group) {
    padding: 0;
    grid-column: auto / span 7;
    display: grid;
    grid-template-columns: subgrid;
  }
}

.viur-shop-cart-leaf-image {
  aspect-ratio: 1;
}

.viur-shop-cart-leaf-headline {
  grid-column: 1 / span 3;
}

.viur-shop-cart-leaf-actions {
  grid-column: 1;
  display: flex;
  justify-content: space-between;
  order: 10;
}

.viur-shop-cart-leaf-description {
  grid-column: 1 / span 3;
  margin-bottom: var(--ignt-spacing-small);
}

.viur-shop-cart-leaf-price {
  grid-column: span 2 / 8;
  text-align: right;
  font-size: var(--shop-leaf-price-font-size);
}

.viur-shop-cart-leaf-label,
.viur-shop-cart-leaf-value--quantity::part(form-control-label) {
  color: var(--shop-leaf-label-color);
  font-weight: var(--shop-leaf-label-font-weight);
  font-size: var(--shop-leaf-label-font-size);
  margin-bottom: var(--ignt-spacing-x-small);
}
</style>
